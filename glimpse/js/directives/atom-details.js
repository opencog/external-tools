angular.module('glimpse')
    .directive('atomDetails', function () {
        function link(scope, element, attributes) {


            scope.$watch('selectedIndices', function (value) {
                if (value) {
                    scope.selectedAtoms = [];
                    value.forEach(function (i) {
                        scope.selectedAtoms.push(scope.atoms[i]);
                    });
                }
            }, true);
        };

        return {
            link: link,
            restrict: 'E',
            scope: {atoms: '=', selectedIndices: '='},
            templateUrl: "js/templates/atom-details.html",
            replace: true
        }
    });