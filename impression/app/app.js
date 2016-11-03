'use strict';

// Declare app level module which depends on views, and components
angular.module('impression', [
  'ngRoute',
  'ngAnimate',
  'ngResource',
  'impression.connectView',
  'impression.atomspaceView',
  'impression.openpsiView'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}])

.controller('MainCtrl', function($scope, $routeParams, $http, $location, AtomsFactory) {

    $scope.handleKeypress = function(keyEvent) {
      if ([].slice.call(document.getElementsByClassName("input")).includes(document.activeElement)) return;
      if (!AtomsFactory.connected && keyEvent.which-48 > 1) return;

      switch(keyEvent.which-48) {
          case 1:
              $location.path("/");
          break;

          case 2:
              $location.path("/atomspace");
          break;

          case 3: 
              $location.path("/openpsi");
          break;
      }
    }

})

.factory('AtomsFactory', function ($http, $resource, $interval, $location) {

    var atomsFactory = {};

    // Data members
    atomsFactory.atoms = [];
    atomsFactory.atomsCount = 0;
    atomsFactory.server = "";
    atomsFactory.nodeTypes = [];
    atomsFactory.types = [];

    atomsFactory.attention = {};

    atomsFactory.atomsTimer = null;
    atomsFactory.attentionTimer = null;
    atomsFactory.atomsPeriod = 0;
    atomsFactory.attentionPeriod = 0;

    atomsFactory.connected = false;

   // Member functions
    atomsFactory.updateAtoms = function (successCB, failureCB) {
       $http({
            method: 'GET',
            url: atomsFactory.server + "api/v1.1/atoms",
            cache: false
        }).then(
            function (response) {
                atomsFactory.atoms = response.data.result.atoms;
                atomsFactory.atomsCount = response.data.result.total;
                console.log("[AF] updated atoms...")
                if (typeof successCB === "function") successCB();
            },
            function (error) {
                if (typeof failureCB === "function") failureCB();
            }
        );
    };

    atomsFactory.updateAttention = function (successCB, failureCB) {
       $http({
            method: 'GET',
            url: atomsFactory.server + "api/v1.1/scheme", //TODO: this is a placeholder and will just work for test data, should fetch POST w. correct scm command.
            cache: false
        }).then(
            function (response) {
                atomsFactory.attention = response.data;
                console.log("[AF] updated attention...")
                if (typeof successCB === "function") successCB();
            },
            function (error) {
                if (typeof failureCB === "function") failureCB();
            }
        );
    };

    atomsFactory.startPeriodicUpdate = function(atomsPeriod, attentionPeriod) {
      atomsFactory.atomsPeriod = atomsPeriod;
      atomsFactory.attentionPeriod = attentionPeriod;
      
      atomsFactory.connected = true;

      atomsFactory.interval = $interval(function() {
        atomsFactory.updateAtoms(null, function() {atomsFactory.connectionFailed()});
      }, atomsPeriod);

      
      atomsFactory.interval = $interval(function() {
        atomsFactory.updateAttention(null, function() {atomsFactory.connectionFailed()});
      }, attentionPeriod);
    };

    atomsFactory.connectionFailed = function() {
        atomsFactory.stopPeriodicUpdate();
        $location.path("/");
    };

    atomsFactory.stopPeriodicUpdate = function() {
      atomsFactory.connected = false;

      $interval.cancel(atomsFactory.atomsTimer);
      $interval.cancel(atomsFactory.attentionTimer);
    };

    atomsFactory.setServer = function (s) {
        atomsFactory.server = s; 
    };

    atomsFactory.createAtom = function (atom, callback) {
        $http({
            method: 'POST',
            url: atomsFactory.server + 'api/v1.1/atoms',
            data: atom
        }).then(function (response) {
            if (typeof callback === "function") callback();
        });
    };

    atomsFactory.deleteAtom = function (handle, callback) {
        $http({
            method: 'DELETE',
            url: atomsFactory.server + 'api/v1.1/atoms/12'
        }).then(function (response) {
            //if (typeof callback === "function") callback();
        });
    };

    atomsFactory.updateAtomTypes = function (successCB, failureCB) {
        $http({
            method: 'GET',
            url: atomsFactory.server + 'api/v1.1/types'
        }).then(function (response) {
            atomsFactory.types = response.data.types;
            atomsFactory.nodeTypes = response.data.types.filter(function (atom) {
                return atom.indexOf("Node") > -1;
            });
            
            if (typeof successCB === "function") successCB();

           },
            function (error) {
                if (typeof failureCB === "function") failureCB();
            }
           );
    };
    
    atomsFactory.sampleAtomsInAF = function (successCB, failureCB) {
      var sampleSize = 100;
      var randIndex = function(sampleSize, sampleSpaceSize){ 
        var arr = []
        while(arr.length < sampleSize){
          var randomnumber=Math.ceil(Math.random()* sampleSpaceSize)
          var found=false;
          for(var i=0;i<arr.length;i++){
            if(arr[i]==randomnumber){found=true;break;}
          }
          if(!found)arr[arr.length]=randomnumber;
        }
        return arr;
      }
      $http({
        method: 'GET',
        url: atomsFactory.server + 'api/v1.1/atoms?filterby=attentionalfocus&includeOutgoing=true&includeIncoming=true'
      }).then(
        function (response){
          var responseAtoms = response.data.result.atoms;
          console.log("ResponseAtomSize: "+responseAtoms.length);
          /*if (responseAtoms.length > sampleSize){
            var randomAtoms = []
            for(i in randIndex(sampleSize,responseAtoms.length)){
              var atom = responseAtoms[randIndex[i]];
              randomAtoms.push(atom);
            }
            console.log("RandAtomSize: "+randomAtoms.length);
            atomsFactory.atoms = randomAtoms;
          }
          else{*/

            console.log("ResponseAtomSize: "+responseAtoms.length);
            atomsFactory.atoms = responseAtoms;
          //}

          atomsFactory.atomsCount = atomsFactory.atoms.length;
          if (typeof successCB === "function") successCB();
        },
        function (error) {
          if (typeof failureCB === "function") failureCB();
        }
      );
    };

    return atomsFactory;
})

