angular.module('glimpse').controller("jsonCtrl", function ($scope) {

    var updateView = function () {
        $scope.jsonAtoms = JSON.stringify($scope.atoms, null, '\t');
    };

    $scope.$on("atomsChanged", function () {
        updateView();
    });

    updateView();
})