angular.module('glimpse').controller("planarCtrl", function ($scope, userSettings) {

    var force;



    var updateView = function () {

        // Check if atoms have been populated
        if (!$scope.atoms.hasOwnProperty("atoms")) return;

        // Get atoms
        var atoms = $scope.atoms.atoms;
        var graph = {nodes: [], raw_links: [], links: []};
        for (var atom_index = 0; atom_index < atoms.length; atom_index++) {
            var atom = atoms[atom_index];
            graph.nodes.push({
                id: atom["handle"],
                label: atom["name"],
                type: atom["type"]
            });

            if (isLink(atom)) {
                for (var outgoing_index = 0; outgoing_index < atom["outgoing"].length; outgoing_index++) {
                    graph.raw_links.push({
                        source: atom["handle"],
                        target: atom["outgoing"][outgoing_index]
                    });
                }
            }
        }

        graph.raw_links.forEach(function (e) {
            var sourceNode = graph.nodes.filter(function (n) {
                    return n.id === e.source;
                })[0],
                targetNode = graph.nodes.filter(function (n) {
                    return n.id === e.target;
                })[0];
            graph.links.push({source: sourceNode, target: targetNode, label: e.label});
        });


        // Draw graph
        var bounding_rect = document.getElementById("planar_view").getBoundingClientRect();
        var width = bounding_rect.width, height = bounding_rect.height;
        document.getElementById("planar_view").innerHTML = "";
        var svg = d3.select("#planar_view")
            .append("svg:svg")
            .attr("width", width)
            .attr("height", height)
            .call(d3.behavior.zoom().on("zoom", function () {
                svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
            }))
            .append("svg:g");

        force = d3.layout.force()
            .charge(userSettings.planarView.charge)
            .linkDistance(userSettings.planarView.linkDistance)
            .gravity(userSettings.planarView.gravity)
            .size([width, height]);

        var drag = force.drag()
            .on("dragstart", function (d) {
                d3.event.sourceEvent.stopPropagation();
            });

        force.nodes(graph.nodes)
            .links(graph.links)
            .start();

        var connector = svg
            .selectAll(".link")
            .data(graph.links)
            .enter()
            .append("line")
            .attr("class", "connector");

        var node = svg
            .selectAll(".node")
            .data(graph.nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(drag);
        node.append("circle")
            .attr("r", function (d) {
                if (isLink(d)) return 4;
                return 12
            });
        node.append("text")
            .attr("dx", 10)
            .attr("dy", ".35em")
            .text(function (d) {
                if (isLink(d)) {
                    return d.type;
                }
                return d.label
            });

        force.on("tick", function () {
            connector.attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            d3.selectAll("circle").attr("cx", function (d) {
                return d.x;
            })
                .attr("cy", function (d) {
                    return d.y;
                });

            d3.selectAll("text").attr("x", function (d) {
                return d.x;
            })
                .attr("y", function (d) {
                    return d.y;
                });
        });

        function resize() {
            width = window.innerWidth, height = window.innerHeight;
            svg.attr("width", width).attr("height", height);
            force.size([width, height]).resume();
        }

        d3.select(window).on("resize", resize);

    };

    $scope.$on("atomsChanged", function () {
        updateView();
    });

    $scope.$on("settingsChanged", function () {
        force.charge(userSettings.planarView.charge);
        force.gravity(userSettings.planarView.gravity);
        force.linkDistance(userSettings.planarView.linkDistance);
    });

    updateView();

})