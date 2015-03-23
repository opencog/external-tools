var tickSwitch = 1; //using this to switch between the tick function

function updateD3Graph(json)
{

	if (!drawedd3) return;
 
	if (json!=null)
	{

		//UPDATE DATA
		json = atomData;
		 
		if (json.length==0)
			$("#screen-d3").html("");
	 
		links = fixLinks(json);
	 
		force.nodes(nodes)
			.links(links)
			.size([width, height])
		 	.start();
	}
 
	force.charge(preferences.appearanceCharge)
		.gravity(0.1)
		.linkDistance(preferences.appearanceLinkDistance)
		.linkStrength(preferences.appearanceLinkStrength/100)
		.friction(preferences.appearanceFriction/100)
		.size([width,height])
		.start();
 
}


function createD3GraphView(json) 
{

  	var color = d3.color;
	links = fixLinks(json);
	link_length = links.length;

	force = d3.layout.force()
		.charge(preferences.appearanceCharge)
		.gravity(0.1)
		.linkDistance(preferences.appearanceLinkDistance)
		.linkStrength(preferences.appearanceLinkStrength/100)
		.friction(preferences.appearanceFriction/100)
		.size([width,height]);

	zoom = d3.behavior.zoom().scaleExtent([0.05, 5]).on("zoom", zoomed);

	var drag = force.drag().on("dragstart", dragstarted)
		//.origin(function(d) {return d;})
		.on("drag", dragged)
		.on("dragend", dragended);

	var svg = d3.select("#screen-d3")
		.append("svg")	
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("id","visualizerInner")
		.call(zoom).on("dblclick.zoom", null)
 
	var rect = svg.append("rect")
		.attr("width", width)
		.attr("height", height)
		.style("fill", "none")
		.style("pointer-events", "all");

	container = svg.append("g");

	d3.select('#visualizerInner') 
	   	.attr('width', width)
	   	.attr('height', height)
  
	force.nodes(nodes)
		.links(links)
		.size([width, height])
		.start();
 
	update();

function update()
{

 	link = container
		.selectAll(".link")	
		.data(links);
	 
	if (String2Boolean(preferences.appearanceShowLinks))
	{
		linkEnter = link.enter()
			.append("line")
			.attr("class", "links")
			.attr("id",function(d){ return "link_" + d.handle})
			.attr("class", "link")
			.style("stroke-width", function(d) {return Math.sqrt(d.value);});

	 	link.exit().remove();
 	}

	node = container
		.selectAll(".node")
		.data(nodes);
 
	nodeEnter = node.enter()
		.append("g")
		.attr("class", "node")
		.attr("id",function(d){ return "node_" + d.handle})
		.attr("handle",function(d){return d.handle;})
		.style("fill", function(d) { return color(d.group); })
		.attr("cx", function(d){ return d.x;})
		.on("dblclick", dblclick)
		.attr("cy", function(d){ return d.y;})
		.call(drag)
		.append("circle").attr("r", nodeRadius);

    node.exit().remove();
    
	//TEXT STUFF
	textVisibillity =  preferences.appearanceShowText=="true"? "visible": "hidden";
	nodeEnter.append("text").attr("class","text")
	.style("visibility",textVisibillity)
	.text(nodeText);
	
	//HOVER TITLE
	nodeEnter.append("title").text(function(d) 
	{
		if (d.name == "")
			return "handleok: " + d.handle + "\n" + "type: " + d.type;
		else
			return "handle: " + d.handle + "\n" + "Name:" + d.name + "\n" + "type: " + d.type;
	});

	//THE TICKING FUNCTION
	force.on("tick", function() 
	{

		if ( String2Boolean(preferences.appearanceAnimate)) return;

	    if (String2Boolean(preferences.appearanceShowLinks))
	    {
			link
			.attr("x1", function(d) {return d.source.x;})
			.attr("y1", function(d) {return d.source.y;	})
			.attr("x2", function(d) {return d.target.x;})
			.attr("y2", function(d) {return d.target.y;});
		}
		  
		 
		node.attr("transform", function(d)
		{
			return "translate(" + d.x + "," + d.y + ")";
		});
 
	});
 
   /*--------------------------
   -----------EVENTS ----------
   ---------------------------*/
	node.on("mouseover", function(d)
	{
		if (!preferences.AppearanceHoverShowConnections) return;
		 
		node.classed("node-active", function(o) {
			thisOpacity = isConnected(d, o) ? true : false;
			this.setAttribute('fill-opacity', thisOpacity);
			return thisOpacity;
		});
	 
		link.classed("link-active", function(o) {
			return o.source === d || o.target === d ? true : false;
		});
		 
		d3.select(this).classed("node-active", true);
		d3.select(this).select("circle").transition().duration(transitionSpeed).attr("r", nodeRadius);


	})

	.on("mouseout", function(d)
	{
		node.classed("node-active", false);
		link.classed("link-active", false);

		d3.select(this).select("circle").transition().duration(transitionSpeed).attr("r", nodeRadius);
		connectedNode.splice(0, connectedNode.length);
	});
 

	svg.on("mousemove", function(d) 
	{
		dragging = true;
	});

	svg.on("mousedown", function(d) 
	{
		dragging = false;
	});


	svg.on("mouseup", function(d) 
	{
		if (dragging) return;

		selectedNode = null;
		clearAtomDetails();
		if (preferences.selectedTool == "pointer")
		{
			d3.select(this).select("circle").transition().duration(transitionSpeed).attr("r", nodeRadius);
			node.classed("selectedNode",false);
			link.transition(transitionSpeed).duration(transitionSpeed).style("stroke-opacity", 1);
			node.transition(transitionSpeed).duration(transitionSpeed).style("opacity", 1);
			connectedNode.splice(0, connectedNode.length);
		}
		else if (preferences.selectedTool == "addNode")
		{

		}
		
	});

	link.on("dblclick", function(d) 
	{
		savePreference("visibleAtomDetails",1);
		updateGUIPreferences();
	});


	link.on("click", function(d) 
	{
		if (dragging) return;
		selectedLink = d;
		showSelectedLink(d);

		link.classed("selectedLink",false);
		d3.select(this).classed("selectedLink",true);
	});

	node.on("dblclick", function(d) 
	{
		savePreference("visibleAtomDetails",1);
		updateGUIPreferences();
	});

	node.on("click", function(d) 
	{

		//if (d3.select(this).classed("dragging")){return;} 
		if (nodeDragging) return;
 	 
		d3.event.stopPropagation();
		node.classed("selectedNode",false);
		link.classed("selectedLink",false);
		d3.select(this).classed("selectedNode",true);
		if (atomDetailsChanged && d!=selectedNode)
		{
			if ( !confirm("Are you sure you want to select other atom without updating it's settings?") )
				return;
		}
		
		if (d!=selectedNode)
		{
			selectedNode = d;
			showSelectedAtom(d);
	 		atomDetailsChanged = false;
	 		$("#atomDetailsUpdate").prop("disabled",true);
	 		$("#atomDetailsDelete").prop("disabled",false);
 		}
 		 
		var dcx = (width / 2 - d.x * zoom.scale());
		var dcy = (height / 2 - d.y * zoom.scale());
		/*zoom.translate([dcx, dcy]);
		container.transition()
		.duration(transitionSpeed)
		.attr("transform", "translate(" + dcx + "," + dcy + ")scale(" + zoom.scale() + ")");
		*/
		if (preferences.selectedTool == "pointer")
		{
			d3.select(this).select("circle")
			 .transition()
			 .duration(transitionSpeed)
			 .attr("r", nodeRadius);
	 
			 //----FADE OUT EVERYTHING ELSE-----
			 //----------------------------------
			 //----------------------------------
			node.transition(transitionSpeed).duration(transitionSpeed).style("opacity", function(o)
			{
				return isConnected(d, o) ? 1.0 : 0.1;
			})
			.ease(Math.sqrt).attr("r", function(o)
			{
				return isConnected(d, o) ? nodeRadius : 500;
			});

			link.transition(transitionSpeed).duration(transitionSpeed).style("stroke-opacity", function(o)
			{
				for ( j = 0; j < connectedNode.length; j++) 
				{
					if (connectedNode[j].handle == o.source.handle)
						return 1.0;
					if (connectedNode[j].handle == o.target.handle)
						return 1.0;
				}
				return 0.1;
			});
		}
		else if (preferences.selectedTool == "removeNode")
		{

			deleteNode(selectedNode.handle);
		}
	});
 
	function dottype(d)
	{
		d.x = +d.x;
		d.y = +d.y;
		return d;
	}

	function zoomed()
	{

		container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	}

 
	function dblclick(d) 
	{
		if (d.fixed==0)
		{
			d3.select(this).classed("fixed",true);
			$("#atomDetailsFixed").switchButton({ checked: true });
			d.fixed = true;
		}
		else
		{
			$("#atomDetailsFixed").switchButton({ checked: false });
			d3.select(this).classed("fixed",false);
			d.fixed =false;
		}
	} 

	function dragstarted(d)
	{
		d3.event.sourceEvent.stopPropagation();
		//d3.select(this).classed("dragging", true);
		//d3.select(this).classed("node-active", true);
		//force.start();
		nodeDragging = true;
	}

	function dragged(d)
	{
		//d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
	}

	function dragended(d)
	{
		//d3.select(this).classed("dragging", false);
		//d3.select(this).classed("node-active", false);
		nodeDragging = false;
	}

	//This sais that the graph was drawed once...
	drawedd3 = true;

	force.start();

}
	
	/*--------------------------
	 --------FUNCTIONS ---------
	---------------------------*/

	var connectedNode = [];
	var allNode;
 
	function arrycontain(obj) 
	{
		var i = connectedNode.length;
		while (i--)
		{
			if (connectedNode[i] === obj) 
				return true;
		}
		return false;
	}

	function getnode(handle) 
	{
		for ( jnode = 0; jnode < json.length; jnode++)
			if (handle == json[jnode].handle)
				return json[jnode];
	}
 
	function isConnected(a, b) 
	{

		if (!arrycontain(a))
			connectedNode[connectedNode.length] = a;
 
		function recurse(node)
		{
			if (node.incoming.length > 0)
				node.incoming.forEach(function(entry)
				{
					//finde better way
					var currentNde = getnode(entry);
					if (!arrycontain(currentNde)) {
						connectedNode[connectedNode.length] = currentNde;
						recurse(currentNde);
					}
				});
			
			if (node.outgoing.length > 0)
				node.outgoing.forEach(function(entry)
				{
					//finde better way
					var currentNde = getnode(entry);
					if (!arrycontain(currentNde)) {
						connectedNode[connectedNode.length] = currentNde;
						recurse(currentNde);
					}
				});
 
		}

		recurse(a);

		if (!arrycontain(b))
			return false;
		else
			return true;
	}

	function nodeRadius(d)
	{

		return d.incoming.length *2 +5;
	}

	function nodeText(d)
	{
		if (d.name !="")
			return d.name;
		else
			return d.type
	}
}

function fixLinks(json)
{
	var links = [];
	for (var n = 0; n < json.length; n++) {
		//console.log(json[n]);
		if (json[n].outgoing.length > 0) {
			for (var outindex = 0; outindex < json[n].outgoing.length; outindex++)
			{
				var templink = {};
				
				for (var i = 0; i < json.length; i++)
				{
					if (json[i].handle == json[n].outgoing[outindex])
					{
						templink["source"] = n;
						templink["target"] = i;
						templink["name"] = "linkname";
						templink["type"] = "linktype";
						links[index] = templink;
						index++;
						break;
					}
				}
				
			}
		} 
	}
	return links;
}
 