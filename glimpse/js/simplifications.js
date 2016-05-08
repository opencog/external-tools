angular.module('glimpse').factory('simplifications', function () {


    var simplify = function (atoms, settings) {

        for (var i in atoms) {
            if (!atoms.hasOwnProperty(i)) continue;
            var atom = atoms[i];
            if (settings.logical && atom.incoming.length == 0) {
                if (atom.type == "InheritanceLink") {
                    atoms[atom.outgoing[0]].outgoing.push(atom.outgoing[1]);
                    atoms[atom.outgoing[0]].outgoing = $.unique(atoms[atom.outgoing[0]].outgoing);
                    atoms[atom.outgoing[0]].outgoing_labels.push("inherits from");
                    atoms[atom.outgoing[0]].outgoing_arrows.push(">");
                    delete atoms[i];
                } else if (atom.type == "ImplicationLink") {
                    atoms[atom.outgoing[0]].outgoing.push(atom.outgoing[1]);
                    atoms[atom.outgoing[0]].outgoing = $.unique(atoms[atom.outgoing[0]].outgoing);
                    atoms[atom.outgoing[0]].outgoing_labels = ["implies<" +
                    parseFloat(atom["truth_value"]["details"]["strength"]).toFixed(2) + ", " +
                    parseFloat(atom["truth_value"]["details"]["confidence"]).toFixed(2) + ">"];
                    atoms[atom.outgoing[0]].outgoing_arrows = [">"];
                    delete atoms[i];
                } else if (atom.type == "SimilarityLink") {
                    atoms[atom.outgoing[0]].outgoing.push(atom.outgoing[1]);
                    atoms[atom.outgoing[0]].outgoing = $.unique(atoms[atom.outgoing[0]].outgoing);
                    atoms[atom.outgoing[0]].outgoing_labels = ["is similar to"];
                    atoms[atom.outgoing[0]].outgoing_arrows = ["<>"];
                    delete atoms[i];
                } else if (atom.type == "EquivalenceLink") {
                    atoms[atom.outgoing[0]].outgoing.push(atom.outgoing[1]);
                    atoms[atom.outgoing[0]].outgoing = $.unique(atoms[atom.outgoing[0]].outgoing);
                    atoms[atom.outgoing[0]].outgoing_labels = ["is equivalent to"];
                    atoms[atom.outgoing[0]].outgoing_arrows = ["<>"];
                    delete atoms[i];
                }
            }
            if (settings.evaluation && atom.incoming.length == 0) {
                if (atom.type == "EvaluationLink" || atom.type == "ExecutionOutputLink") {
                    atoms[atom.outgoing[0]].outgoing.push.apply(atoms[atom.outgoing[0]].outgoing, atoms[atom.outgoing[1]].outgoing);
                    atoms[atom.outgoing[0]].outgoing = $.unique(atoms[atom.outgoing[0]].outgoing);
                    atoms[atom.outgoing[0]].outgoing_arrows = Array(10).fill(">");
                }
            }
        }

        for (i in atoms) {
            if (!atoms.hasOwnProperty(i)) continue;
            atom = atoms[i];
            if (settings.evaluation && atom.incoming.length == 0) {
                if (atom.type == "EvaluationLink" || atom.type == "ExecutionOutputLink") {
                    delete atoms[atom.outgoing[1]];
                    delete atoms[i];
                }
            }
        }

        return atoms;
    };

    return {
        simplify: simplify
    }
});