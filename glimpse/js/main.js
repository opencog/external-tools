var glimpse = angular.module("glimpse", ["ngResource", "ngAnimate", "vAccordion", "highcharts-ng"]);

glimpse.controller("mainCtrl", function ($rootScope, $scope, $window, $timeout, $interval, utils, AtomsFactory, AttentionFactory) {
    // Global vars
    var divDockManager, dockManager;
    var toolboxPanel, atomDetailsPanel, terminalPanel, threeDPanel, jsonPanel, planarPanel, schemePanel, tabularPanel,
        filtersPanel, settingsPanel, addNodePanel, connectPanel, graphPanel, addSeriesPanel;
    var documentManagerNode, toolboxNode, jsonNode, threeDNode, terminalNode, planarNode, atomDetailsNode,
        settingsDialog, filtersDialog, addNodeDialog, connectDialog, graphNode;

    var planarView1;

    // Functions
    var panelResized = function () {
        $scope.settings.planar.size = {
            width: planarView1.getBoundingClientRect().width,
            height: planarView1.getBoundingClientRect().height
        };
    };

    $scope.showPanel = function (panel) {
        if (panel == 'filters') {
            filtersDialog = new dockspawn.Dialog(filtersPanel, dockManager);
            filtersDialog.setPosition(window.innerWidth - filtersPanel._cachedWidth, window.innerHeight - filtersPanel._cachedHeight);
        } else if (panel == 'planar_settings') {
            settingsDialog = new dockspawn.Dialog(settingsPanel, dockManager);
            settingsDialog.setPosition(window.innerWidth - settingsPanel._cachedWidth, window.innerHeight - settingsPanel._cachedHeight);
        }
        else if (panel == 'add_node') {
            addNodeDialog = new dockspawn.Dialog(addNodePanel, dockManager);
            addNodeDialog.setPosition((window.innerWidth - addNodePanel._cachedWidth) / 2, (window.innerHeight - connectPanel._cachedHeight) / 2);
        } 
        else if (panel == 'add_graph_series') {
            //var addSeriesDialog;
            addSeriesDialog = new dockspawn.Dialog(addSeriesPanel, dockManager);
            addseriesDialog.setPosition((window.innerWidth - addSeriesPanel._cachedWidth) / 2, (window.innerHeight - connectPanel._cachedHeight) / 2);
        }

        else if (panel == 'connect') {
            connectDialog = new dockspawn.Dialog(connectPanel, dockManager);
            connectDialog.setPosition((window.innerWidth - connectPanel._cachedWidth) / 2, (window.innerHeight - connectPanel._cachedHeight) / 2);
        } else if (panel == 'graph2' && documentManagerNode.children.indexOf(graphNode) == -1) {
            $rootScope.$broadcast('openPsiPanelAppears');
            graphNode = dockManager.dockFill(documentManagerNode, graphPanel);
        } else if (panel == 'json' && documentManagerNode.children.indexOf(jsonNode) == -1) {
            jsonNode = dockManager.dockFill(documentManagerNode, jsonPanel);
        } else if (panel == 'planar' && documentManagerNode.children.indexOf(planarNode) == -1) {
            planarPanel = dockManager.dockFill(documentManagerNode, planarPanel);
        } else if (panel == 'terminal' && documentManagerNode.children.indexOf(terminalNode) == -1) {
            terminalNode = dockManager.dockDown(documentManagerNode, terminalPanel, 0.2);
        } else if (panel == 'toolbox' && documentManagerNode.children.indexOf(toolboxNode) == -1) {
            toolboxNode = dockManager.dockLeft(documentManagerNode, toolboxPanel);
        } else if (panel == 'atom_details' && documentManagerNode.children.indexOf(atomDetailsNode) == -1) {
            atomDetailsNode = dockManager.dockRight(documentManagerNode, atomDetailsPanel);
        }
    };


    // Event Handlers
    $window.onresize = function (e) {
        dockManager.resize(window.innerWidth - (divDockManager.clientLeft + divDockManager.offsetLeft), window.innerHeight - (divDockManager.clientTop + divDockManager.offsetTop));
    };

    $scope.$on('panelResized', panelResized);

    $scope.$on('panelUndock', function () {
        $timeout(panelResized);
    });

    // Onload event handler
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
        filtersPanel = new dockspawn.PanelContainer(document.getElementById("filters_panel"), dockManager);
        settingsPanel = new dockspawn.PanelContainer(document.getElementById("settings_panel"), dockManager);
        addNodePanel = new dockspawn.PanelContainer(document.getElementById("add_node_panel"), dockManager);
        connectPanel = new dockspawn.PanelContainer(document.getElementById("connect_panel"), dockManager);
        graphPanel = new dockspawn.PanelContainer(document.getElementById("graph_panel"), dockManager);
        addSeriesPanel = new dockspawn.PanelContainer(document.getElementById("add_series_panel"), dockManager);

        // Dock windows
        documentManagerNode = dockManager.context.model.documentManagerNode;

        $scope.showPanel("json");
        $scope.showPanel("planar");
        $scope.showPanel("terminal");
        $scope.showPanel("toolbox");
        $scope.showPanel("atom_details");

        //terminalNode = dockManager.dockDown(documentManagerNode, terminalPanel, 0.2);
        //toolboxNode = dockManager.dockLeft(documentManagerNode, toolboxPanel);
        //atomDetailsNode = dockManager.dockRight(documentManagerNode, atomDetailsPanel);
        if (!utils.getUrlParameter("d"))
            $scope.showPanel("connect");
        $scope.connectDialog = connectDialog;
        // Init frequently used DOM elements
        planarView1 = document.getElementById("planar-view-1");

        // Translate jquery events into angular
        $(document)
            .on("dockspawn.panelResized", function (event) {
                if (event.sender == planarPanel)
                    $rootScope.$apply(function () {
                        $rootScope.$broadcast("panelResized");
                    });
            })
            .on("dockspawn.panelUndock", function (event) {
                $rootScope.$apply(function () {
                    $rootScope.$broadcast("panelUndock");
                });
            });
        $timeout(panelResized);
    };


    // Init
    $scope.atoms = [];
    $scope.tool = "select";
    $scope.filt = "none";
    $scope.hide = "none";
    $scope.settings = {};
    $scope.settings.general = {
        server: ""
    };
    $scope.settings.planar = {
        size: {width: 0, height: 0},
        force: {
            charge: -500,
            friction: 0.9,
            gravity: 0.05,
            linkDistance: 70,
            linkStrength: 0.5
        },
        text: {
            node: "full",
            link: "abbreviated"
        },
        simplifications: {
            logical: true,
            evaluation: true
        }
    };

    $scope.selectedIndices = [];

});
