'use strict';

angular.module('impression.connectView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/connect/connect.html',
    controller: 'ConnectCtrl'
  });
}])

.controller('ConnectCtrl', function($scope, $routeParams, $http, $timeout, $interval, $location, AtomsFactory) {

    /* TODO:
        - refactor colours out of logic to CSS classes

    */

    if (!AtomsFactory.connected) {
        $scope.connectButtonLabel = "connect"
        $scope.connectButtonColor = "rgba(0,0,0,0.3)"
    } else {
        $scope.connectButtonLabel = "disconnect";
        $scope.connectButtonColor = "rgba(0,255,0,0.4)"        
    }

    $scope.buttonPressed = function() {

        if (AtomsFactory.connected) {
            $scope.disconnect();
        } else {
            $scope.connect();
        }

    };

    $scope.connect = function() {
        var serverURL = document.getElementById("serverField").value;
    
        $scope.connectButtonLabel = "connecting...";
        $scope.connectButtonColor = "rgba(0,0,0,0.1)"

        AtomsFactory.server = serverURL;

        AtomsFactory.startPeriodicUpdate(5000);
        AtomsFactory.updateAtoms()

        AtomsFactory.successCB = $scope.connectionSucceeded;
        

    };

    $scope.connectionSucceeded = function() {
        $scope.connectButtonLabel = "disconnect";
        $scope.connectButtonColor = "rgba(0,255,0,0.4)"

        $timeout(function() {
            $location.path("/atomspace");
        },1000);
    };

    $scope.connectionFailed = function() {
        $scope.connectButtonLabel = "connection failed, try again.";
        $scope.connectButtonColor = "rgba(255,0,0,0.3)"
        $timeout(function() {$scope.disconnect()}, 2000);
    };

    $scope.disconnect = function() {
        $scope.connectButtonLabel = "connect";
        $scope.connectButtonColor = "rgba(0,0,0,0.3)"

        AtomsFactory.stopPeriodicUpdate();
    };


});