var jsonCtrl = function ($scope) {
    $scope.getJSONAtoms = function () {
        return JSON.stringify($scope.atoms, null, '\t');
    };
};