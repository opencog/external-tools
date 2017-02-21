angular.module('glimpse').factory('simplifications', function () {

    var simplify = function (atoms, settings) {   
        //replace incoming and outgoing arrays with labeled dict's
        for (var atom_index in atoms) {
            atom = atoms[atom_index];
            
            for (var handle in atom["outgoing"]) {
                atom["outgoing"][handle] = { handle: atom["outgoing"][handle], label: "", arrow: ""}
            }
            
            for (var handle in atom["incoming"]) {
                atom["incoming"][handle] = { handle: atom["incoming"][handle], label: "", arrow: ""}
            }
        }
           
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
                if (!atom["outgoing"][0]) continue;
                if (!atom["outgoing"][1]) continue;
              
                var firstOutgHandle = atom["outgoing"][0]["handle"];
                var secondOutgHandle = atom["outgoing"][1]["handle"];
                
                var firstOutgIndex = -1
                var secondOutgIndex = -1
                
                for (i in atoms) { if (atoms[i]["handle"] == firstOutgHandle) firstOutgIndex = i }
                for (i in atoms) { if (atoms[i]["handle"] == secondOutgHandle) secondOutgIndex = i }

                if (atoms[firstOutgIndex] == null) continue;
                
                if (atom.type == "InheritanceLink") {
                    addOutgoing(atoms[firstOutgIndex]["outgoing"], {
                        handle: secondOutgHandle,
                        label: "inherits from",
                        arrow: ">"
                    });
                    addIncoming(atoms[secondOutgIndex]["incoming"], {handle: firstOutgHandle});
                    atomsToDelete.push(parseInt(atom_index));
                } else if (atom.type == "ImplicationLink") {

                    addOutgoing(atoms[firstOutgIndex]["outgoing"], {
                        handle: secondOutgHandle,
                        label: "implies<" + parseFloat(atom["truth_value"]["details"]["strength"]).toFixed(2) + ", " +
                        parseFloat(atom["truth_value"]["details"]["confidence"]).toFixed(2) + ">",
                        arrow: ">"
                    });
                    addIncoming(atoms[secondOutgIndex]["incoming"], {handle: firstOutgHandle});
                    atomsToDelete.push(parseInt(atom_index));
                } else if (atom.type == "SimilarityLink") {
                    addOutgoing(firstOutgoing["outgoing"], {
                        handle: secondOutgHandle,
                        label: "is similar to",
                        arrow: ">"
                    });
                    addIncoming(atoms[secondOutgHandle]["incoming"], {handle: firstOutgHandle});
                    atomsToDelete.push(parseInt(atom_index));
                } else if (atom.type == "EquivalenceLink") {
                    addOutgoing(firstOutgoing["outgoing"], {
                        handle: secondOutgHandle,
                        label: "is equivalent to",
                        arrow: ">"
                    });
                    addIncoming(atoms[secondOutgIndex]["incoming"], {handle: firstOutgHandle});
                    atomsToDelete.push(parseInt(atom_index));
                }
            }
            if (settings.evaluation && atom["incoming"].length == 0) {
                if (atom.type == "EvaluationLink" || atom.type == "ExecutionOutputLink") {
                    var predicateNode = null
                    var listLink = null
                    
                    for (i in atoms) { if (atoms[i]["handle"] == atom.outgoing[0]["handle"]) predicateNode = atoms[i] }
                    for (i in atoms) { if (atoms[i]["handle"] == atom.outgoing[1]["handle"]) listLink = atoms[i] }
                    
                    if (predicateNode == null || listLink == null) continue;
                    
                    for (var j = 0; j < listLink["outgoing"].length; j++) {
                        addOutgoing(predicateNode["outgoing"], {
                            handle: listLink["outgoing"][j]["handle"],
                            label: "",
                            arrow: ">"
                        });
                        if( (a = atoms[listLink["outgoing"][j]["handle"]]) != null) 
                                 addIncoming(a["incoming"], {handle: predicateNode["handle"]});
                    }
                    atomsToDelete.push(parseInt(atom_index));
                    atomsToDelete.push(atoms.indexOf(listLink));
                }
            }
        }

        // Delete atoms removed during simplification
        atomsToDelete = atomsToDelete.filter(function(item,pos) { return atomsToDelete.indexOf(item)==pos })
        atomsToDelete = atomsToDelete.sort(function(a,b){ return a - b; });

        for (var i = atomsToDelete.length-1; i >= 0; i--) {
            atoms.splice(atomsToDelete[i],1);
        }

        return atoms;
    };

    return {
        simplify: simplify
    }
});
