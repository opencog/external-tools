angular.module('impression.atomsFactory', ['ngResource'])


.factory('AtomsFactory', function ($http, $resource, $interval, $location) {

    var atomsFactory = {};

    // Data members hidden (TODO prefix)
    atomsFactory._timer = null;
    atomsFactory.connected = false;

    // Data members public
    atomsFactory.server = "";
    atomsFactory.successCB = null;
    atomsFactory.modificationCB = null;
    atomsFactory.graph = new Graph()
    // Serialized Graph Data
    atomsFactory.nodes = {}
    atomsFactory.links = []

    var notifyModification = function() {
      //console.log("modifcation...")
      if (typeof atomsFactory.modificationCB === "function") atomsFactory.modificationCB();
    }

    var vertexAdded = function(data) {
      var key = data[0], value = data[1];
      atomsFactory.nodes[key] = value;

      notifyModification();
    };

    var vertexRemoved = function(data) {
      var key = data[0];
      delete atomsFactory.nodes.key

      notifyModification();
    };

    var vertexModified = function(data) {
      var key = data[0], value = data[1];
      atomsFactory.nodes.key = value

      notifyModification();
    };

    var edgeAdded = function(data) {

      var from  = data[0][0],
          to    = data[0][1],
          value = data[0][2];

      atomsFactory.links.push({source: atomsFactory.graph.vertexValue(from), target: atomsFactory.graph.vertexValue(to)})

      notifyModification();
    };

    var edgeRemoved = function(data) {
      // not implemented
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


    atomsFactory.pollSettings = {
      "filterby": "stirange", // stirange | attentionalfocus
      "stimin": 1,  // if stirange
      "stimax": 30000, // if stirange
      "includeIncoming": "true",
      "includeOutgoing": "true" 
    }

    //no limit for testing
    atomsFactory.pollSettings = { }

    atomsFactory.startPeriodicUpdate = function(updatePeriod) {      
      atomsFactory.connected = true;

      if (updatePeriod>0) {
        atomsFactory._timer = $interval(function() {
          atomsFactory.updateAtoms();
        }, updatePeriod);  
      }
    };

    atomsFactory.stopPeriodicUpdate = function() {
      atomsFactory.connected = false;
      $interval.cancel(atomsFactory._timer);
    };

    atomsFactory.connectionFailed = function() {
        atomsFactory.stopPeriodicUpdate();
        $location.path("/");
    };


    atomsFactory.updateAtoms = function () {

       function serialize( obj ) {
         return '?'+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
       }

       $http({
            method: 'GET',
            url: atomsFactory.server + "api/v1.1/atoms"+serialize(atomsFactory.pollSettings),
            cache: false
        }).then(
            function (response) {
                var atomsResult = response.data.result.atoms;
                var atomHandles = []
                console.log("[AF] fetched atoms...")

                //update existing atoms
                atomsResult.forEach(function(atom) {
                  atomData = {name: atom.name, type: atom.type, attention_value: atom.attentionvalue, truth_value: atom.truthvalue}

                  if (atomsFactory.graph.hasVertex(atom.handle)) {
                    oldData = atomsFactory.graph.vertexValue(atom.handle)

                    //console.log(oldData)
                    if (oldData.type != atomData.type  || 
                       JSON.stringify(oldData.attention_value) != JSON.stringify(atomData.attention_value) ||
                       JSON.stringify(oldData.truth_value) != JSON.stringify(atomData.truth_value) ) {
                      
                      //console.log(oldData)
                      atomData.x = oldData.x
                      atomData.y = oldData.y
                      atomData.vx = oldData.vx
                      atomData.vy = oldData.vy

                      atomsFactory.graph.setVertex(atom.handle, atomData);
                    }

                  } else {
                    atomsFactory.graph.addNewVertex(atom.handle, atomData);
                  }

                  
                  atomHandles.push(atom.handle);
                });

                atomsResult.forEach(function(atom) {
                  atom.incoming.concat(atom.outgoing).forEach(function(connection) {
                    if (atomsFactory.graph.hasVertex(connection)) {
                      atomsFactory.graph.spanEdge(atom.handle, connection) //Set value?
                    }
                  })
                });

                // remove old vertices
                for (var it = atomsFactory.graph.vertices(), kv; !(kv = it.next()).done;) {
                    var key   = kv.value[0];
                    
                    if (atomHandles.indexOf(key) < 0) {
                      atomsFactory.graph.destroyVertex(key)
                    }
                }

                // TODO: remove old links
                // How efficiently?

                console.log("[AF] updated internal graph")

                //DEBUG
                atomsFactory.connected = true;

                if (typeof atomsFactory.successCB === "function") atomsFactory.successCB();
                atomsFactory.successCB = null
            },
            function (error) {
              atomsFactory.connectionFailed();
            }
        );
    };



    return atomsFactory;
})