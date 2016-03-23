angular.module('glimpse')
    .directive('atomDetail', function () {
        function link(scope, element, attributes) {

        };

        return {
            link: link,
            restrict: 'E',
            scope: {atom: '='},
            templateUrl: "js/templates/atom-detail.html",
            replace: true
        }
    });