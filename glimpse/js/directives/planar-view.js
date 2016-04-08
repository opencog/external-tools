angular.module('glimpse')
    .directive('planarView', function (utils, simplifications) {

        function linkDirective(scope, element, attributes) {

            // Create force layout and svg
            var force = d3.layout.force()
                .nodes([])
                .links([])
                .size([scope.settings.size.width, scope.settings.size.height])
                .on("tick", function () {

                    edge.selectAll("path").attr("d", function (d) {
                        var dr = 400;
                        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                    });

                    node.attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });
                });

            var svg = d3.select(element[0])
                .append("svg:svg")
                .attr("width", scope.settings.size.width).attr("height", scope.settings.size.height)
                .call(d3.behavior.zoom().on("zoom", function () {
                    svg_g.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
                }));

            var svg_g = svg.append("svg:g");

            var node = svg_g.selectAll(".node"),
                edge = svg_g.selectAll(".edge");

            // Add Arrow definition
            svg.append("defs").selectAll("marker")
                .data(["end"])
                .enter().append("marker")
                .attr("id", function (d) {
                    return d;
                })
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 30)
                .attr("refY", 0)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M0,-5L10,0L0,5")
                .style("fill", "#424242")
                .style("stroke", "#424242")
                .style("stroke-opacity", "0.8");


            var settingsChanged = {};

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
                    .linkDistance(forceParams.linkDistance)
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


            // Update display whenever atoms change
            scope.$watch('atoms', function (atoms) {
                var graph = simplifications.simplify(utils.atoms2Graph(atoms), scope.settings.simplifications);


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
                            label: utils.getAtomByHandle(force.nodes(), graph.edges[i]["label"])
                        });
                    }
                    else {
                        force.links()[linkIndex].label = graph.edges[i].label;
                    }
                }

                // Remove links...
                force.links(force.links().filter(function (n) {
                    for (var i = 0; i < graph.edges.length; i++) {
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
                //edge.enter().append("line").attr("class", "edge")
                //    .style("marker-end", "url(#end)");
                //edge.exit().remove();

                edge.enter()
                    .append("g")
                    .attr("class", "edge");
                //.append("line");


                edge.append("path")
                    .attr("id", function (d, i) {
                        return "edge_" + i;
                    }).style("marker-end", "url(#end)");

                edge.append("text").attr("dy", "-4")
                    .append("textPath").attr('xlink:href', function (d, i) {
                        return "#edge_" + i;
                    })
                    .attr("startOffset", "50%")
                    .text("inherits from");


                //Draw Nodes
                node = svg_g.selectAll(".node");
                node = node.data(force.nodes());
                node.enter().append("g").attr("class", "node");
                node.call(force.drag().on("dragstart", function (d) {
                    d3.event.sourceEvent.stopPropagation();
                }));
                node.append("circle").attr("r", function (d) {
                    return utils.isLink(d) ? 4 : 12;
                });
                node.append("text").attr("dx", 10).attr("dy", ".35em");
                node.on("click", function (sender) {
                    if (scope.tool == 'select') {
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
                    else if (scope.tool == 'anchor') {
                        sender.fixed = !d3.event.altKey;
                    }
                    scope.$apply();
                });

                settingsChanged.text(scope.settings.text);

                force.start();
            }, true);


            scope.$watch('settings.size', settingsChanged.size, true);
            scope.$watch('settings.force', settingsChanged.force, true);
            scope.$watch('settings.text', settingsChanged.text, true);

        }

        return {
            link: linkDirective,
            restrict: 'E',
            scope: {atoms: '=', settings: '=', selectedHandles: '=', tool: '='}
        };
    })
;

