/*
 Contains various helper functions
 */

angular.module('glimpse').factory('utils', function () {

    var isNode = function (atom) {
        return atom["type"].match("Node$");
    };

    var isLink = function (atom) {
        return atom["type"].match("Link$");
    };

    var indexOfNode = function (haystack, needle) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i].handle == needle.handle) return i;
        }
        return -1;
    };

    var indexOfLink = function (haystack, needle) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i].source && haystack[i].target)
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


    var indexAtoms = function (atoms) {
        var indexedAtoms = {};
        for (var atom_index = 0; atom_index < atoms.length; atom_index++) {
            var atom = atoms[atom_index];
            indexedAtoms[atom["handle"]] = {
                handle: atom["handle"],
                label: atom["name"] || atom["type"],
                type: atom["type"],
                outgoing: generateOutgoingArray(atom["outgoing"]),
                incoming: atom["incoming"].slice(),
                isNode: isNode(atom),
                truth_value: atom["truthvalue"]
            };
        }
        return indexedAtoms;
    };

    var atoms2Graph = function (atoms) {
        var graph = {nodes: [], edges: []};
	
	    for (var atom_index in atoms) {
            if (!atoms.hasOwnProperty(atom_index)) continue;
            //Add Nodes
            graph.nodes.push(atoms[atom_index]);

            // Add Edges
            for (var j = 0; j < atoms[atom_index]["outgoing"].length; j++) {
                graph.edges.push({
                    source: parseInt(atom_index),
                    target: atoms[atom_index]["outgoing"][j]["handle"],
                    label: atoms[atom_index]["outgoing"][j]["label"],
                    arrow: atoms[atom_index]["outgoing"][j]["arrow"]
                });
            }

            for (var outgoing_index in atoms[atom_index]["outgoing"]) {
                if (!atoms[atom_index]["outgoing"].hasOwnProperty(outgoing_index)) continue;
                graph.edges.push({
                    source: parseInt(atom_index),
                    target: atoms[atom_index]["outgoing"][outgoing_index]["handle"],
                    label: atoms[atom_index]["outgoing"][outgoing_index]["label"],
                    arrow: atoms[atom_index]["outgoing"][outgoing_index]["arrow"]
                })
            }

        } 
        return graph;
    };

    var generateOutgoingArray = function (outgoing) {
        var output = [];
        for (var i = 0; i < outgoing.length; i++) {
            output.push({
                handle: outgoing[i],
                label: "",
                arrow: ""
            });
        }
        return output;
    };

    var getAllNeighborHandles = function (atom) {
        var neighbors = [];
        for (var i = 0; i < atom["outgoing"].length; i++) {
            neighbors.push(atom["outgoing"][i]["handle"]);
        }
        for (i = 0; i < atom["incoming"].length; i++) {
            neighbors.push(atom["incoming"][i]);
        }
        return neighbors;
    };

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    return {
        isNode: isNode,
        isLink: isLink,
        indexOfNode: indexOfNode,
        indexOfLink: indexOfLink,
        getAtomByHandle: getAtomByHandle,
        indexAtoms: indexAtoms,
        atoms2Graph: atoms2Graph,
        getAllNeighborHandles: getAllNeighborHandles,
        getUrlParameter: getUrlParameter
    }
});
