angular.module('glimpse').factory('simplifications', function () {


    var logical = function (graph) {
        for (var i = 0; i < graph.nodes.length; i++) {
            if (graph.nodes[i].type == "InheritanceLink") {
                console.log(graph.nodes[i]);
            }
        }
        return graph;
    };

    var simplify = function (graph) {
        graph = logical(graph);
        return graph;
    };

    return {
        simplify: simplify
    }
});