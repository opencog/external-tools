angular.module('glimpse')
    .factory('AtomsFactory', function ($http, $resource) {

        var atomsFactory = {};

        // Data members
        atomsFactory.atoms = [];
        atomsFactory.atomsCount = 0;
        atomsFactory.server = "";
        atomsFactory.nodeTypes = [];
	atomsFactory.types = [];
	
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
                    if (typeof successCB === "function") successCB();
		     },
                function (error) {
                    if (typeof failureCB === "function") failureCB();
                }
            );
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

        atomsFactory.updateAtomTypes = function () {
            $http({
                method: 'GET',
                url: atomsFactory.server + 'api/v1.1/types'
            }).then(function (response) {
		atomsFactory.types = response.data.types;
		atomsFactory.types.push("GeneNode");
		atomsFactory.types.push("ProteinNode");
                atomsFactory.nodeTypes = response.data.types.filter(function (atom) {
                    return atom.indexOf("Node") > -1;
                });
		
            });
        };

	       
        return atomsFactory;
    })


;
