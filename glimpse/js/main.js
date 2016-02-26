var ngViewer = angular.module("glimpse", ["ngResource"]);

ngViewer.controller("mainCtrl", function ($scope, AllAtomsFactory) {
    // Functions
    $scope.getAtoms = function () {
        AllAtomsFactory.get(function (data) {
            $scope.atoms = data.result;
            $scope.$broadcast('atomsChanged');
        });
    };

    // Init
    $scope.atoms = [];
    $scope.getAtoms();
});