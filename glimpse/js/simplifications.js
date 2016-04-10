angular.module('glimpse').factory('simplifications', function () {


    var logical = function (atoms) {
        for (var i in atoms) {
            if (!atoms.hasOwnProperty(i)) continue;
            var atom = atoms[i];
            if (atom.type == "InheritanceLink") {
                atoms[atom.outgoing[0]].outgoing = [atom.outgoing[1]];
                atoms[atom.outgoing[0]].outgoing_labels = ["inherits from"];
                atoms[atom.outgoing[0]].outgoing_arrows = [">"];
                delete atoms[i];
            } else if (atom.type == "ImplicationLink") {
                console.log(atom["truth_value"]["details"]);
                atoms[atom.outgoing[0]].outgoing = [atom.outgoing[1]];
                atoms[atom.outgoing[0]].outgoing_labels = ["implies<" +
                atom["truth_value"]["details"]["strength"] + ", " +
                atom["truth_value"]["details"]["confidence"] + ">"];
                atoms[atom.outgoing[0]].outgoing_arrows = [">"];
                delete atoms[i];
            } else if (atom.type == "SimilarityLink") {
                atoms[atom.outgoing[0]].outgoing = [atom.outgoing[1]];
                atoms[atom.outgoing[0]].outgoing_labels = ["is similar to"];
                atoms[atom.outgoing[0]].outgoing_arrows = ["<>"];
                delete atoms[i];
            } else if (atom.type == "EquivalenceLink") {
                atoms[atom.outgoing[0]].outgoing = [atom.outgoing[1]];
                atoms[atom.outgoing[0]].outgoing_labels = ["is equivalent to"];
                atoms[atom.outgoing[0]].outgoing_arrows = ["<>"];
                delete atoms[i];
            }
        }
        return atoms;
    };

    var simplify = function (atoms, settings) {
        if (settings.logical)
            atoms = logical(atoms);
        return atoms;
    };

    return {
        simplify: simplify
    }
});