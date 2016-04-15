angular.module('glimpse')
    .directive('planarSettings', function () {
        var link = function (scope, element, attributes) {

        };

        return {
            link: link,
            restrict: 'E',
            scope: {settings: '='},
            templateUrl: 'js/templates/planar-settings.html'
        }
    });