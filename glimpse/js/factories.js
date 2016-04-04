angular.module('glimpse')
    .factory('AtomsFactory', function ($resource) {

        var atomsFactory = {};


        atomsFactory.atoms = [];
        atomsFactory.server = "";
        atomsFactory.pullAtoms = function (callback) {
            $resource(atomsFactory.server + "api/v1.1/atoms", {}, {'get': {method: 'GET', cache: false}}).get(function (data) {
                atomsFactory.atoms = data.result.atoms;
                if (typeof callback === "function") callback();
            });

        };

        atomsFactory.setServer = function (s) {
            atomsFactory.server = s;
        };

        return atomsFactory;
    })
;