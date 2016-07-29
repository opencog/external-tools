angular.module('glimpse')
    .directive('planarView', function (utils, simplifications) {

        function linkDirective(scope, element, attributes) {

            var settingsChanged = {}, force, svg, svg_g, node, edge;

	        var D2R = Math.PI / 180, radius=100, focusnode = 0, startAngle= 0, ring =0;;	
		    //Width and height
			var w = 960 ;
			var h = 500 ;

            // Create force layout and svg
            force = d3.layout.force()
                .nodes([])
                .links([])
                .size([scope.settings.size.width, scope.settings.size.height])
                .on("tick", function () {

                    edge.selectAll("path.line").attr("d", function (d) {
                        return "M" + d.source.x + " " + d.source.y + "L " + d.target.x + " " + d.target.y;
                    });

                    edge.selectAll("path.text_path").attr("d", function (d) {
                        var reverse = d.source.x < d.target.x;
                        var start = reverse ? d.source : d.target,
                            end = reverse ? d.target : d.source;
                        return "M" + start.x + " " + start.y + "L " + end.x + " " + end.y;
                    });

                    node.attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });
                });

            svg = d3.select(element[0])
                .append("svg:svg")
                .attr("width", scope.settings.size.width).attr("height", scope.settings.size.height)
              .call(d3.behavior.zoom().on("zoom", function () {
                svg_g.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
                }));

            svg_g = svg.append("svg:g");

            node = svg_g.selectAll(".node");
            edge = svg_g.selectAll(".edge");

            // Add Arrow definition
            svg.append("defs").selectAll("marker")
                .data(["node_start", "node_end", "link_start", "link_end"])
                .enter().append("marker")
                .attr("id", function (d) {
                    return d;
                })
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", function (d) {
                    return ({"node_start": -15, "node_end": 25, "link_start": -6, "link_end": 16})[d];
                })
                .attr("refY", 0)
                .attr("markerWidth", 9)
                .attr("markerHeight", 9)
                .attr("orient", "auto")
                .append("path")
                .attr("d", function (d) {
                    return (d == "node_start" || d == "link_start") ? "M0,0L10,-5L10,5Z" : "M0,-5L10,0L0,5";
                });

            // Monitor bounding box dimensions
            settingsChanged.size = function (size) {
                svg.attr("width", size.width).attr("height", size.height);
                force.size([size.width, size.height]);
                force.start();
            };

            // Monitor force params
            settingsChanged.force = function (forceParams) {
                force.charge(forceParams.charge)
                    .friction(scope.settings.force.friction)
                    .gravity(forceParams.gravity)
                    .linkDistance(function (link) {
                        if (link.label)
                            return forceParams.linkDistance * 6;
                        return forceParams.linkDistance;
                    })
                    .linkStrength(forceParams.linkStrength);
                force.start();
            };

            // Monitor text settings
            settingsChanged.text = function (textSettings) {
                node = svg_g.selectAll(".node");
                node = node.data(force.nodes());

                // For nodes
                node.select("text").filter(function (d) {
                    return !utils.isLink(d);
                }).text(function (d) {
                    if (textSettings.node == "full")
                        return d.label;
                    else if (textSettings.node == "abbreviated")
                        return (d.label.length > 10) ? d.label.substr(0, 8) + "..." : d.label;
                    return "";
                });

                // For Links
                node.select("text").filter(function (d) {
                    return utils.isLink(d);
                }).text(function (d) {
                    if (textSettings.link == "full")
                        return d.label;
                    else if (textSettings.link == "abbreviated")
                        return (d.label.length > 10) ? d.label.substr(0, 8) + "..." : d.label;
                    return "";
                });
            };

	     // Monitor Filter changed
	    var atomfilter = function (filter) {
		if(filter == 'all')
		{
		 d3.selectAll(".node, .edge").transition()
                 .style("opacity", 1);
		}
		else if(scope.filt[0]+scope.filt[1]+scope.filt[2]+scope.filt[3]== 'hide')
		{
			filter = filter.substr(4);
			console.log(filter)	;
		  var selected = node.filter(function (d, i) {
          		  return d.type == filter;
       		   });
		
		selected.style("opacity", "0");
		var selectededg = scope.atoms.filter(function (d, i) {
			 if (d.type != filter) {return d["handle"]};
       		});
		var edgestoshow = [];
		for(var x=0; x < selectededg.length; x++) { edgestoshow.push(selectededg[x].handle); }
		console.log(edgestoshow);
		edge.style("opacity", function (d) {
                    return (edgestoshow.indexOf(d["source"]["handle"]) > -1 && edgestoshow.indexOf(d["target"]["handle"]) > -1) ? 1 : 0;
                        });
		}

		else{
                console.log(edge);
		var selected = node.filter(function (d, i) {
          		  return d.type != filter;
       		});
		selected.style("opacity", "0");
		var selectededg = scope.atoms.filter(function (d, i) {
			 if (d.type == filter) {return d["handle"]};
       		});
		var edgestoshow = [];
		for(var x=0; x < selectededg.length; x++) { edgestoshow.push(selectededg[x].handle); }
		console.log(edgestoshow);
		edge.style("opacity", function (d) {
                    return (edgestoshow.indexOf(d["source"]["handle"]) > -1 && edgestoshow.indexOf(d["target"]["handle"]) > -1) ? 1 : 0;
                        });
		   }
		 };
	var roothandles = [];
        // Monitor tool changed
        var toolChanged = function (newTool) {
                if (newTool != 'focus') {
                    node.style("opacity", "1");
                    edge.style("opacity", "1");
                }
		if (newTool == 'tree') {
                    node.style("opacity", function (d) {
                        return (roothandles.indexOf(d["handle"]) > -1) ? 1 : 0;
                        });
                    edge.style("opacity", function (d) {
                     return (roothandles.indexOf(d["source"]["handle"]) > -1 && roothandles.indexOf(d["target"]["handle"]) > -1) ? 1: 0;            				});
                   }
            };

            // Update display whenever atoms change
        scope.$watch('atoms', function (atoms) {
		
                // Index and simplify atoms from the server
                var _atoms = utils.indexAtoms(atoms);
                _atoms = simplifications.simplify(_atoms, scope.settings.simplifications);
                var graph = utils.atoms2Graph(_atoms);
				
		        // Add new nodes and update existing ones
                for (var i = 0; i < graph.nodes.length; i++) {
                    var nodeIndex = utils.indexOfNode(force.nodes(), graph.nodes[i]);
                    if (nodeIndex == -1) { //New Node
                        force.nodes().push(graph.nodes[i]);
                    }
                    else { // Update existing
                        force.nodes()[nodeIndex].label = graph.nodes[i].label;
                        force.nodes()[nodeIndex].type = graph.nodes[i].type;
                    }
                }

                // Remove nodes not in the updated atoms
                force.nodes(force.nodes().filter(function (n) {
                    return utils.indexOfNode(graph.nodes, n) > -1;
                }));

                // Add new links and update existing ones
                for (i = 0; i < graph.edges.length; i++) {
                    var linkIndex = utils.indexOfLink(force.links(), graph.edges[i]);
                    if (linkIndex == -1) {
                        force.links().push({
                            source: utils.getAtomByHandle(force.nodes(), graph.edges[i]["source"]),
                            target: utils.getAtomByHandle(force.nodes(), graph.edges[i]["target"]),
                            label: graph.edges[i]["label"],
                            arrow: graph.edges[i]["arrow"]
                        });
                    }
                    else {
                        force.links()[linkIndex].label = graph.edges[i].label;
                        force.links()[linkIndex].arrow = graph.edges[i].arrow;
                    }
                }

                // Remove links...
                force.links(force.links().filter(function (n) {
                    for (var i = 0; i < graph.edges.length; i++) {
                        if (n.source && n.target)
                            if (graph.edges[i].source == n.source.handle && graph.edges[i].target == n.target.handle) return true;
                    }
                    return false;
                }));

                // Clear canvas
                svg_g.selectAll(".node").remove();
                svg_g.selectAll(".edge").remove();

                //Draw Edges
                edge = svg_g.selectAll(".edge");
                edge = edge.data(force.links());
                edge.enter()
                    .append("g")
                    .attr("class", "edge");
                edge.append("path")
                    .attr("class", "line")
                    .style("marker-start", function (d) {
                        return (d.arrow == "<" || d.arrow == "<>") ? (utils.isNode(d.source) ? "url(#node_start)" : "url(#link_start)") : "";
                    })
                    .style("marker-end", function (d) {
                        return (d.arrow == ">" || d.arrow == "<>") ? (utils.isNode(d.target) ? "url(#node_end)" : "url(#link_end)") : "";
                    });
                edge.append("path")
                    .attr("class", "text_path")
                    .attr("id", function (d, i) {
                        return "edge_" + i;
                    });
                
                edge.append("text").attr("dy", "-4")
                    .append("textPath").attr('xlink:href', function (d, i) {
                        return "#edge_" + i;
                    })
                    .attr("startOffset", "50%")
                    .text(function (d) {
                        return d.label;
                    });

		function mouseover() { // nodes on mouse over
  			d3.select(this).select("circle").transition()
     			  .duration(750)
      			  .attr("r", 26);

			d3.select(this).select("text").attr("font-size", "20px");
			}

		function mouseout() { // nodes on mouse out
  			d3.select(this).select("circle").transition()
      			  .duration(750)
      			  .attr("r", function (d) {
               		  return utils.isLink(d) ? 6 : 14;
               		 });
			d3.select(this).select("text").attr("font-size", "10px");
			}
		
		// Locate nodes in a radial layout
		function brfs(grph){
				traversedNodes=[];
				traversedNodes.push(grph.nodes[focusnode]);
				var marked={};
				while (traversedNodes.length != 0) {
				var v = traversedNodes.shift();
				console.log(v);
			if(v == grph.nodes[focusnode])
				{ 
				    v.x= w/2; v.y= h/2; v.fixed = true; v.px= w/2; v.py= h/2;
				    marked[v.index]=true;
				    var neghbours= [];
				    console.log(grph);
				    var adjList = [];
				    adjList=findchilds(v, grph);
				    console.log("childs" + adjList);
				    for (var a=0;a< adjList.length;a++){
				       u=adjList[a];
				       if(marked[u.index]!=true){
				          marked[u.index]=true;
				           neghbours.push(u);
				      var currentAngle = startAngle + ((360/adjList.length) * (a));
				      var currentAngleRadians = currentAngle * D2R;
				      var radialPoint = {
     					 x: (w / 2) + radius * Math.cos(currentAngleRadians), 
     					 y: (h / 2) + radius * Math.sin(currentAngleRadians)
   		 					};
	   			u.x = radialPoint.x;
	   			u.px = radialPoint.x;
	   			u.y = radialPoint.y;
	   			u.py = radialPoint.y;
	   			u.fixed = true;
								}
									}
				traversedNodes.push(neghbours);
				console.log("Traversed nodes" + traversedNodes);
				}
			else if(v.length > 0)
			{
				rad= radius * ring;
				console.log(v);
				console.log(radius);
				var neghbours= [];
			
				for(var j=0; j< v.length; j++)
				{
				if (marked[v[j].label]=== false) {marked[v[j].label]=true;}
					adjList=findchilds(v[j], grph );
					for (var a=0; a< adjList.length; a++){
						u=adjList[a];
						if(marked[u.index]!=true){
						marked[u.index]=true;
						neghbours.push(u);
									}
					}
			
				}
				for (var loc= 0; loc < neghbours.length; loc++)
				{	
				var currentAngle = startAngle + ((360/neghbours.length) * (loc));
				var currentAngleRadians = currentAngle * D2R;
				var radialPoint = {
     				 x: (w / 2) + rad * Math.cos(currentAngleRadians), 
     				 y: (h / 2) + rad * Math.sin(currentAngleRadians)
   				};
				neghbours[loc].x = radialPoint.x;
				neghbours[loc].y = radialPoint.y;
				neghbours[loc].px = radialPoint.x;
				neghbours[loc].py = radialPoint.y;
				neghbours[loc].fixed = true;
				}
			if(neghbours.length !=0) {traversedNodes.push(neghbours);}
			}
			ring++;
			console.log(ring);
			}
		}
			function findchilds(node, grph){
			var outnode=[];
			for(x=0; x< node.outgoing.length; x++)
				{
				outnode.push(node.outgoing[x].handle);
				}
				var nodehandles= (node.incoming).concat(outnode);
				var n= [];
				for(a=0; a< grph.nodes.length; a++) {
				   for(x=0; x< nodehandles.length; x++)
					{
					if(grph.nodes[a].handle == nodehandles[x])
						{n.push(grph.nodes[a]);}
					}
				}
			return n;
				}
			

                //Draw Nodes
        node = svg_g.selectAll(".node");
        node = node.data(force.nodes());
        node.enter().append("g").attr("class", "node");
        node.call(force.drag().on("dragstart", function (d) {
                    d3.event.sourceEvent.stopPropagation();
                }));
                node.append("circle").attr("r", function (d) {
                    return utils.isLink(d) ? 6 : 14;
                });

        node.append("text").attr("x", function(d) { return d.cx; }).attr("y", function(d) { return d.cy; });

		node.on("mouseover", mouseover);
		node.on("mouseout", mouseout);
		node.on("click", function (sender) {
		
		// depth-first search for nodes 
		function dfs(node, graph){
				ans=[];
				traversedNodes=[];
				traversedNodes.push(node);
				allNodes=graph.nodes;
				marked={};
				while(traversedNodes.length!=0){
				var v = traversedNodes.pop();
				marked[v.index]=true;
				adjList= findchilds(v, graph);
				ans.push(v);
				for (var i=0;i<adjList.length;i++){
					u=adjList[i];
					if(marked[u.index]!=true){
						traversedNodes.push(u);
						marked[u.index]=true;
						}
					}			
				}
					return ans;
				}
		// monitor radial layout
        		function radmonitor(){
        			for (var c=1; c < ring-1; c++)
        			    {
        			var outerCircle = svg_g.append("circle").attr({
            			    cx: w/2,
           			    cy: h/2,
            			    r: radius * c,
            			    fill: "none",
            			    stroke: "white"
        			                    });
        			    } 
        			for (g=0; g < graph.nodes.length; g++)
        			{
        			if(sender.index != graph.nodes[g].index ){
        			if (sender.x == graph.nodes[g].x && sender.y == graph.nodes[g].y && sender.px == graph.nodes[g].px && sender.px == graph.nodes[g].px)
        			{ 
        			//graph.nodes[g].fixed = false;
                    		var c = dfs(graph.nodes[g], graph);
                    			for(a=0; a < c.length; a++)
                        			{
                           			c[a].fixed = false;                                    
                        			}                                 
        	  		}
        			}
        			}
						
        		    }
			
                    if (scope.tool == 'select' || scope.tool == 'focus' || scope.tool == 'center' || scope.tool == 'getroot' ) {
                        if (d3.event.shiftKey || d3.event.ctrlKey) {
                            if (scope.selectedHandles.indexOf(sender.handle) == -1)
                                scope.selectedHandles.push(sender.handle);
                            else
                                scope.selectedHandles.splice(scope.selectedHandles.indexOf(sender.handle), 1);
                        } else {
                            scope.selectedHandles = [sender.handle];
                        }
                        node.attr("class", function (d) {
                            return scope.selectedHandles.indexOf(d.handle) == -1 ? "node" : "node node_selected";
                        });
                    }
  
                    if (scope.tool == 'anchor') {
                        sender.fixed = !d3.event.altKey;
                    }
                    
                    if (scope.tool == 'focus') {
            			ring =1;
            			focusnode = sender.index;
            			brfs(graph);
            			radmonitor();
            			var linksTohide = [];
            			var nodeHandlesToShow = [sender["handle"]];
            			
                                    for (var depth = 0; depth < 2; depth++) {
                                        var newHandlesToShow = [];
                                        for (var i = 0; i < nodeHandlesToShow.length; i++) {
                                            if (_atoms.hasOwnProperty(nodeHandlesToShow[i]))
            				newHandlesToShow = newHandlesToShow.concat(utils.getAllNeighborHandles(_atoms[nodeHandlesToShow[i]]));
            				}
            				for(a=0; a < newHandlesToShow.length; a++){
            				for(b=0; b < graph.nodes.length; b++)
            				  {
            					if(newHandlesToShow[a] == graph.nodes[b].handle)
            					    { if(graph.nodes[b].type == 'ListLink' || graph.nodes[b].type == 'SetLink') 
                                     {
                                        linksTohide = linksTohide.concat(graph.nodes[b].handle);
                                    newHandlesToShow = newHandlesToShow.concat(utils.getAllNeighborHandles(_atoms[newHandlesToShow[a]]));
                                         }
            						}	
            				  }
            				    }
            			nodeHandlesToShow = nodeHandlesToShow.concat(newHandlesToShow);
                                   	nodeHandlesToShow = $.unique(nodeHandlesToShow);
            			console.log(nodeHandlesToShow + "hide this" +linksTohide)	;
            			node.style("opacity", function (d) {
                            return (nodeHandlesToShow.indexOf(d["handle"]) > -1) ? 1 : 0.3;
                                      });
                        var selected = node.filter(function (d, i) {
                            return d.type == 'ListLink';
                            });
                        selected.style("opacity", "0.3");
                        var selected = node.filter(function (d, i) {
                            return d.type == 'ListLink';
                            });
                        selected.style("opacity", "0.3");
                        edge.style("opacity", function (d) {
                            return (nodeHandlesToShow.indexOf(d["source"]["handle"]) > -1 && nodeHandlesToShow.indexOf(d["target"]["handle"]) > -1) ? 1 : 0.05;
            			 });

                                    }}

                    if(scope.tool == 'center'){
            			ring =1;
            			focusnode = sender.index;
            			console.log(sender);
            			brfs(graph);
            			radmonitor();
            						
                    	 }
  	           
		    if (scope.tool == 'getroot') {
                        ring =1;
                        focusnode = sender.index;
                        brfs(graph);
                        radmonitor();
            		    var nodeHandlesToShow = [sender["handle"]];
            		    var nodes = findchilds(sender, graph);
                        for(x=0; x < nodes.length; x++){
                            nodeHandlesToShow.push(nodes[x].handle);
                            }
                        nodeHandlesToShow = $.unique(nodeHandlesToShow);
                        console.log(nodeHandlesToShow);
          		node.style("opacity", function (d) {
                        return (nodeHandlesToShow.indexOf(d["handle"]) > -1) ? 1 : 0;
                        });
                        edge.style("opacity", function (d) {
                        return (nodeHandlesToShow.indexOf(d["source"]["handle"]) > -1 && nodeHandlesToShow.indexOf(d["target"]["handle"]) > -1) ? 1: 0;
            			});
            			
                                }
		    
                scope.$apply();
                });

                settingsChanged.text(scope.settings.text);
		
                force.start();
            }, true);
            scope.$watch('settings.size', settingsChanged.size, true);
            scope.$watch('settings.force', settingsChanged.force, true);
            scope.$watch('settings.text', settingsChanged.text, true);
	        scope.$watch('filt', atomfilter, true);
            scope.$watch('tool', toolChanged, true);
     }

        return {
            link: linkDirective,
            restrict: 'E',
            scope: {atoms: '=', settings: '=', selectedHandles: '=', tool: '=', filt: '='}
        };
    })
;
