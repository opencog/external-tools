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
                incoming: atom["incoming"].slice(),
                outgoing: atom["outgoing"].slice(),
                outgoing_labels: [],
                outgoing_arrows: [],
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
            graph.nodes.push(atoms[atom_index]);
            for (var j = 0; j < atoms[atom_index]["outgoing"].length; j++) {
                graph.edges.push({
                    source: parseInt(atom_index),
                    target: atoms[atom_index]["outgoing"][j],
                    label: atoms[atom_index]["outgoing_labels"][j],
                    arrow: atoms[atom_index]["outgoing_arrows"][j]
                });
            }
        }
        return graph;
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
        getUrlParameter: getUrlParameter
    }
});

