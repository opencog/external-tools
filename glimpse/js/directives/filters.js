angular.module('glimpse')
    .directive('filters', function (AtomsFactory) {
        function link(scope, element, attributes) {

	    scope.nodeTypes = function () {
                return AtomsFactory.nodeTypes;
            };
           
	    scope.filter = function () {
		console.log("filter button clicked");
		var fil = scope.atom.type;
		return AtomsFactory.filter(fil);
            };

	 };

        return {
            link: link,
            restrict: 'E',
            scope: {atoms: '='},
            templateUrl: 'js/templates/filters.html'
        }
    });
