angular.module('ngViewer')
    .factory('TypesFactory', function ($resource) {
        return $resource("http://localhost:5000/api/v1.1/types/");
    });


angular.module('ngViewer')
    .factory('AllAtomsFactory', function ($resource) {
        return $resource("http://localhost:5000/api/v1.1/atoms/");
    });

angular.module('ngViewer')
    .factory('AtomFactory', function ($resource) {
        return $resource("http://localhost:5000/api/v1.1/atoms/");
    });

