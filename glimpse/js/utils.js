/*
 Contains various helper functions
 */

var isNode = function (atom) {
    return atom["type"].indexOf("Node") > -1;
};

var isLink = function (atom) {
    return atom["type"].indexOf("Link") > -1;
};


var indexOfNode = function (haystack, needle) {
    for (var i = 0; i < haystack.length; i++) {
        if (haystack[i].handle == needle.handle) return i;
    }
    return -1;
};

var indexOfLink = function (haystack, needle) {
    for (var i = 0; i < haystack.length; i++) {
        if (haystack[i].source.handle == needle.source.handle && haystack[i].target.handle == needle.target.handle) return i;
    }
    return -1;
}


var atoms2Graph = function (atoms, settings) {
    var graph = {nodes: [], edges: []};
    var rawEdges = [];
    for (var atom_index = 0; atom_index < atoms.length; atom_index++) {
        var atom = atoms[atom_index];
        graph.nodes.push({
            handle: atom["handle"],
            label: atom["name"] || atom["type"],
            type: atom["type"]
        });

        if (isLink(atom)) {
            for (var outgoing_index = 0; outgoing_index < atom["outgoing"].length; outgoing_index++) {
                rawEdges.push({
                    source: atom["handle"],
                    target: atom["outgoing"][outgoing_index],
                    label: atom["type"]
                });
            }
        }
    }

    rawEdges.forEach(function (e) {
        var sourceNode = graph.nodes.filter(function (n) {
                return n.handle === e.source;
            })[0],
            targetNode = graph.nodes.filter(function (n) {
                return n.handle === e.target;
            })[0];
        graph.edges.push({source: sourceNode, target: targetNode, label: e.label});
    });

    return graph;
};

