var glimpse = angular.module("glimpse", ["ngResource", "ngAnimate", "vAccordion"]);

glimpse.controller("mainCtrl", function ($scope, $window, $timeout, AtomsFactory) {
    // Global vars
    var divDockManager, dockManager;
    var toolboxPanel, atomDetailsPanel, terminalPanel, threeDPanel, jsonPanel, planarPanel, schemePanel, tabularPanel, settingsPanel;
    var documentManagerNode, toolboxNode, jsonNode, threeDNode, terminalNode, planarNode, atomDetailsNode, settingsDialog;

    // Functions
    $scope.getAtoms = function () {
        AtomsFactory.pullAtoms(function () {
            $scope.atoms = AtomsFactory.atoms;
        });
    };

    // Onload event handler
    $window.onresize = function (e) {
        dockManager.resize(window.innerWidth - (divDockManager.clientLeft + divDockManager.offsetLeft), window.innerHeight - (divDockManager.clientTop + divDockManager.offsetTop));
    };

    $window.onload = function () {
        // Init dockManager
        divDockManager = document.getElementById("dock_manager");
        dockManager = new dockspawn.DockManager(divDockManager);
        dockManager.initialize();

        $window.onresize();

        // Create PanelContainers
        toolboxPanel = new dockspawn.PanelContainer(document.getElementById("toolbox_panel"), dockManager);
        atomDetailsPanel = new dockspawn.PanelContainer(document.getElementById("atom_details_panel"), dockManager);
        terminalPanel = new dockspawn.PanelContainer(document.getElementById("terminal_panel"), dockManager);
        threeDPanel = new dockspawn.PanelContainer(document.getElementById("three_d_panel"), dockManager);
        jsonPanel = new dockspawn.PanelContainer(document.getElementById("json_panel"), dockManager);
        planarPanel = new dockspawn.PanelContainer(document.getElementById("planar_panel"), dockManager);
        schemePanel = new dockspawn.PanelContainer(document.getElementById("scheme_panel"), dockManager);
        tabularPanel = new dockspawn.PanelContainer(document.getElementById("tabular_panel"), dockManager);
        settingsPanel = new dockspawn.PanelContainer(document.getElementById("settings_panel"), dockManager);

        // Dock windows
        documentManagerNode = dockManager.context.model.documentManagerNode;

        jsonNode = dockManager.dockFill(documentManagerNode, jsonPanel);
        //threeDNode = dockManager.dockFill(documentManagerNode, threeDPanel);
        planarNode = dockManager.dockFill(documentManagerNode, planarPanel);
        //dockManager.dockFill(documentManagerNode, scheme_window);
        //dockManager.dockFill(documentManagerNode, tabular_window);
        terminalNode = dockManager.dockDown(documentManagerNode, terminalPanel, 0.2);
        toolboxNode = dockManager.dockLeft(documentManagerNode, toolboxPanel);
        atomDetailsNode = dockManager.dockRight(documentManagerNode, atomDetailsPanel);


        for (var key in planarNode) {
            var value = planarNode[key];
            console.log(value);
        }

        planarNode.detachFromParent();
        //console.log(planarNode.width);


    };

    $scope.showSettingsPanel = function () {
        settingsDialog = new dockspawn.Dialog(settingsPanel, dockManager);
        settingsDialog.setPosition(window.innerWidth - settingsPanel._cachedWidth, window.innerHeight - settingsPanel._cachedHeight);
    };

    $scope.pow = function () {

        $scope.pv_settings.size.width += 10;

        //AtomsFactory.atoms.push({
        //    "attentionvalue": {
        //        "lti": 0,
        //        "sti": 0,
        //        "vlti": false
        //    },
        //    "handle": 51,
        //    "incoming": [
        //        52,
        //        56,
        //        54
        //    ],
        //    "name": "POW",
        //    "outgoing": [],
        //    "truthvalue": {
        //        "details": {
        //            "confidence": 0.0,
        //            "count": 0.0,
        //            "strength": 1.0
        //        },
        //        "type": "simple"
        //    },
        //    "type": "ConceptNode"
        //});

    };

    // Init
    $scope.atoms = [];
    //console.log($("planar-view"));
    //console.log( document.getElementsByTagName("planar-view"));
    $scope.pv_settings = {
        size: {width: 500, height: 400},
        force: {charge: -300}
    };

    $scope.getAtoms();
});