var ngViewer = angular.module("ngViewer", ["ngResource", "ngRoute", "ui.bootstrap"]).
    config(function ($routeProvider) {
        $routeProvider.
            when('/view/json', {controller: jsonCtrl, templateUrl: 'templates/json.html'}).
            when('/view/table', {controller: tableCtrl, templateUrl: 'templates/table.html'}).
            when('/view/simple', {controller: simpleCtrl, templateUrl: 'templates/simple.html'}).
            when('/view/planar', {controller: planarCtrl, templateUrl: 'templates/planar.html'}).
            otherwise({redirectTo: '/view/simple'});
    });

ngViewer.controller("mainCtrl", function ($scope, $http, $location, $uibModal, AllAtomsFactory) {
    //Functions
    $scope.getAtoms = function () {
        AllAtomsFactory.get(function (data) {
            $scope.atoms = data.result;
        });
    };

    $scope.getViewMode = function () {
        var pathMapper = {
            "/view/json": "JSON",
            "/view/planar": "Planar",
            "/view/simple": "Simple",
            "/view/table": "Table"
        };
        return pathMapper[($location.path())];
    };

    // GUI Event Handlers
    $scope.addNode_handler = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'templates/add_node.html',
            controller: addNodeCtrl,
            size: 'lg'
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        });

        modalInstance.result.then(function (newNode) {
            console.log("Success - " + newNode);
        });
    };

    // Init
    $scope.atoms = [];
    $scope.getAtoms();
});