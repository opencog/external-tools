/*
 Contains various helper functions
 */

angular.module('glimpse').factory('utils', function () {

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
            if (haystack[i].source.handle == needle.source && haystack[i].target.handle == needle.target) return i;
        }
        return -1;
    };

    var getAtomByHandle = function (haystack, handle) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i].handle == handle) return haystack[i];
        }
        return null;
    };


    var atoms2Graph = function (atoms) {
        var graph = {nodes: [], edges: []};
        var links = [];
        for (var atom_index = 0; atom_index < atoms.length; atom_index++) {
            var atom = atoms[atom_index];

            graph.nodes.push({
                handle: atom["handle"],
                label: atom["name"] || atom["type"],
                type: atom["type"],
                incoming: atom["incoming"]
            });

            if (isLink(atom)) {
                links.push({
                    handle: atom["handle"],
                    label: atom["type"],
                    type: atom["type"],
                    incoming: atom["incoming"],
                    outgoing: atom["outgoing"]
                });
            }
        }


        links.forEach(function (link) {
            for (var i = 0; i < link["outgoing"].length; i++) {
                graph.edges.push({source: link["handle"], target: link["outgoing"][i], label: ""});
            }
        });

        return graph;
    };

    return {
        isNode: isNode,
        isLink: isLink,
        indexOfNode: indexOfNode,
        indexOfLink: indexOfLink,
        getAtomByHandle: getAtomByHandle,
        atoms2Graph: atoms2Graph
    }


});

