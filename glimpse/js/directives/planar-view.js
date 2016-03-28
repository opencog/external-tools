angular.module('glimpse')
    .directive('planarView', function () {

        function linkDirective(scope, element, attributes) {

            // Create force layout and svg
            var force = d3.layout.force()
                .nodes([])
                .links([])
                .charge(scope.settings.force.charge)
                .linkDistance(scope.settings.force.linkDistance)
                .gravity(scope.settings.force.gravity)
                .size([scope.settings.size.width, scope.settings.size.height])
                .on("tick", function () {
                    edge.attr("x1", function (d) {
                        return d.source.x;
                    }).attr("y1", function (d) {
                        return d.source.y;
                    }).attr("x2", function (d) {
                        return d.target.x;
                    }).attr("y2", function (d) {
                        return d.target.y;
                    });
                    d3.selectAll("circle").attr("cx", function (d) {
                        return d.x;
                    }).attr("cy", function (d) {
                        return d.y;
                    });
                    d3.selectAll("text").attr("x", function (d) {
                        return d.x;
                    }).attr("y", function (d) {
                        return d.y;
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


            // Update display whenever atoms change
            scope.$watch('atoms', function (atoms) {
                var graph = atoms2Graph(atoms, scope.settings.simplifications);

                // Add new nodes and update existing ones
                for (var i = 0; i < graph.nodes.length; i++) {
                    var nodeIndex = indexOfNode(force.nodes(), graph.nodes[i]);
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
                    return indexOfNode(graph.nodes, n) > -1;
                }));


                // Add new links and update existing ones
                for (i = 0; i < graph.edges.length; i++) {
                    var linkIndex = indexOfLink(force.links(), graph.edges[i]);
                    if (linkIndex == -1) {
                        force.links().push(graph.edges[i]);
                    }
                    else {
                        force.links()[linkIndex].label = graph.edges[i].label;
                    }
                }
                // Remove links...
                force.links(force.links().filter(function (n) {
                    return indexOfLink(graph.edges, n) > -1;
                }));

                // Clear canvas
                svg_g.selectAll(".node").remove();
                svg_g.selectAll(".edge").remove();

                // Draw Edges
                edge = svg_g.selectAll(".edge");
                edge = edge.data(force.links());
                edge.enter().append("line").attr("class", "edge")
                    .style("marker-end", "url(#end)");
                edge.exit().remove();

                //Draw Nodes
                node = svg_g.selectAll(".node");
                node = node.data(force.nodes());
                node.enter().append("g").attr("class", "node");
                node.call(force.drag().on("dragstart", function (d) {
                    d3.event.sourceEvent.stopPropagation();
                }));
                node.append("circle").attr("r", function (d) {
                    return isLink(d) ? 4 : 12;
                });
                node.append("text").attr("dx", 10).attr("dy", ".35em").text(function (d) {
                    return isLink(d) ? d.type : d.label;
                });
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

                force.start();
            }, true);


            scope.$watch('settings', function (settings) {
                svg.attr("width", settings.size.width).attr("height", settings.size.height);
                force.size([settings.size.width, settings.size.height]);

                // Force Params
                force.charge(settings.force.charge);
                force.linkDistance(settings.force.linkDistance);
                force.gravity(settings.force.gravity);
                force.start();
            }, true);
        }

        return {
            link: linkDirective,
            restrict: 'E',
            scope: {atoms: '=', settings: '=', selectedHandles: '=', tool: '='}
        };
    })
;

