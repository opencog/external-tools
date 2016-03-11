/*
Contains various helper functions
*/


var isNode = function (atom) {
    return atom["type"].indexOf("Node") > -1;
};

var isLink = function (atom) {
    return atom["type"].indexOf("Link") > -1;
};


var processAtoms = function(atoms){
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

    return graph;
}