.factory('utils', function () {

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
                data: {name: atom["name"].split("@")[0] || atom["type"]},
                type: atom["type"],
                outgoing: generateOutgoingArray(atom["outgoing"]),
                incoming: atom["incoming"].slice(),
                isNode: isNode(atom),
                truth_value: atom["truthvalue"],
                attention_value: atom["attentionvalue"]
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
                    source: atoms[atom_index],
                    target: atoms[atoms[atom_index]["outgoing"][j]["handle"]],
                    label: atoms[atom_index]["outgoing"][j]["label"],
                    arrow: atoms[atom_index]["outgoing"][j]["arrow"]
                });
            }

            for (var outgoing_index in atoms[atom_index]["outgoing"]) {
                if (!atoms[atom_index]["outgoing"].hasOwnProperty(outgoing_index)) continue;
                graph.edges.push({
                    source: atoms[atom_index],
                    target: atoms[atoms[atom_index]["outgoing"][outgoing_index]["handle"]],
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
})

.factory('simplifications', function () {


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
                var firstOutgHandle = atom["outgoing"][0]["handle"];
                var secondOutgHandle = atom["outgoing"][1]["handle"];
                
                if (atoms[firstOutgHandle] == null) continue;
                
                if (atom.type == "InheritanceLink") {
                    addOutgoing(atoms[firstOutgHandle]["outgoing"], {
                        handle: secondOutgHandle,
                        label: "inherits from",
                        arrow: ">"
                    });
                    addIncoming(atoms[secondOutgHandle]["incoming"],firstOutgHandle);
                    atomsToDelete.push(atom_index);
                } else if (atom.type == "ImplicationLink") {

                    addOutgoing(atoms[firstOutgHandle]["outgoing"], {
                        handle: secondOutgHandle,
                        label: "implies<" + parseFloat(atom["truth_value"]["details"]["strength"]).toFixed(2) + ", " +
                        parseFloat(atom["truth_value"]["details"]["confidence"]).toFixed(2) + ">",
                        arrow: ">"
                    });
                    addIncoming(atoms[secondOutgHandle]["incoming"], firstOutgHandle);
                    atomsToDelete.push(atom_index);
                } else if (atom.type == "SimilarityLink") {
                    addOutgoing(firstOutgoing["outgoing"], {
                        handle: secondOutgHandle,
                        label: "is similar to",
                        arrow: ">"
                    });
                    addIncoming(atoms[secondOutgHandle]["incoming"], firstOutgHandle);
                    atomsToDelete.push(atom_index);
                } else if (atom.type == "EquivalenceLink") {
                    addOutgoing(firstOutgoing["outgoing"], {
                        handle: secondOutgHandle,
                        label: "is equivalent to",
                        arrow: ">"
                    });
                    addIncoming(atoms[secondOutgHandle]["incoming"], firstOutgHandle);
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
                        //if( (a = atoms[listLink["outgoing"][j]["handle"]]) != null)  //dafuq?
                          //       addIncoming(a["incoming"], predicateNode["handle"]);
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
