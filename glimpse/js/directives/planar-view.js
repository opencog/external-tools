angular.module('glimpse')
    .directive('planarView', function () {

        function linkDirective(scope, element, attributes) {

            // Create force layout and svg
            var graph = {nodes: [], links: []};
            var force = d3.layout.force()
                .nodes(graph.nodes)
                .links(graph.links)
                .charge(scope.settings.force.charge)
                .linkDistance(scope.settings.force.linkDistance)
                .gravity(scope.settings.force.gravity)
                .size([scope.settings.size.width, scope.settings.size.height])
                .on("tick", function () {
                    link.attr("x1", function (d) {
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
                    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
                }))
                .append("svg:g");

            var node = svg.selectAll(".node"),
                link = svg.selectAll(".link");

            // Update display whenever atoms change
            scope.$watch('atoms', function (atoms) {
                var newGraph = processAtoms(atoms);

                // Add and update nodes
                for (var i = 0; i < newGraph.nodes.length; i++) {
                    var nodeIndex = indexOfNode(graph.nodes, newGraph.nodes[i]);
                    if (nodeIndex == -1) {
                        graph.nodes.push(newGraph.nodes[i]);
                    }
                    else {
                        graph.nodes[nodeIndex].label = newGraph.nodes[i].label;
                        graph.nodes[nodeIndex].type = newGraph.nodes[i].type;
                    }
                }

                // Add and update links
                for (var i = 0; i < newGraph.links.length; i++) {
                    console.log(newGraph.links[i]);
                    var linkIndex = indexOfLink(graph.links, newGraph.links[i]);
                    if (linkIndex == -1) {
                        graph.links.push(newGraph.links[i]);
                    }
                    else {
                        graph.links[linkIndex].source = newGraph.links[i].source;
                        graph.links[linkIndex].target = newGraph.links[i].target;
                        graph.links[linkIndex].label = newGraph.links[i].label;
                        graph.links[linkIndex].type = newGraph.links[i].typr;
                    }
                }


                link = link.data(graph.links);
                link.enter().append("line").attr("class", "link");
                link.exit().remove();

                node = node.data(graph.nodes);
                node.enter().append("g").attr("class", "node");

                // Remove text and circle from previous drawing
                for (var i = 0; i < node["0"].length; i++) {
                    node["0"][i].innerHTML = "";
                }

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
                            if (scope.selectedIndices.indexOf(sender.index == -1))
                                scope.selectedIndices.push(sender.index);
                            else
                                scope.selectedIndices.splice(scope.selectedIndices.indexOf(sender.index), 1);
                        } else {
                            scope.selectedIndices = [sender.index];
                        }
                        node.attr("class", function (d) {
                            return scope.selectedIndices.indexOf(d.index) == -1 ? "node" : "node node_selected";
                        });
                    }

                    else if (scope.tool == 'anchor') {
                        sender.fixed = !d3.event.altKey;
                    }

                    scope.$apply();
                });


                node.exit().remove();
                force.start();
            }, true);


            scope.$watch('settings', function (settings) {
                d3.select(element[0]).select("svg").attr("width", settings.size.width).attr("height", settings.size.height);
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
            scope: {atoms: '=', settings: '=', selectedIndices: '=', tool: '='}
        };
    })
;

