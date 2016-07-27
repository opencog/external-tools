angular.module('glimpse')
    .directive('connect', function (AtomsFactory) {
        var link = function (scope, element, attributes) {
            scope.state = "idle";

            scope.reset = function () {
                scope.settings = {
                    server: "http://localhost:5000/"
                };
            };

            var updateAtoms = function () {

                var onSuccess = function () {
                    scope.atoms = AtomsFactory.atoms;
                    scope.state = "message";
                    scope.message = "Successfully fetched " + AtomsFactory.atomsCount + " atoms.";
                    scope.message_class = "success";
                    setTimeout(function () {
                        scope.dialog.destroy();
                    }, 1500);
                    setTimeout(updateAtoms, 10000);
			                    
                };

                var onFailure = function () {
                    scope.state = "message";
                    scope.message = "Error connecting to server!";
                    scope.message_class = "error";
                    setTimeout(function () {
                        scope.state = "idle";
                        scope.$apply();
                    }, 2000);
                };

                AtomsFactory.updateAtoms(onSuccess, onFailure);
            };

            scope.connect = function () {
                scope.state = "loading";
                AtomsFactory.setServer(scope.settings.server);
                AtomsFactory.updateAtomTypes();
                updateAtoms();
            };

            // Init
            scope.reset();
        };

        return {
            link: link,
            restrict: 'E',
            scope: {atoms: '=', settings: '=', dialog: '='},
            templateUrl: 'js/templates/connect.html'
        }
    });
