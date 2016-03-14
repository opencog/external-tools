angular.module('glimpse')
    .directive('atomDetails', function () {
        function link(scope, element, attributes) {
            scope.jsonAtoms = [];

            scope.$watch('selectedAtoms', function (value) {
                scope.jsonAtoms = JSON.stringify(value, null, '\t');
            }, true);
        };

        return {
            link: link,
            restrict: 'E',
            scope: {atoms: '=', selectedAtoms: '='},
            template: '<pre>{{jsonAtoms}}</pre>',
            replace: true
        }
    });