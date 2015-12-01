var addNodeCtrl = function ($scope, $uibModalInstance, $http, TypesFactory) {

    // Functions
    $scope.types = function () {
        return types;
    };


    // GUI Handlers
    $scope.ok = function () {

        $http.post('http://localhost:5000/api/v1.1/atoms', $scope.node)
            .success(function (data, status, headers, config) {
                console.log("S - " + data + " - " + status)
            })
            .error(function (data, status, headers, config) {
                console.log("E - " + data + " - " + status)
            });


        console.log($scope.node);
        //$uibModalInstance.close("C - NODE");
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


    // Init
    var types = [];
    $scope.node = {
        "type": "ConceptNode",
        "truthvalue": {"type": "simple"}
    };


    TypesFactory.get(function (data) {
        types = data.types;
    });
};