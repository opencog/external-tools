angular.module('glimpse').factory('simplifications', function () {


    var simplify = function (atoms, settings) {

        //Vars
        var atomsToDelete = [];

        //Msc Functions
        var addOutgoing = function (stack, item) {
            var existsFlag = false;
            for (var i = 0; i < stack.length; i++) {
                if (stack[i]["handle"] == item["handle"]) {
                    existsFlag = true;
                    break;
                }
            }
            if (!existsFlag) stack.push(item);
        };

        var addIncoming = function (stack, item) {
            if (stack.indexOf(stack, item) == -1) stack.push(item);
        };


        //Compress Links
        for (var atom_index in atoms) {
            if (!atoms.hasOwnProperty(atom_index)) continue;
            var atom = atoms[atom_index];
            if (settings.logical && atom["incoming"].length == 0) {
                if (atom.type == "InheritanceLink") {
                    addOutgoing(atoms[atom["outgoing"][0]["handle"]]["outgoing"], {
                        handle: atom["outgoing"][1]["handle"],
                        label: "inherits from",
                        arrow: ">"
                    });
                    addIncoming(atoms[atom["outgoing"][1]["handle"]]["incoming"], atom["outgoing"][0]["handle"]);
                    atomsToDelete.push(atom_index);
                } else if (atom.type == "ImplicationLink") {

                    addOutgoing(atoms[atom["outgoing"][0]["handle"]]["outgoing"], {
                        handle: atom["outgoing"][1]["handle"],
                        label: "implies<" + parseFloat(atom["truth_value"]["details"]["strength"]).toFixed(2) + ", " +
                        parseFloat(atom["truth_value"]["details"]["confidence"]).toFixed(2) + ">",
                        arrow: ">"
                    });
                    addIncoming(atoms[atom["outgoing"][1]["handle"]]["incoming"], atom["outgoing"][0]["handle"]);
                    atomsToDelete.push(atom_index);
                } else if (atom.type == "SimilarityLink") {
                    addOutgoing(atoms[atom["outgoing"][0]["handle"]]["outgoing"], {
                        handle: atom["outgoing"][1]["handle"],
                        label: "is similar to",
                        arrow: ">"
                    });
                    addIncoming(atoms[atom["outgoing"][1]["handle"]]["incoming"], atom["outgoing"][0]["handle"]);
                    atomsToDelete.push(atom_index);
                } else if (atom.type == "EquivalenceLink") {
                    addOutgoing(atoms[atom["outgoing"][0]["handle"]]["outgoing"], {
                        handle: atom["outgoing"][1]["handle"],
                        label: "is equivalent to",
                        arrow: ">"
                    });
                    addIncoming(atoms[atom["outgoing"][1]["handle"]]["incoming"], atom["outgoing"][0]["handle"]);
                    atomsToDelete.push(atom_index);
                }
            }
            if (settings.evaluation && atom["incoming"].length == 0) {
                if (atom.type == "EvaluationLink" || atom.type == "ExecutionOutputLink") {
                    var predicateNode = atoms[atom.outgoing[0]["handle"]];
                    var listLink = atoms[atom.outgoing[1]["handle"]];

                    for (var j = 0; j < listLink["outgoing"].length; j++) {
                        addOutgoing(predicateNode["outgoing"], {
                            handle: listLink["outgoing"][j]["handle"],
                            label: "",
                            arrow: ">"
                        });
                        addIncoming(atoms[listLink["outgoing"][j]["handle"]]["incoming"], predicateNode["handle"]);
                    }
                    atomsToDelete.push(atom_index);
                    atomsToDelete.push(listLink["handle"]);
                }
            }
        }

        // Delete atoms removed during simplification
        for (var i = 0; i < atomsToDelete.length; i++) {
            delete atoms[atomsToDelete[i]];
        }


        return atoms;
    };

    return {
        simplify: simplify
    }
});