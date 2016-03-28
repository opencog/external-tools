angular.module('glimpse')
    .directive('atomDetails', function () {
        function link(scope, element, attributes) {

            scope.$watch('selectedHandles', function (handles) {
                scope.selectedAtoms = scope.atoms.filter(function (n) {
                    return handles.indexOf(n.handle) > -1;
                });
            }, true);
        };

        return {
            link: link,
            restrict: 'E',
            scope: {atoms: '=', selectedHandles: '='},
            templateUrl: "js/templates/atom-details.html",
            replace: true
        }
    });