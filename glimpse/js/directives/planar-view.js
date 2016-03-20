angular.module('glimpse')
    .directive('planarView', function () {

        function linkDirective(scope, element, attributes) {
            var force = d3.layout.force();

            var update = function (settings) {
                // Size
                d3.select(element[0]).select("svg").attr("width", settings.size.width).attr("height", settings.size.height);
                force.size([settings.size.width, settings.size.height]);

                // Force Params
                force.charge(settings.force.charge);
                force.linkDistance(settings.force.linkDistance);
                force.gravity(settings.force.gravity);
                //force.resume();
                force.start();
            };

            scope.$watch('settings', function (settings) {
                update(settings);
            }, true);

            scope.$watch('atoms', function (atoms) {
                element[0].innerHTML = "";
                // Get processed nodes and links
                var graph = processAtoms(atoms);

                var svg = d3.select(element[0])
                    .append("svg:svg")
                    .attr("width", scope.settings.size.width).attr("height", scope.settings.size.height)
                    .call(d3.behavior.zoom().on("zoom", function () {
                        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
                    }))
                    .append("svg:g");

                force.charge(scope.settings.force.charge)
                    .linkDistance(scope.settings.force.linkDistance)
                    .gravity(scope.settings.force.gravity)
                    .size([scope.settings.size.width, scope.settings.size.height]);


                force.nodes(graph.nodes).links(graph.links).start();
                update(scope.settings);

                var link = svg.selectAll(".link").data(graph.links).enter().append("line").attr("class", "link");
                var node = svg.selectAll(".node").data(graph.nodes).enter().append("g").attr("class", "node")
                    .call(force.drag().on("dragstart", function (d) {
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

                force.on("tick", function () {
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

            }, true);

        }

        return {
            link: linkDirective,
            restrict: 'E',
            scope: {atoms: '=', settings: '=', selectedIndices: '=', tool: '='}
        }
    });