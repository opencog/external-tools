angular.module('glimpse')
    .directive('addNode', function (AtomsFactory) {
        var link = function (scope, element, attributes) {

            scope.nodeTypes = function () {
                return AtomsFactory.nodeTypes;
            };

            scope.tvTypes = [
                {"id": "simple", "name": "Simple"}
            ];

            scope.reset = function () {
                scope.atom = {
                    name: "",
                    type: "ConceptNode",
                    truthvalue: {
                        type: "simple",
                        details: {}
                    },
                    attentionvalue: {vlti: false}
                };
            };

            scope.createAtom = function () {
                var postData = {};

                // Validate inputs
                // Name
                if (scope.atom.name == "") {
                    window.alert("Error: Name cannot be blank.");
                    return;
                }
                postData.name = scope.atom.name;
                postData.type = scope.atom.type;

                // Simple TV
                if (!scope.atom.truthvalue.details.count || !scope.atom.truthvalue.details.strength) {
                    window.alert("Error: Count and Strength cannot be blank");
                    return;
                }
                postData.truthvalue = scope.atom.truthvalue;

                // Attention Value [Optional]
                if (scope.atom.attentionvalue.sti && scope.atom.attentionvalue.lti) {
                    postData.attentionvalue = scope.atom.attentionvalue;
                }

                AtomsFactory.createAtom(postData, function () {
                    scope.reset();
                });
            };

            // Init
            scope.reset();
        };

        return {
            link: link,
            restrict: 'E',
            scope: {atoms: '='},
            templateUrl: 'js/templates/add-node.html'
        }
    });