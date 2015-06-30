//Some basic variables
var nodeDragging = false;
var nodeClicked = false;
var fps = 0;
var currentShape = null;
var keyDragging = false;
var force = null;
var groupby = "no";
var id = 0;
 

//The main d3 object that contains all the variables and functions
function d3graph(element)
{
	
	var parent = this; //This is stored at the parent variable to help access it later
	this.enableForce = true; //

 	zoom = d3.behavior.zoom().scaleExtent([0.05, 5]).on("zoom", zoomed);
 
 	// The main container of everything
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
		.style("pointer-events", "all")
		.style("cursor","default");
 
	container = vis.append("g");

	//The d3 Force layout Force
    force = d3.layout.force()
    	.charge(preferences.appearanceCharge)
		.gravity(0.1)
		.linkDistance(preferences.appearanceLinkDistance)
		.linkStrength(preferences.appearanceLinkStrength/100)
		.friction(preferences.appearanceFriction/100)
        .size([width, height]);

     
	var color = d3.scale.linear()
	    .domain([ 0, 10])
	    .range(["green", "red"]);
		   
    var drag = force.drag()
		.on("dragstart", dragstarted)	 
		.on("drag", dragged)
		.on("dragend", dragended);

	var node;
 	var nodes = force.nodes(); //The nodes
    var links = force.links(); //and links...

    //Frames per second to keep track how fast things go
    fpsf = null;
    fpsf = setInterval(function () { ffps = fps;   fps=0; }, 1000);


	/*--------------------------*/
	/*----------UPDATE----------*/
	/*--------------------------*/
	/*--------------------------*/
	/*--------------------------*/

	//The main function that makes things happen
    var update = function () 
    {
	    
  		textVisibillity =  preferences.appearanceShowText=="true" ? "visible": "hidden";
		linksVisibillity = preferences.appearanceShowLinks=="true" ? "visible" : "hidden";
	 
    	force.charge(preferences.appearanceCharge)
			.gravity(0.1)
			.linkDistance(preferences.appearanceLinkDistance)
			.linkStrength(preferences.appearanceLinkStrength/100)
			.friction(preferences.appearanceFriction/100)
	        .size([width, height]);
	        
        var color;

        d3.select('#visualizerInner') 
	   		.attr('width', width)
	   		.attr('height', height)

	   	//d3.select('#visualizerInner').append("div").attr("id","fpsScreen")

        node = container.selectAll(".node").data(nodes, function(d) { return   d.handle; });
    	link = container.selectAll(".link").data(links, function(d) { return d.source.id + "-" + d.target.id; });
		 
    	 
        var linkEnter = link.enter().append("line")
            .attr("class", "link")
            .style("visibility",linksVisibillity);

        link.exit().remove();

        var nodeEnter = node.enter().append("g")
	        .attr("class",function(d){return "node " + d.type})
	        .attr("id",function(d){return d.id;})
	        .attr("handle",function(d){return d.handle;})
	        .call(drag);

    	nodeEnter.filter(function(d) { return d.type.search("Link")!=-1 })
	        .append("path")
	        .attr("svghandle",function(d){return d.handle;})
      		.attr("d", d3.svg.symbol().type("triangle-up"))
	        .attr("class", "linkNode")
	        .attr("height", nodeRadius)
	        .attr("width", nodeRadius) 
	        .attr("r", nodeRadius) 
	        .attr("x",function(d){return d.x})
		    .attr("y",function(d){return d.y});

	    if (preferences.displayNodeShape == "circle")
	    {
	    	nodeEnter.filter(function(d) { return d.type.search("Link")==-1 })
		        //.attr("fixed",function(d){return d.incoming.length > 5})
	    		.append("circle")
	    		.attr("svghandle",function(d){return d.handle;})
	    		.attr("class", "nodein")
		        .attr("fill",nodeColor)
		        .attr("x",function(d){return d.x})
		        .attr("y",function(d){return d.y})
		        .attr("r", nodeRadius);

 		}
 		else if (preferences.displayNodeShape=="rectangle")
 		{
 			nodeEnter.filter(function(d) { return d.type.search("Link")==-1 })
	    		.append("rect")
	    		.attr("svghandle",function(d){return d.handle;})
 				.attr("class", "nodein")
		        .attr("fill", nodeColor )
		        //.attr("fixed",function(d){return d.incoming.length > 5})
		        .attr("x",function(d) { return (d.x - nodeRadius); })
		        .attr("y",function(d) { return (d.y - nodeRadius); })
		        .attr("width", nodeRadius)
		        .attr("height", nodeRadius);
 		}
 		else if(preferences.displayNodeShape=="triangle")
 		{
 			nodeEnter.filter(function(d) { return d.type.search("Link")==-1 })
		        //.attr("fixed",function(d){return d.incoming.length > 5})
	    		.append("path")
	    		.attr("svghandle",function(d){return d.handle;})
 				.attr("class", "nodein")
	      		.attr("d", d3.svg.symbol().type("triangle-up"))
		        .attr("fill",nodeColor)
		        .attr("x",function(d){return d.x})
		        .attr("y",function(d){return d.y})
		        .attr("r", nodeRadius);
 		}
 		else if(preferences.displayNodeShape=="none")
 		{

 		}
  
        text = nodeEnter.append("text")
	        .attr("class", "text")
	        .attr("txthandle",function(d){return d.handle;})
	        .attr("class",function(d) { if (d.type.search("Link")!=-1) return "textLink text"; else return "text"; })
	        .style("visibility",textVisibillity)
	        .text(function(d){ return nodeName(d,false);}); 

	        /*
	    textId = nodeEnter.append("text")
	        .attr("class", "text")
			.text(function(d){return "id: " + d.id + " name:" + d.name ;});

	    */
		node.exit().remove();
	   	  	  
    
		//nodeEnter.exit().remove();
        //linkEnter.exit().remove();

        //This function is called every time a new position of 
        //all the nodes of the graphs have been specified.

        force.on("tick", function() 
        {
       
	        if (preferences.appearanceShowLinks)
	        {
	        	if(groupby=="id")
	        	{
	        		 link
			          .attr("x1", function(d) { return d.source.x + ( d.source.id *160); })
			          .attr("y1", function(d) { return d.source.y + ( d.source.id % 2)*100; })
			          .attr("x2", function(d) { return d.target.x + ( d.target.id *160); })
			          .attr("y2", function(d) { return d.target.y+ ( d.target.id % 2)*100;    });
	        	}
	        	else
	        	{
        		 link
		          .attr("x1", function(d) { return d.source.x; })
		          .attr("y1", function(d) { return d.source.y; })
		          .attr("x2", function(d) { return d.target.x; })
		          .attr("y2", function(d) { return d.target.y;   });	
	        	}
	         
			}  

			if(groupby=="id")
				node.attr("transform", function(d) { return "translate(" +   ( d.id *160) + "," + ( d.id % 2)*100 + ")"; });
			else
				node.attr("transform", function(d) { return "translate(" +   d.x + "," +  d.y + ")"; });


          	
          	fps++;
        });
 
	    /*------------------------------------*/
		/*---------------EVENTS---------------*/
		/*------------------------------------*/
		/*------------------------------------*/
		/*------------------------------------*/
		rect.on("mouseover", function(d) 
		{
			if ((preferences.selectedTool == "Highlight"))
			{
				link.transition(transitionSpeed).duration(transitionSpeed).style("stroke-opacity", 1);
				node.transition(transitionSpeed).duration(transitionSpeed).style("opacity", 1);
			}
		});

		text.on("click",function(d)
		{
			if (d3.select(this).classed("fullName")==false)
			{
				d3.select(this).text(function(d){return nodeName(d,true)});
				d3.select(this).classed("fullName",true);
			}
			else
			{
				d3.select(this).text(function(d){return nodeName(d,false)});
				d3.select(this).classed("fullName",false);	
			}
		});

		d3.select("body").on("keydown", function() 
		{
			if ( d3.event.shiftKey)
				keyDragging = true;
    	});

		d3.select("body").on("keyup", function()
		{	 
			keyDragging = false;	 
    	});
		 


		vis.on("mouseup", function(d) 
		{
			node.classed("tempSelected",false);
		 
			//if (dragging) return;
			$(".contextMenu").css({ display: "none" });
			selectedNode = null;
			clearAtomDetails();
			if (preferences.selectedTool == "pointer")
			{
				//d3.select(this).select("circle").transition().duration(transitionSpeed).attr("r", nodeRadius);
				if ((!d3.event.shiftKey) && (!dragging))
					node.classed("selectedNode",false);
				
				link.transition(transitionSpeed).duration(transitionSpeed).style("stroke-opacity", 0.8);
				node.transition(transitionSpeed).duration(transitionSpeed).style("opacity", 1);
				connectedNode.splice(0, connectedNode.length);
			}
			else if (preferences.selectedTool == "addNode")
			{
				atomis = defaultAtom();
 		 
				$.ajax(
				{
					url: preferences.cogserver + 'api/v1.1/atoms',
					type: 'OPTIONS',
					data: atomis	
				})
				.success(function(data)
				{
					atomis["x"] = d3.mouse(this)[0];
					atomis["y"] = d3.mouse(this)[1];
					parent.addNode(atomis);
				})
				.fail(function(data)
				{
					//Failed
					atomis["x"] = d3.mouse(this)[0];
					atomis["y"] = d3.mouse(this)[1];
				});	
			}
			dragging = false;
		});

		link.on("click", function(d) 
		{
			$(".contextMenu").css({ display: "none" });
			if (preferences.selectedTool == "removeLink")
			{
				parent.removeLink(d.index);
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
			$(".contextMenu").css({ display: "none" });
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
		 
		node.on("contextmenu", function(d)
		{
			  
			$(".contextMenu").css({ display: "none" });

			$("#NodeContextMenu").css({
		      display: "block",
		      left: d3.event.pageX + "px",
		      top: d3.event.pageY + "px"  
		    });
			 
			node.classed("tempSelected",false);
			d3.select(this).classed("tempSelected",true);

	 		rightClickNode = d;
	 		d3rightClickNode= d3.select(this);

	 		if (d.collapsed)
	 			$("#NodeCMCollapseExpand").html("<i class='fa fa-plus-square'></i> Expand All</a>"); 
	 		else
	 			$("#NodeCMCollapseExpand").html("<i class='fa fa-minus-square'></i> Collapse All</a>"); 
	 		
			if ( (d.fixed)==3 )
		    	$("#NodeCMFix").html("Unfix Position");  
		    else
		    	$("#NodeCMFix").html("Fix Position");  

		    if ( (d.highlight)==true )
		    	$("#NodeCMHighlight").html("Unhighlight");  
		    else
		    	$("#NodeCMHighlight").html("Highlight"); 


		    if ((d.incoming.length==0) && (d.outgoing.length))
		    	$("#NodeCMShowConnections").prop('disabled',true);
		    else
		    	$("#NodeCMShowConnections").prop('disabled',false);

		   	d3.event.preventDefault();

			return false;
		});

		/*
		vis.on("contextmenu", function(d)
		{
			d3.event.preventDefault();
			$(".contextMenu").css({ display: "none" });
			$("#VisContextMenu").css({
		      display: "block",
		      left: d3.event.pageX,
		      top: d3.event.pageY  
		    });
 
			return false;
		});
		*/

		node.on("click",function(d)
		{
			//TOOL POINTER

	 	 	if (preferences.selectedTool == "pointer")
			{
				if (d3.event.ctrlKey)
				{ 
					 
					parent.collapseExpand(d);
					return;
				 
				}
 				if (d3.event.shiftKey)
				{ 
					d3.select(this).classed("selectedNode",true);
					keyDragging = false;
				}
				else
				{
					if (d!=selectedNode)
					{
						selectedNode = d;
						showSelectedAtom(d);
				 		atomDetailsChanged = false;
				 		$("#atomDetailsUpdate").prop("disabled",true);
				 		$("#atomDetailsDelete").prop("disabled",false);
		 			}
					node.classed("selectedNode",false);
					link.classed("selectedLink",false);
					d3.select(this).classed("selectedNode",true);
					showSelectedAtom(d);
				}
 

			}
			//TOOL REMOVE NODE
			else if (preferences.selectedTool == "removeNode")
			{
				deleteNode(d);
				return;
			}
			//TOOL ADD LINK
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
			//TOOL REMOVE LINK
			else if (preferences.selectedTool == "removeLink")
			{

			}
			//TOOL HIGHLIGHT
			else if (preferences.selectedTool == "highlight")
			{
				 
				if (d3.select(this).classed("highlight")==true)
				{
					d3.select(this).classed("highlight",false);
					position = $.inArray(d, highlightedAtoms);
					if (position!=-1)
						highlightedAtoms.splice(position,1);
				}
				else
				{
					d3.select(this).classed("highlight",true);
					highlightedAtoms.push(d);
				}
			}
			else if (preferences.selectedTool == "collapseexpand")
			{
				parent.collapseExpand(d);
			}

			d3.event.stopPropagation();

			


			if (atomDetailsChanged && d!=selectedNode)
			{
				if ( !confirm("Are you sure you want to select other atom without updating it's settings?") )
					return;
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
 	 
			if ((preferences.selectedTool == "ShowConnections"))
			{
				node.transition(transitionSpeed).duration(transitionSpeed).style("opacity", function(o)
				{
					return isConnected(d, o) ? 1.0 : 0.1;
				})
	 
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
				return;
			}

			if ((preferences.selectedTool == "addLink") && (linkToolNode1!=null))
			{
				d3.select(this).classed("linkToolNode",true);
				return;
			}
		 
		})

		node.on("mouseout", function(d)
		{
			node.classed("node-active", false);
			link.classed("link-active", false);
			d3.select(this).select("circle").transition().duration(transitionSpeed).attr("r", nodeRadius);
			connectedNode.splice(0, connectedNode.length);
		});

		force.start(); 
	    drawedd3 = true;
	    
    }

    update();
 	
	/*--------------------------*/
	/*--------FUNCTIONS---------*/
	/*--------------------------*/
	/*--------------------------*/
	/*--------------------------*/
 
 	this.showAll = function()
 	{
 		//this.link.transition(transitionSpeed).duration(transitionSpeed).style("stroke-opacity", 1);
		//this.node.transition(transitionSpeed).duration(transitionSpeed).style("opacity", 1);
 	}

	this.updateForce = function()
	{

		force.charge(preferences.appearanceCharge)
			.gravity(0.1)
			.linkDistance(preferences.appearanceLinkDistance)
			.linkStrength(preferences.appearanceLinkStrength/100)
			.friction(preferences.appearanceFriction/100)
	        .size([width, height]);

	    force.start();
	}

	//Add nodes to the visualizer
    this.addNodes = function(newnodes) 
	{
		 
        if (newnodes==null)return;
        id = (nodes.length)
     

        for(var i=0;i<newnodes.length;i++)
    	{
    		 
    		if (newnodes[i].id==undefined)
    		{
    			newnodes[i].id = id;
    			id++;
    		}
    		//collapsed = (newnodes[i].collapsed==undefined) ? false :  newnodes[i].collapsed;
			//newnodes[i].collapsed  = collapsed;
    		nodes.push(newnodes[i]);
    	}	
 
        parent.refreshLinks();
        
        update();

    }
    // Calculate the links based on incoming and outgoing arrays

    this.refreshLinks = function ()
    {

    	for(var i=0;i<nodes.length;i++)
        {
        	
	    	for (var li=0;li<nodes[i].incoming.length;li++)
	    	{
	    		if(findNodeByHandle(nodes[i].incoming[li]))
	    			links.push({"source": nodes[i], "target": findNodeByHandle(nodes[i].incoming[li]), "index": links.length});
	    	}
    	
    	
	    	for (var lo=0;lo<nodes[i].outgoing.length;lo++)
	    	{
	    		if(findNodeByHandle(nodes[i].outgoing[lo]))
	    			links.push({"source": findNodeByHandle(nodes[i].outgoing[lo]), "target": nodes[i], "index": links.length});
	    	}
	    	
    	}
    }

	this.addNode = function (newnode) 
	{
		newnode.id = nodes.length + 1;
        nodes.push(newnode);
        //collapsed = (newnode.collapsed==undefined) ? false :  newnode.collapsed;
        //newnode.collapsed = collapsed;
        parent.refreshLinks();
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
        i = 0;

        var index = findNodeIndex(id);
 
         
        for (var i;i<nodes.length;i++)
        {
        	if ((nodes[i].index === index))
            	nodes.splice(i, 1);	 
        }
      
   
        //node.exit().remove();
        update();
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
        	echo("One of the connecting links have not been found");
    }
    
    this.removeLink = function (index) 
    {
        links.splice(index,1);
        update();
    }

    this.update = function ()
    {
    	links = [];
    	nodes = [];
    }

    this.stop = function()
    {
    	force.stop();
    }

    this.showFullText = function()
    {
    	d3.selectAll(".text").classed("fullName",true).text(function(d){return nodeName(d,true)}) ;
    } 

 	this.showAbbrevatedText = function()
    {
    	d3.selectAll(".text").classed("fullName",false).text(function(d){return nodeName(d,false)}) ;
    }

	this.updateDisplay = function()
    {

    	if (currentShape!=preferences.displayNodeShape)
    	{
    		d3.selectAll(".nodein").remove();
    		d3.selectAll(".node").append("circle").attr("class","nodein").attr("r",nodeRadius);
    		currentShape = preferences.displayNodeShape;
    	}
 		
 		if (String2Boolean(preferences.textShowLinkTypeName)==true)
    		d3.selectAll(".textLink").style("display","block");
    	else
    		d3.selectAll(".textLink").style("display","none");
		
		rect.style("background-color",preferences.ColorBackgroundColor)
			.attr("fill",preferences.ColorBackgroundColor);

		d3.select("#screen-d3").style("background-color",preferences.ColorBackgroundColor)
			.attr("fill",preferences.ColorBackgroundColor);

    	d3.selectAll(".nodein").transition().duration(transitionSpeed)
	    	.attr("r", nodeRadius)
	    	.attr("width", nodeRadius)
	    	.attr("height", nodeRadius);

	    //COLORS
	    //if ($("#ColorColorMethod").val()=="simple")	
	    d3.selectAll(".nodein").attr("fill",nodeColor)	
    	
     	d3.selectAll(".nodein").style("opacity",preferences.colorSimpleTransparency/100);

    }

    // This functions puts the incoming into _incoming for temp storing them.
    // It is used for the expand collapse function
    this.switchConnections = function(node)
    {

	  if  ( !(node.collapsed!=undefined) &&  (node.collapsed>0) )
	  {
	  	 
	    node.incoming = node._incoming;
	    node.outgoing = node._outgoing;
	    node._outgoing = [];
	    node._incoming = [];
	  }
	  else
	  { 
	    node._incoming = node.incoming;
	    node._outgoing = node.outgoing;
	    node.incoming = [];
	    node.outgoing = []; 
	  };
	  return node;
   
    }

    this.normalizeNode = function(node)
    {
    	if ( (node._incoming!=undefined) && (node.incoming!=[]))
		{	
			node.incoming = node._incoming;
			node._incoming = [];
		}
		if ((node._outgoing!=undefined) && (node.outgoing!=[]))
		{	
			node.outgoing = node.outgoing;
			node._outgoing = [];
		}
		return node;
    }
    //Check if n is integer
    function isInt(n) {
   	return n % 1 === 0;
	}


	//Collapse and expand function
    this.collapseExpand = function(d)
	{
		
		var max =50;
		var count = 0;
		var nodesDeleted = 0;
		var firstNode = d;
		var finalnode;
		var collapsedArray = [];

		function recurse(node)
		{
			finalnode = node;
			if (count>max) return;

			count++;

			if (isInt(node))
			{
				for (var i=0;i<nodes.length;i++)
				{
					if (nodes[i].handle == node)
					{
						finalnode = nodes[i];
						finali = i;
						break;
					}
				}
			}

			if (finalnode.id==undefined) return;

			if (firstNode!==finalnode)
			{
				deleteNode(finalnode);
				collapsedArray.push(parent.normalizeNode(finalnode));
				nodesDeleted++;
			}
			
			if ( (finalnode.incoming!=undefined))
			{
				if (finalnode.incoming.length>0) 
					finalnode.incoming.forEach(recurse);
			}
	
			if ( (finalnode.outgoing!=undefined))
			{
				if (finalnode.outgoing.length>0) 
					finalnode.outgoing.forEach(recurse);
			}
	 	 
			finalnode = parent.switchConnections(finalnode);
	  
		}

		if (firstNode.collapsed>0)
		{
		 	 console.log(collapsedNodes[firstNode.id])
		 	 parent.addNodes((collapsedNodes[firstNode.id]));
		 	 collapsedNodes.splice(  collapsedNodes.indexOf(collapsedNodes[firstNode.id]),1  );
			/*or (var i=0;i<collapsedNodes[firstNode.id].length;i++)
			{
				nodeTemp = parent.switchConnections(collapsedNodes[firstNode.id][i]); 
				
				//parent.addNode(nodeTemp) ;
				nodes.push(nodeTemp);
				force.start();
			}*/
			
			//update();
			 
		
			
			firstNode.collapsed = 0;
		}
		else
		{
			
			recurse(d);
			firstNode.collapsed = nodesDeleted;
			collapsedNodes[firstNode.id] = collapsedArray; 
			
		}

 		console.log(nodes);
		return;
	}

    this.unhighlightAll = function()
    {
    	d3.selectAll(".node").classed("highlight",false);
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
            if (nodes[i].id ===(id))
                return nodes[i]
        };
        return null;
    }

    var findNodeIndex = function (id) 
    {
        for (var i=0; i < nodes.length; i++) 
        {
            if (nodes[i].id ===(id))
                return i
        };
        return null;
    }

	/*------------------------------------*/
	/*-------VARIOUS FUNCTIONS(?)---------*/
	/*------------------------------------*/
	/*------------------------------------*/
	/*------------------------------------*/


 	//This function selectes the symbol to be assigned 
 	//to each svg element created by d3
	function nodeAppend(d)
	{
		if ( d.type.search("Link")!=-1)	
			return  d3.svg.symbol().type("triangle-up");
		else
		{
			if (preferences.displayNodeShape = "circle")
				return d3.svg.symbol().type("circle");
			else if (preferences.displayNodeShape =="triangle")
				return d3.svg.symbol().type("triangle-down");
			else if (preferences.displayNodeShape=="rectangle")
				return d3.svg.symbol().type("rectangle");	
		}
	}

	//This function determines the size of the node
    function nodeRadius(d)
    {
    	
 	 
		finalCollapsed = ((d.collapsed!=undefined) && (d.collapsed!=false)) ? finalCollapsed = (d.collapsed / 10 ) : 1 ; 
 
    	if (preferences.radiusBased=="Incoming")
    	{
	    	if (d.incoming!=undefined)
	    	{
		    	if (d.name!="")
		    		return d.incoming.length * (preferences.displayRadiusMultiplier/10) + 2 + finalCollapsed;
		    	else
		    		return 1  + finalCollapsed;
	    	}
	    	return 10;
	    }
    	else if (preferences.radiusBased=="Outgoing")
    	{
    		if (d.outgoing!=undefined)
	    	{
		    	if (d.name!="")
		    		return d.outgoing.length * (preferences.displayRadiusMultiplier/10) + 2 + finalCollapsed;
		    	else
		    		return 1 + finalCollapsed;
	    	}
	    	return 10;
    	}
    	else if (preferences.radiusBased=="IncomingOutgoing")
    	{
    		if (d.name!="")
		    		return (d.outgoing.length + d.incoming.length) * (preferences.displayRadiusMultiplier/10) + 2 + finalCollapsed;
		    	else
		    		return 1 + finalCollapsed;
    	}
    	else if (preferences.radiusBased=="AtomType")
    	{
    		return preferences.displayRadiusMultiplier + finalCollapsed;
    	}
    	else if (preferences.radiusBased=="Fixed")
    	{
    		return preferences.displayRadiusMultiplier + finalCollapsed;
    	}
    	else if (preferences.radiusBased=="Random")
    	{
    		return Math.random() * preferences.displayRadiusMultiplier + finalCollapsed;
    	}
    	else if (preferences.radiusBased=="sti")
    	{
    		return  d.attentionvalue.sti * preferences.displayRadiusMultiplier + finalCollapsed;
    	}
    	else if (preferences.radiusBased=="lti")
    	{
    		return  d.attentionvalue.lti * preferences.displayRadiusMultiplier + finalCollapsed;
    	}
     

    }
    
    //This function determines the node name
    function nodeName(d,full)
    {
    	 
    	finalCollapsed  = ((d.collapsed!=undefined)  ) ? "+ " : " " ;
    	
    	if (full)
    	{
	    	if (d.name!="") return finalCollapsed + d.name;
	    	else if (d.type!="") return  finalCollapsed + d.type;
	    	else
	    	if(d.type.search("Link")==-1) return finalCollapsed + d.handle  ;
    	}
    	else
    	{
	    	if (d.name!="") return finalCollapsed + d.name.substring(0,10);
	    	else if (d.type!="") return finalCollapsed + d.type.substring(0,10);
	    	else
	    	if(d.type.search("Link")==-1) return finalCollapsed + d.handle.substring(0,10) ;
	    }
    }

    //This function determines the node color
    function nodeColor(d)
    {

    	if (d.fixed==3)
    		return "#ccc";
 
    	if (d.highlight==true)
    		return "#ccc";
    	
    	if (d.rightSelected)
    		return "#ccc";
    	
    	if (preferences.colorNodeBased=="simple")
    	{
    		return preferences.ColorSimpleColor;
    	}
    	else if (preferences.colorNodeBased=="incoming")
    	{
    		color = d3.scale.linear()
		    .domain([ 0, stats["maxIncomingAll"]])
		    .range([preferences.colorNodeRange1, preferences.colorNodeRange2]);

    		return(color(d.incoming.length));
    	}
    	else if (preferences.colorNodeBased=="outgoing")
    	{
    		color = d3.scale.linear()
		    .domain([ 0, stats["maxOutgoingAll"]])
		    .range([preferences.colorNodeRange1, preferences.colorNodeRange2]);

    		return(color(d.outgoing.length));
    	}
    	else if (preferences.colorNodeBased=="incomingoutgoing")
    	{
    		color = d3.scale.linear()
		    .domain([ 0, stats["maxIncomingAll"] + stats["maxOutgoingAll"]])
		    .range([preferences.colorNodeRange1, preferences.colorNodeRange2]);

    		return(color(d.incoming.length + d.outgoing.length));
    	}
    	else if (preferences.colorNodeBased=="atomtype")
    	{
    		
			for (var i=0; i<AtomTypesColors.length; i++)
			{
				if ( AtomTypesColors[i][0] == d.type )
					return (AtomTypesColors[i][1]);	
			} 
    	}
    	
    }

 	//On zoom
    function zoomed()
	{
		dragging = true;
		if (keyDragging) return;
		if (d3.event.shiftKey)return;
		container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	}

	function dragstarted(d)
	{
		d3.event.sourceEvent.stopPropagation();
		d3.select(this).classed("dragging", true);
		 
    }

    function dragged(d)
    {
		d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    }

    function dragended(d)
    {
		d3.select(this).classed("dragging", false);
    }

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
		for ( jnode = 0; jnode < atomData.length; jnode++)
			if (handle == atomData[jnode].handle)
				return atomData[jnode];
	}
	// Check if two nodes are connected
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

	 
	

}