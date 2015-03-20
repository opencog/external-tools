function d3graph(element)
{
 
 	zoom = d3.behavior.zoom().scaleExtent([0.05, 5]).on("zoom", zoomed);

 	 
    var vis = this.vis = d3.select(element).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
		.attr("id","visualizerInner")
		.call(zoom).on("dblclick.zoom", null);

	var rect = vis.append("rect")
		.attr("width", width)
		.attr("height", height)
		.style("fill", "none")
		.style("pointer-events", "all");

	container = vis.append("g");

    var force = d3.layout.force()
    	.charge(preferences.appearanceCharge)
		.gravity(0.1)
		.linkDistance(preferences.appearanceLinkDistance)
		.linkStrength(preferences.appearanceLinkStrength/100)
		.friction(preferences.appearanceFriction/100)
        .size([width, height]);

    var drag = force.drag()
		.on("dragstart", dragstarted)	 
		.on("drag", dragged)
		.on("dragend", dragended);

    var nodes = force.nodes(),
        links = force.links();

   
 
 	

	/*--------------------------*/
	/*----------UPDATE----------*/
	/*--------------------------*/
	/*--------------------------*/
	/*--------------------------*/

    var update = function () 
    {
  
    	force.charge(preferences.appearanceCharge)
		.gravity(0.1)
		.linkDistance(preferences.appearanceLinkDistance)
		.linkStrength(preferences.appearanceLinkStrength/100)
		.friction(preferences.appearanceFriction/100)
        .size([width, height]);

        d3.select('#visualizerInner') 
	   	.attr('width', width)
	   	.attr('height', height)

        var node = container.selectAll("g.node")
            .data(nodes);

        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("id",function(d){return d.index;})
            .call(force.drag);

        nodeEnter.append("circle")
            .attr("class", "circle")
            .attr("x",function(d){return d.x})
            .attr("y",function(d){return d.y})
            .attr("r", nodeRadius) 
             
        nodeEnter.append("text")
            .attr("class", "text")
            .text(nodeName);

        var link = container.selectAll(".link")
            .data(links );

        var linkEnter = link.enter().append("line")
            .attr("class", "link");

        link.exit().remove();

        node.exit().remove();

        force.on("tick", function() 
        {
          link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

          node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });
 
	    /*------------------------------------*/
		/*---------------EVENTS---------------*/
		/*------------------------------------*/
		/*------------------------------------*/
		/*------------------------------------*/
		vis.on("mouseup", function(d) 
		{
			//if (dragging) return;

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
				d3g.addNode({x:d3.mouse(this)[0],y:d3.mouse(this)[1]});

			}
 
		});

		


		link.on("click", function(d) 
		{
			 
			if (preferences.selectedTool == "removeLink")
			{
				d3g.removeLink(d.index);
				return;
			}

			if (dragging) return;
			selectedLink = d;
			showSelectedLink(d);

			linkEnter.classed("selectedLink",false);
			d3.select(this).classed("selectedLink",true);
		});
		
		node.on("dblclick", function(d)
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
		});

		node.on("click", function(d) 
		{

			//if (d3.select(this).classed("dragging")){return;} 
			if (nodeDragging) return;
	 	 
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
				d3g.removeNode(d.index);
				return;
			}
			else if (preferences.selectedTool == "addLink")
			{

				if (linkToolNode1 == null)
				{

					d3.select(this).classed("linkToolNode",true);
					linkToolNode1 = d.index;
				 
					return;
				}
				else
				{ 
					linkToolNode2 = d.index;
					 
					node.classed("linkToolNode",false);
					d3g.addLink(linkToolNode1, linkToolNode2 ) ;
					linkToolNode1 = null;
					linkToolNode2 = null;
					 
				 
					return;
				}
			}
			else if (preferences.selectedTool == "removeLink")
			{

			}


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


		});


		node.on("mouseover", function(d)
		{


			if ((preferences.selectedTool == "addLink") && (linkToolNode1!=null))
			{
				d3.select(this).classed("linkToolNode",true);
				return;
			}
			 

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

		node.on("mouseout", function(d)
		{
			node.classed("node-active", false);
			link.classed("link-active", false);

			d3.select(this).select("circle").transition().duration(transitionSpeed).attr("r", nodeRadius);
			connectedNode.splice(0, connectedNode.length);
		});



        force.start();
    }

    update();
 
	/*--------------------------*/
	/*--------FUNCTIONS---------*/
	/*--------------------------*/
	/*--------------------------*/
	/*--------------------------*/
 
	this.update = function (id) 
	{
        update();
    }

    this.addNodes = function (newnodes) 
	{
        
        for(var i=0;i<newnodes.length;i++)
        {
        	nodes.push(newnodes[i]);	
        }
        this.refreshLinks();
        update();
    }

    this.refreshLinks = function ()
    {
    	for(var i=0;i<nodes.length;i++)
        {
         
	    	for (var li=0;li<nodes[i].incoming.length;li++)
	    	{
	    	 
	    		links.push({"source": nodes[i], "target": findNodeByHandle(nodes[i].incoming[li]), "index": links.length});
	    		console.log("incoming link");
	    	}
	    	for (var lo=0;lo<nodes[i].outgoing.length;lo++)
	    	{
	    		links.push({"source": findNodeByHandle(nodes[i].outgoing[lo]), "target": nodes[i], "index": links.length});
	    		 
	    		console.log("outgoing link");
	    	}
    	}
    }

	this.addNode = function (newnode) 
	{
        nodes.push(newnode);
        update();
    }

    this.removeNode = function (id) 
    {
        var i = 0;
        var n = findNode(id);
        while (i < links.length) 
        {
            if ((links[i]['source'] === n)||(links[i]['target'] == n)) 
            	links.splice(i,1);
            else i++;
        }
        var index = findNodeIndex(id);
        if(index !== undefined) 
        {
            nodes.splice(index, 1);
            update();
        }
    }

    this.addLink = function (sourceId, targetId) 
    {
        var sourceNode = findNode(sourceId);
        var targetNode = findNode(targetId);
        
     
        if((sourceNode !== null) && (targetNode !== null)) 
        {
            links.push({"source": sourceNode, "target": targetNode, "index": links.length});
            update();
        }
        else
        {
        	echo("One of the connecting links have not been found");
        }
    }
    
    this.removeLink = function (index) 
    {
        //Remove Links
        alert(index);
        links.splice(index,1);
        update();
    }

    var findNodeByHandle = function (handle) 
    {
        for (var i=0; i < nodes.length; i++) 
        {
            if (nodes[i].handle ===(handle))
                return nodes[i]
        };
        return null;
    }

    var findNode = function (id) 
    {
        for (var i=0; i < nodes.length; i++) 
        {
            if (nodes[i].index ===(id))
                return nodes[i]
        };
        return null;
    }

    var findNodeIndex = function (id) 
    {
        for (var i=0; i < nodes.length; i++) 
        {
            if (nodes[i].index ===(id))
                return i
        };
        return null;
    }


	/*------------------------------------*/
	/*-------VARIOUS FUNCTIONS(?)---------*/
	/*------------------------------------*/
	/*------------------------------------*/
	/*------------------------------------*/
    function nodeRadius(d)
    {
    	if (d.incoming!=undefined)
    	{


    	if (d.name!="")
    		return d.incoming.length * 2 + 5;
    	else
    		return 5;
    	}
    	return 10;
    }
    function nodeName(d)
    {
    	if (d.name!="")
    		return d.name;
    	else if (d.type!="")
    		return d.type;
    	else 
    		return d.handle;
    }
 
    function zoomed()
	{

		vis.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	}

	function dragstarted(d)
	{
		d3.event.sourceEvent.stopPropagation();
		nodeDragging = true;
	}

	function dragged(d)
	{

		//d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
	}

	function dragended(d)
	{
		nodeDragging = false;
	}

	 

}

 