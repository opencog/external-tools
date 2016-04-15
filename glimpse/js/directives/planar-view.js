angular.module('glimpse')
    .directive('planarView', function (utils, simplifications) {

        function linkDirective(scope, element, attributes) {

            var settingsChanged = {},
                force, svg, svg_g, node, edge;

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
                            return forceParams.linkDistance * 2.4;
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


            // Update display whenever atoms change
            scope.$watch('atoms', function (atoms) {
                atoms = utils.indexAtoms(atoms);

                atoms = simplifications.simplify(atoms, scope.settings.simplifications);
                var graph = utils.atoms2Graph(atoms);

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

                node.append("text").attr("dx", 16).attr("dy", ".35em");
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

