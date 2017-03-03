/* TODO:
  There are two seperate layout algorithms here,
  refactor this such that we can dynamically add more algorithms and choose
  via dropdown.
*/

angular.module('glimpse')
    .directive('planarView', function (utils, simplifications, AtomsFactory, $timeout) {

        function linkDirective(scope, element, attributes) {

            var settingsChanged = {}, force, svg, svg_g, node, edge;

            var D2R = Math.PI / 180, radius=100, focusnode = 0, startAngle= 0, ring =0, outerCircle;    
            //Width and height
            var w = 960 ;
            var h = 500 ;
            var filteredNodeHandles = [];
            var filterStatus = 0;
            var roothandles = [];
            // Create force layout and svg
            force = d3.layout.force()
                .nodes([])
                .links([])
                .size([scope.settings.size.width, scope.settings.size.height]);
                
                var tick1 = function () {

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
                };
                force.on("tick", tick1);

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
                filterStatus = 0;
                d3.selectAll(".node, .edge").transition()
                  .style("opacity", 1);
            }
            else if(scope.filt[0]+scope.filt[1]+scope.filt[2]+scope.filt[3]== 'hide')
            {
                filterStatus = 1;

                filter = filter.substr(4);
                //console.log(filter)   ;
                var selected = node.filter(function (d, i) {
                      return d.type == filter;
                   });
                
                selected.style("opacity", "0");
                var selectededg = scope.atoms.filter(function (d, i) {
                    if (d.type != filter) {return d["handle"]};
                    });
                var edgestoshow = [];
                for(var x=0; x < selectededg.length; x++) { edgestoshow.push(selectededg[x].handle); }
                //console.log(edgestoshow);
                edge.style("opacity", function (d) {
                    return (edgestoshow.indexOf(d["source"]["handle"]) > -1 && edgestoshow.indexOf(d["target"]["handle"]) > -1) ? 1 : 0;
                    });
            
            } else {

                filterStatus = 1;

                //console.log(edge);
                var selected = node.filter(function (d, i) {
                          return d.type != filter;
                    });

                selected.style("opacity", "0");
                var selectededg = scope.atoms.filter(function (d, i) {
                     if (d.type == filter) {return d["handle"]};
                    });
                var edgestoshow = [];
                for(var x=0; x < selectededg.length; x++) { edgestoshow.push(selectededg[x].handle); }
                //console.log(edgestoshow);
                edge.style("opacity", function (d) {
                            return (edgestoshow.indexOf(d["source"]["handle"]) > -1 && edgestoshow.indexOf(d["target"]["handle"]) > -1) ? 1 : 0;
                                });
                   }
            };
            
            // Monitor tool changed
            var toolChanged = function (newTool) {
                    
                if (newTool != 'focus'  ) {
                    node.style("opacity", "1");
                    edge.style("opacity", "1");
                }

                if (newTool == 'select'  ) {
                    force.on("tick", tick1);
                    force.start();
                }

                if (newTool == 'tree') {

                   if(roothandles.length == 0){
                     window.alert("Not a tree data");
                   } else {
                    node.style("opacity", function (d) {
                        return (roothandles.indexOf(d["handle"]) > -1) ? 1 : 0;
                    });

                    edge.style("opacity", function (d) {
                        return (roothandles.indexOf(d["source"]["handle"]) > -1 && roothandles.indexOf(d["target"]["handle"]) > -1) ? 1: 0; 
                    });
                   }
                }

            };

            // Link updateView to our AtomsFactory to dynamically update.
            AtomsFactory.modificationCB = updateView
    
            function updateView() {
          
                // Get Atoms from Factory
                force.nodes(Object.values(AtomsFactory.nodes))
                force.links(AtomsFactory.links)
                
                // Graph object for radial layout
                var graph = {nodes: AtomsFactory.nodes, links: AtomsFactory.links}

                console.log(force.links().length)
    
                // Clear canvas
                //TODO: this needed?
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
    
                // get nodes with no incoming node
                function getRoot(nodes){
                    var rootNodes=[];
                    for (var a=0;a<nodes.length;a++)
                    {
                        if (nodes[a].incoming.length==0)
                        {
                            rootNodes.push(nodes[a]);
                        }
    
                    }
                    return rootNodes;
                }
    
                var root = getRoot(AtomsFactory.nodes);
                for(a=0; a < root.length; a++)
                {
                    roothandles.push(root[a].handle);       
                }
    
                // Locate nodes in a radial layout
                function brfs(grph){
                        traversedNodes=[];
                        traversedNodes.push(grph.nodes[focusnode]);
                        var marked={};
                        while (traversedNodes.length != 0) {
                            var v = traversedNodes.shift();
                            //console.log(v);
                            if(v == grph.nodes[focusnode])
                            { 
                                v.x= w/2; v.y= h/2; v.fixed = true; v.px= w/2; v.py= h/2;
                                marked[v.index]=true;
                                var neghbours= [];
                                //console.log(grph);
                                var adjList = [];
                                adjList=findchilds(v, grph);
                                //console.log("childs" + adjList);
                                for (var a=0;a< adjList.length;a++) {
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
                                //console.log("Traversed nodes" + traversedNodes);
                            } else if(v.length > 0) {
                                rad= radius * ring;
                                //console.log(v);
                                //console.log(radius);
                                var neghbours= [];
                    
                        for(var j=0; j< v.length; j++) {
                            if (marked[v[j].label]=== false) {marked[v[j].label]=true;}
                            adjList=findchilds(v[j], grph );
                            for (var a=0; a< adjList.length; a++) {
                                u=adjList[a];
                                if(marked[u.index]!=true){
                                    marked[u.index]=true;
                                    neghbours.push(u);
                                }
                            }
                        }
                        for (var loc= 0; loc < neghbours.length; loc++) {   
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
                    //console.log(ring);
                    }
                }
    
                function findchilds(node, grph){
                    //console.log(grph)
                    var outnode=[];
                    for(x=0; x< node.outgoing.length; x++) {
                        outnode.push(node.outgoing[x].handle);
                    }
                    
                    var innode=[]
                    for(x=0; x< node.incoming.length; x++) {
                        innode.push(node.incoming[x].handle);
                    }

                    var nodehandles = innode.concat(outnode);
                    var n = [];
            
                    for(x=0; x < nodehandles.length; x++) {
                        if (grph.nodes[nodehandles[x]]) {
                            n.push(grph.nodes[nodehandles[x]])
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
                        outerCircle = svg_g.append("circle").attr({
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
                                var c = dfs(graph.nodes[g], graph);
                                    for(a=0; a < c.length; a++)
                                        {
                                        c[a].fixed = false;                                    
                                        }                                 
                        }
                            }
                                }
                                }
            
                        if (scope.tool == 'select' || scope.tool == 'focus' || scope.tool == 'center' || scope.tool == 'getroot' || scope.tool == 'tree' ) {
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
                            focusnode = sender.handle
                            brfs(graph);
                            radmonitor();
                            var linksTohide = [];
                            var nodeHandlesToShow = [sender["handle"]];
                            
                                for (var depth = 0; depth < 2; depth++) {
                                    var newHandlesToShow = [];
                                    for (var i = 0; i < nodeHandlesToShow.length; i++) {
                                    if (AtomsFactory.atoms.hasOwnProperty(nodeHandlesToShow[i]))
                                newHandlesToShow = newHandlesToShow.concat(utils.getAllNeighborHandles(AtomsFactory.atoms[nodeHandlesToShow[i]]));
                                }
                                for(a=0; a < newHandlesToShow.length; a++){
                                for(b=0; b < graph.nodes.length; b++)
                                  {
                                    if(newHandlesToShow[a] == graph.nodes[b].handle)
                                        { if(graph.nodes[b].type == 'ListLink' || graph.nodes[b].type == 'SetLink') 
                                         {
                                            linksTohide = linksTohide.concat(graph.nodes[b].handle);
                                        newHandlesToShow = newHandlesToShow.concat(utils.getAllNeighborHandles(AtomsFactory.atoms[newHandlesToShow[a]]));
                                             }
                                        }   
                                  }
                                    }
                            nodeHandlesToShow = nodeHandlesToShow.concat(newHandlesToShow);
                                            nodeHandlesToShow = $.unique(nodeHandlesToShow);
                            //console.log(nodeHandlesToShow + "hide this" +linksTohide) ;
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
                                }
                                      }
    
                        if(scope.tool == 'center'){
                            ring =1;
                            focusnode = sender.handle
                            //console.log(sender);
                            brfs(graph);
                            radmonitor();
                            force.on("tick", tick1);
                            force.start();
                        }
                        
                          function tick(e) 
                          {                   
                            var k = 15* e.alpha;
                             // Push sources up and targets down to form a weak tree.
                                edge.selectAll("path.line").attr("d", function (d) {
                                 return "M" + d.source.x + " " + d.source.y + "L " + d.target.x + " " + d.target.y;
                              });
                             edge
                                 .each(function(d) { d.source.y -= k, d.target.y+=k; })
                                 .attr("x1", function(d) { return d.source.x; })
                                 .attr("y1", function(d) { return d.source.y; })
                                 .attr("x2", function(d) { return d.target.x; })
                                 .attr("y2", function(d) { return d.target.y; });
                             node
                                 .attr("cx", function(d) { return d.x; })
                                 .attr("cy", function(d) { return d.y; });
                                            
                             node.attr("transform", function (d) {
                                 return "translate(" + d.x + "," + d.y + ")";
                             });
                           
                         }
    
                        if(scope.tool == 'tree')
                        {
                            if(roothandles != 0)
                            {
                            
                          var nodestoexpand = dfs(sender, graph);
                          for(var j in nodestoexpand)
                            {
                                nodestoexpand[j].fixed = false;
                            } 
                          //console.log(nodestoexpand);
                          var expand = [];
                          for(i=0; i < nodestoexpand.length; i++)
                          {
                              expand=expand.concat(nodestoexpand[i].handle);        
                          }
                          //console.log(expand.length);
                               node.style("opacity", function (d) {
                              return (expand.indexOf(d["handle"]) > -1 ) ? 1 : 0;
                                 });
                                edge.style("opacity", function (d) {
                                 return (expand.indexOf(d["source"]["handle"]) > -1 && expand.indexOf(d["target"]["handle"]) > -1) ? 1: 0;                        
                                  });
                 
                             var selected = node.filter(function (d, i) {
                                             
                                 return roothandles.indexOf(d["handle"]) > -1;
                                 });
                             selected.style("opacity", "1");    
    
                          force.on("tick",tick);
                          force.start();
    
                          }
                    }
                
                    if (scope.tool == 'getroot') {
                            ring =1;
                            focusnode = sender.handle
                            brfs(graph);
                            radmonitor();
                            var nodeHandlesToShow = [ sender["handle"] ];
                            var n = findchilds(sender, graph);
                            for(var i in n)
                            {
                                if(n[i].isNode == null)
                                {
                                    var ns = [];
                                    var c = findchilds(n[i], graph);
                                    for( var j in c)
                                    {                                   
                                        if(c[j].isNode != null)
                                        {
                                            ns.push(c[j].handle);
                                        }
                                        else
                                        {
                                            var a = findchilds(c[j], graph);
                                            for(var b in a)
                                            {
                                                    if(c[j].isNode != null)
                                                    {
                                                        ns.push(c[j].handle);
                                                    }
                                                    
                                            }
                                        }
                                    }
                                        if(ns.length != 0)
                                        {
                                            nodeHandlesToShow.push(n[i].handle);
                                        nodeHandlesToShow = nodeHandlesToShow.concat(ns);
                                        }
                                }
                                else
                                {
                                    nodeHandlesToShow.push(n[i].handle);
                                }
                            }
                            nodeHandlesToShow = $.unique(nodeHandlesToShow);
                            //console.log(nodeHandlesToShow);
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
                }
    
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
});
