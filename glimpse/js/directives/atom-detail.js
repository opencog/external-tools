angular.module('glimpse')
    .directive('atomDetail', function () {
        var link = function (scope, element, attributes) {

        };
        return {
            link: link,
            restrict: 'E',
            scope: {atom: '='},
            templateUrl: "js/templates/atom-detail.html",
            replace: true
        }
    });