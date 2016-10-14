angular.module('glimpse')
    .directive('graph', function () {
        var link = function (scope, element, attributes) {

        };

        return {
            link: link,
            restrict: 'E',
            scope: {atoms: '='},
            templateUrl: 'js/templates/graph.html'
        }
    });