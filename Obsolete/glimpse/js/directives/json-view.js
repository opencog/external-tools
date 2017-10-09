angular.module('glimpse')
    .directive('jsonView', function () {
        function link(scope, element, attributes) {
            scope.jsonAtoms = [];

            scope.$watch('atoms', function (value) {
                scope.jsonAtoms = JSON.stringify(value, null, '\t');
            }, true);
        };

        return {
            link: link,
            restrict: 'E',
            scope: {atoms: '='},
            template: '<pre>{{jsonAtoms}}</pre>',
            replace: true
        }
    });