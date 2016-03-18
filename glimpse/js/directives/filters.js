angular.module('glimpse')
    .directive('filters', function () {
        function link(scope, element, attributes) {

        };

        return {
            link: link,
            restrict: 'E',
            scope: {filter: '='},
            templateUrl: 'js/templates/filters.html'
        }
    });