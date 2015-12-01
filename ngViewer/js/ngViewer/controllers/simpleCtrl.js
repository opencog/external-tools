var simpleCtrl = function ($scope) {

    var simplifyName = function (name) {
        var map = {
            "InheritanceLink": "inherits from",
            "ImplicationLink": "implies",
            "SimilarityLink": "is similar to"
        };
        if (map.hasOwnProperty(name)) {
            return map[name];
        }
        return name;
    };


    $scope.getSimpleAtoms = function () {

        var atoms = $scope.atoms.atoms;
        var nodes = [];
        var links = [];


        for (var index in atoms) {
            var atom = atoms[index];
            if (atom["type"].indexOf("Node") > -1) {
                nodes.push({
                    id: atom["handle"],
                    label: atom["name"]
                });
            } else if (atom["type"].indexOf("Link") > -1) {
                links.push(
                    {
                        from: atom["outgoing"][0],
                        to: atom["outgoing"][1],
                        label: simplifyName(atom["type"])
                    }
                );
            }
        }

        //Display Graph
        var container = document.getElementById('simple_view');
        var network = new vis.Network(container, {nodes: nodes, edges: links}, {
            "nodes": {
                shape: 'dot'
            },
            "edges": {
                "font": {align: 'top'},
                "smooth": {
                    "forceDirection": "none",
                    "roundness": 0.2
                }
            },
            "physics": {
                "forceAtlas2Based": {
                    "springLength": 100
                },
                "minVelocity": 0.75,
                "solver": "forceAtlas2Based"
            }
        });
    };
};