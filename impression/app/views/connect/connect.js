'use strict';

angular.module('impression.connectView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/connect/connect.html',
    controller: 'ConnectCtrl'
  });
}])

.controller('ConnectCtrl', function($scope, $routeParams, $http, $timeout, $interval, $location, AtomsFactory, AttentionFactory, config) {

    /* TODO:
        - refactor colours out of logic to CSS classes
        - connection failed never triggered..
    */

    $scope.header = config.header
    $scope.version = config.version

    if (AtomsFactory.server == "") {
        $scope.serverURL = "http://localhost:5000/"
    } else {
        $scope.serverURL = AtomsFactory.server
    }

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
    
        $scope.connectButtonLabel = "connecting...";
        $scope.connectButtonColor = "rgba(0,0,0,0.1)"

        AtomsFactory.server = $scope.serverURL;
        AttentionFactory.server = $scope.serverURL;
        
        $scope.connectionSucceeded()
    };

    $scope.connectionSucceeded = function() {
        $scope.connectButtonLabel = "disconnect";
        $scope.connectButtonColor = "rgba(0,255,0,0.4)"

        $timeout(function() { $location.path("/atomspace"); },1000);
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
        AttentionFactory.stopPeriodicUpdate();
    };


});