/*
 Contains various helper functions
 */


var isNode = function (atom) {
    return atom["type"].indexOf("Node") > -1;
};

var isLink = function (atom) {
    return atom["type"].indexOf("Link") > -1;
};


var processAtoms = function (atoms) {
    var graph = {nodes: [], links: []};
    var raw_links = [];
    for (var atom_index = 0; atom_index < atoms.length; atom_index++) {
        var atom = atoms[atom_index];
        graph.nodes.push({
            handle: atom["handle"],
            label: atom["name"],
            type: atom["type"]
        });

        if (isLink(atom)) {
            for (var outgoing_index = 0; outgoing_index < atom["outgoing"].length; outgoing_index++) {
                raw_links.push({
                    source: atom["handle"],
                    target: atom["outgoing"][outgoing_index],
                    type: atom["type"],
                    label: atom["type"]
                });
            }
        }
    }

    raw_links.forEach(function (e) {
        var sourceNode = graph.nodes.filter(function (n) {
                return n.handle === e.source;
            })[0],
            targetNode = graph.nodes.filter(function (n) {
                return n.handle === e.target;
            })[0];
        graph.links.push({source: sourceNode, target: targetNode, label: e.label, type: e.type});
    });

    return graph;
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