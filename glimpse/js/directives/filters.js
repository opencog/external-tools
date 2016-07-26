angular.module('glimpse')
    .directive('filters', function (AtomsFactory) {
        var link = function (scope, element, attributes) {

	    scope.nodeTypes = function () {
		var types = [];
		for (var i=0; i < AtomsFactory.atoms.length; i++)
		{ types.push(AtomsFactory.atoms[i].type); }
		types = $.unique(types);
		types = types.sort();
                return types;
            };
           
	    scope.filter = function (type) {
		if(type == null){}
		else{
		scope.filt = type;}
            };
	    scope.all = function (type) {
		if(type == null){}
		else { scope.filt = "all";}
            };
	    scope.hide = function (type) {
		if(type == null){}
		else {scope.filt = "hide"+type;}
	    };
		
	 };

        return {
            link: link,
            restrict: 'E',
            scope: {filt: '='},
            templateUrl: 'js/templates/filters.html'
        }
    });
