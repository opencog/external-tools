window.onload = function () {

    // Init dockManager
    var divDockManager = document.getElementById("dock_manager");
    var dockManager = new dockspawn.DockManager(divDockManager);
    dockManager.initialize();
    window.onresize = function (e) {
        dockManager.resize(window.innerWidth - (divDockManager.clientLeft + divDockManager.offsetLeft), window.innerHeight - (divDockManager.clientTop + divDockManager.offsetTop));
    };
    window.onresize();

    // Create PanelContainers
    var toolbox_window = new dockspawn.PanelContainer(document.getElementById("toolbox_window"), dockManager);
    var atom_details_window = new dockspawn.PanelContainer(document.getElementById("atom_details_window"), dockManager);
    var terminal_window = new dockspawn.PanelContainer(document.getElementById("terminal_window"), dockManager);
    var three_d_window = new dockspawn.PanelContainer(document.getElementById("three_d_window"), dockManager);
    var json_window = new dockspawn.PanelContainer(document.getElementById("json_window"), dockManager);
    var planar_window = new dockspawn.PanelContainer(document.getElementById("planar_window"), dockManager);
    var scheme_window = new dockspawn.PanelContainer(document.getElementById("scheme_window"), dockManager);
    var tabular_window = new dockspawn.PanelContainer(document.getElementById("tabular_window"), dockManager);
    var settings_window = new dockspawn.PanelContainer(document.getElementById("settings_window"), dockManager);

    // Dock windows
    var documentManagerNode = dockManager.context.model.documentManagerNode;

    dockManager.dockFill(documentManagerNode, json_window);
    dockManager.dockFill(documentManagerNode, planar_window);
    dockManager.dockFill(documentManagerNode, three_d_window);
    dockManager.dockFill(documentManagerNode, scheme_window);
    dockManager.dockFill(documentManagerNode, tabular_window);
    dockManager.dockDown(documentManagerNode, terminal_window, 0.2);
    dockManager.dockLeft(documentManagerNode, toolbox_window);
    dockManager.dockRight(documentManagerNode, atom_details_window);

}