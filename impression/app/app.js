'use strict';

// Declare app level module which depends on views, and components
angular.module('impression', [
  'ngRoute',
  'ngAnimate',
  'impression.connectView',
  'impression.atomspaceView',
  'impression.openpsiView'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}])

.controller('MainCtrl', function($scope, $routeParams, $http, $location) {

    $scope.handleKeypress = function(keyEvent) {
      if ([].slice.call(document.getElementsByClassName("input")).includes(document.activeElement)) return;

      switch(keyEvent.which-48) {
          case 1:
              $location.path("/");
          break;

          case 2:
              $location.path("/atomspace");
          break;

          case 3: 
              $location.path("/openpsi");
          break;
      }
    }

});