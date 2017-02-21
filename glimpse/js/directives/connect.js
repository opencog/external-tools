angular.module('glimpse')
    .directive('connect', function ($rootScope, AtomsFactory) {
        var link = function (scope, element, attributes) {
            scope.state = "idle";

            scope.reset = function () {
                scope.settings = {
                    server: "http://localhost:5000/"
                };
            };

            var updateAtoms = function () {

                var onSuccess = function () {
                    console.log("Success")
                    scope.atoms = AtomsFactory.atoms;
                    scope.nodes = AtomsFactory.nodes;
                    scope.links = AtomsFactory.links;
                    scope.state = "message";
                    scope.message = "Successfully fetched " + Object.keys(AtomsFactory.nodes).length + " atoms.";
                    scope.message_class = "success";
                    setTimeout(function () {
                        scope.dialog.destroy();
                    }, 1500);
                    setTimeout(updateAtoms, 5000);
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
                
                if($rootScope.slideMode == true){
                  AtomsFactory.pollSettings.filterby = "attentionalfocus"
                } else {
                  AtomsFactory.pollSettings.filterby = ""
                }
                
                AtomsFactory.updateAtoms(onSuccess, onFailure);
            };

            scope.connect = function () {
                scope.state = "loading";
                AtomsFactory.server = scope.settings.server;
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
