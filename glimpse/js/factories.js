angular.module('glimpse')
    .factory('AllAtomsFactory', function ($resource) {
        return $resource("http://localhost:8000/test_jsons/atoms.json");
    })
;

