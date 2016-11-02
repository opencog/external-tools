'use strict';

angular.module('impression.connectView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/connect/connect.html',
    controller: 'ConnectCtrl'
  });
}])

.controller('ConnectCtrl', function($scope, $routeParams, $http) {


});