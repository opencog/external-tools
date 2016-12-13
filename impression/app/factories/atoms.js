angular.module('impression.atomsFactory', ['ngResource'])


.factory('AtomsFactory', function ($http, $resource, $interval, $location) {

    var atomsFactory = {};

    // Data members
    atomsFactory.timer = null;
    atomsFactory.connected = false;

    atomsFactory.server = "";
    atomsFactory.successCB = null;
    atomsFactory.modificationCB = null;
    atomsFactory.modificationHappened = false;
    atomsFactory.graph = new Graph()

    // Serialized Graph Data for d3
    atomsFactory.nodes = {}
    atomsFactory.links = []

    // limit to attentional focus initally to avoid pulling in entire AS.
    atomsFactory.pollSettings = { 'filterby': 'attentionalfocus', 'includeIncoming': 'true', 'includeOutgoing': 'true' }


    atomsFactory.startPeriodicUpdate = function(updatePeriod) {      
      atomsFactory.connected = true;

      atomsFactory.updateAtoms();
      atomsFactory.timer = $interval(atomsFactory.updateAtoms, updatePeriod); 

    };

    atomsFactory.stopPeriodicUpdate = function() {
      atomsFactory.connected = false;
      $interval.cancel(atomsFactory.timer);

      //clear internal data representation
      atomsFactory.graph.clear()
      atomsFactory.nodes = {}
      atomsFactory.links = []
    };

    atomsFactory.connectionFailed = function() {
        atomsFactory.stopPeriodicUpdate();
        $location.path("/");
    };


    atomsFactory.updateAtoms = function () {
       function serialize( obj ) {
         return '?'+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
       }

       console.log("🏭 updateAtoms called with " + serialize(atomsFactory.pollSettings))

       $http({
            method: 'GET',
            url: atomsFactory.server + "api/v1.1/atoms"+serialize(atomsFactory.pollSettings),
            cache: false
        }).then(
            function (response) {
                var atomsResult = response.data.result.atoms;
                var atomHandles = [] //store new handles to determine removed atoms

                console.log("🏭 fetched "+ atomsResult.length +" atoms...")
                atomsFactory.modificationHappened = false

                //update existing atoms
                for (var i = 0; i < atomsResult.length; i++) {
                  var atom = atomsResult[i]
                  atomHandles.push(atom.handle);

                  // preprocess data for d3
                  if (atom.type.search("Node") > -1) { atom.isNode = true }

                  if (atomsFactory.graph.hasVertex(atom.handle)) {
                    oldData = atomsFactory.graph.vertexValue(atom.handle)

                    //console.log(oldData)
                    if (JSON.stringify(oldData.name) != JSON.stringify(atom.name) ||
                        JSON.stringify(oldData.type) != JSON.stringify(atom.type) ||
                        JSON.stringify(oldData.attentionvalue) != JSON.stringify(atom.attentionvalue) ||
                        JSON.stringify(oldData.truthvalue) != JSON.stringify(atom.truthvalue)) {
                      
                      //console.log(oldData)
                      atom.x = oldData.x
                      atom.y = oldData.y
                      atom.vx = oldData.vx
                      atom.vy = oldData.vy

                      atomsFactory.graph.setVertex(atom.handle, atom);
                    }

                  } else {
                    //initial spawn points
                    atom.x = 900
                    atom.y = 500

                    atomsFactory.graph.addNewVertex(atom.handle, atom);
                  }
                    
                }

                //make new edges
                for (var i = 0; i < atomsResult.length; i++) {
                  var atom = atomsResult[i] 
                  var connections = atom.incoming.concat(atom.outgoing)

                  for (var j = 0; j < connections.length; j++) {
                    var connection = connections[j];

                    if (atomsFactory.graph.hasVertex(connection)) {
                      atomsFactory.graph.spanEdge(atom.handle, connection)
                    }
                  }
                };

                // remove old vertices and their associated links
                for (var it = atomsFactory.graph.vertices(), kv; !(kv = it.next()).done;) {
                    var key = kv.value[0];
                    
                    if (atomHandles.indexOf(key) < 0) {
                      atomsFactory.graph.destroyVertex(key)
                    }
                }

                // TODO: remove old links

                // Update edge pointers
                for (var i = 0; i < atomsFactory.links.length; i++) {
                  link = atomsFactory.links[i]
                  link.source = atomsFactory.graph.vertexValue(link.sourceHandle)
                  link.target = atomsFactory.graph.vertexValue(link.targetHandle)
                };

                if (atomsFactory.modificationHappened == true) {
                  if (typeof atomsFactory.modificationCB === "function") atomsFactory.modificationCB();
                }
                
                console.log("🏭 updated internal graph")

                if (typeof atomsFactory.successCB === "function") atomsFactory.successCB();
                atomsFactory.successCB = null
                atomsFactory.connected = true;
            },
            function (error) {
              atomsFactory.connectionFailed();
            }
        );
    };

    // Internal representation for d3
    var notifyModification = function() {
      atomsFactory.modificationHappened = true
    }

    var vertexAdded = function(data) {
      var key = data[0], value = data[1];
      atomsFactory.nodes[key] = value;
      notifyModification();
    };

    var vertexRemoved = function(data) {
      var key = data;
      delete atomsFactory.nodes[key]
      notifyModification();
    };

    var vertexModified = function(data) {
      var key = data[0], value = data[1];
      atomsFactory.nodes[key] = value
      notifyModification();
    };

    var edgeAdded = function(data) {
      var from  = data[0][0],
          to    = data[0][1],
          value = data[0][2];

      atomsFactory.links.push({sourceHandle: from, targetHandle: to})
      notifyModification();
    };

    var edgeRemoved = function(data) {
      var source = data[0]
      var target = data[1]

      var toDelete = -1

      for (var i = 0; i < atomsFactory.links.length; i++) {
        link = atomsFactory.links[i]

        if (link.sourceHandle == source && link.targetHandle == target) {
          toDelete = i
          break
        }
      };

      if (toDelete >= 0) { atomsFactory.links.splice(toDelete, 1); }

      notifyModification();
    };

    var edgeModified = function(data) {
      // not implemented
      notifyModification();
    };

    // Register Updates on Graph
    atomsFactory.graph.on("vertex-added", vertexAdded);
    atomsFactory.graph.on("vertex-removed", vertexRemoved);
    atomsFactory.graph.on("vertex-modified", vertexModified);
    atomsFactory.graph.on("edge-added", edgeAdded);
    atomsFactory.graph.on("edge-removed", edgeRemoved);
    atomsFactory.graph.on("edge-modified", edgeModified);

    return atomsFactory;
})