angular.module('impression.atomsFactory', ['ngResource'])


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

      if (atomsPeriod>0) {
        atomsFactory.interval = $interval(function() {
          atomsFactory.updateSTIRangeAtoms(null, function() {atomsFactory.connectionFailed()});
        }, atomsPeriod);  
      }

      if (attentionPeriod>0) {
        atomsFactory.interval = $interval(function() {
          atomsFactory.updateAttention(null, function() {atomsFactory.connectionFailed()});
        }, attentionPeriod);       
      }

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
    
    atomsFactory.updateSTIRangeAtoms = function (successCB, failureCB) {
      $http({
        method: 'GET',
        url: atomsFactory.server + 'api/v1.1/atoms?filterby=stirange&stimin=1&stimax=30000&includeOutgoing=true&includeIncoming=true'
      }).then(
        function (response){
          atomsFactory.atoms = response.data.result.atoms;
          atomsFactory.atomsCount = atomsFactory.atoms.length;
          console.log("[AF] updated atoms")
          if (typeof successCB === "function") successCB();
        },
        function (error) {
          if (typeof failureCB === "function") failureCB();
        }
      );
    };

    return atomsFactory;
})