'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('impression', [
  'ngRoute',
  'ngAnimate',
  'ngResource',
  'impression.atomsFactory',
  'impression.attentionFactory',
  'impression.connectView',
  'impression.atomspaceView',
  'impression.openpsiView'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/'});
}])

.controller('MainCtrl', function($scope, $rootScope, $routeParams, $http, $location, AtomsFactory) {
    $rootScope.showOptions = false
    
    // This handles the keypresses for the UI.
    // 1 - go to connection screen
    // 2 - go to atomspace, or show/hide the option menu
    // 3 - go to openpsi graph view
    
    $scope.handleKeypress = function(keyEvent) {
      if ([].slice.call(document.getElementsByClassName("input")).includes(document.activeElement)) return;
      if (!AtomsFactory.connected && keyEvent.which-48 > 1) return;

      switch(keyEvent.which-48) {
          case 1:
              $location.path("/");
          break;

          case 2:
            if ($location.path() == "/atomspace") {
              $rootScope.showOptions = !$rootScope.showOptions
            } else {
              $location.path("/atomspace");
            }
          break;

          case 3: 
              $location.path("/openpsi");
          break;
      }
    }

})

