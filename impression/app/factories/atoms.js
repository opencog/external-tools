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

    //no limit initially
    atomsFactory.pollSettings = { 'filterby': 'attentionalfocus' }

    atomsFactory.startPeriodicUpdate = function(updatePeriod) {      
      atomsFactory.connected = true;

      if (updatePeriod>0) {
        atomsFactory._timer = $interval(function() { atomsFactory.updateAtoms(); }, updatePeriod); 
        atomsFactory.updateAtoms();
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

                //TODO: refactor this block, there must be a better way.

                //update existing atoms
                atomsResult.forEach(function(atom) {
                  atomHandles.push(atom.handle);

                  atomData = {name: atom.name, type: atom.type, isNode: false, attention_value: atom.attentionvalue, truth_value: atom.truthvalue, id: atom.handle}

                  if (atom.type.search("Node") > -1) {
                    atomData.isNode = true
                  }

                  if (atomsFactory.graph.hasVertex(atom.handle)) {
                    oldData = atomsFactory.graph.vertexValue(atom.handle)

                    //console.log(oldData)
                    if (oldData.type != atomData.type  || oldData.name != atomData.name  || 
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
                    //initial spawn points
                    atomData.x = 900
                    atomData.y = 500

                    atomsFactory.graph.addNewVertex(atom.handle, atomData);
                  }

                });

                atomsResult.forEach(function(atom) {
                  atom.incoming.concat(atom.outgoing).forEach(function(connection) {
                    if (atomsFactory.graph.hasVertex(connection)) {
                      atomsFactory.graph.spanEdge(atom.handle, connection)
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
                if (typeof atomsFactory.modificationCB === "function") atomsFactory.modificationCB();
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

    // Internal representation for d3
    var notifyModification = function() {
      //console.log("modifcation...")

      //if (typeof atomsFactory.modificationCB === "function") atomsFactory.modificationCB();
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

      //TODO: stupidly update all edges
      atomsFactory.links.forEach(function(link) {
        //console.log(link)
        link.source = atomsFactory.graph.vertexValue(link.sourceHandle)
        link.target = atomsFactory.graph.vertexValue(link.targetHandle)
      });

      notifyModification();
    };

    var edgeAdded = function(data) {
      var from  = data[0][0],
          to    = data[0][1],
          value = data[0][2];

      atomsFactory.links.push({sourceHandle: from, source: atomsFactory.graph.vertexValue(from), targetHandle: to, target: atomsFactory.graph.vertexValue(to)})
      notifyModification();
    };

    var edgeRemoved = function(data) {
      //TODO performance improvements?
      var source = atomsFactory.graph.vertexValue(data[0])
      var target = atomsFactory.graph.vertexValue(data[1])

      var toDelete = null

      atomsFactory.links.forEach(function(link) {
        if (link.source.name == source.name && link.target.name == target.name) {
          toDelete = link
        }
      });

      var index = atomsFactory.links.indexOf(toDelete);
      if (index > 0) { atomsFactory.links.splice(index, 1); }

      notifyModification();
    };

    var edgeModified = function(data) {
      // not implemented
      //notifyModification();
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