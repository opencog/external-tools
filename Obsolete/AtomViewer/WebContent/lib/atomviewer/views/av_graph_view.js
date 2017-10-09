/*
 * av_graph_view.js
 *
 * This file contains all code for manipulating the graph view.
 *
 * Copyright (C) 2013 OpenCog Foundation
 * All Rights Reserved
 *
 * Written by Scott Jones <troy.scott.j@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License v3 as
 * published by the Free Software Foundation and including the exceptions
 * at http://opencog.org/wiki/Licenses
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program; if not, write to:
 * Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */


/*
 * Object to encapsulate some of the graph properties.
 */
var av_graph =
{
    fdGraph : null,         // Force directed graph object (Jit)
    labelColor : "#000000", // Default text color for node labels
    labelSize : 10,         // Default text size for node labels
    edgeWidth : 0.4,        // Line size for edges
    nodeSize : 8,           // Default graph node size
    edgeColor : "#0000ff",  // Default edge color
    selectedNode : null     // Currently selected graph node
};

/*
 * Constants.
 */
var MAX_GRAPH_NODES = 350;  // Keep the Jit graph from crashing with too many nodes

/*
 * Called to create/refresh the graph view.
 */
function updateGraphView()
{
    // It may be better to do an in-place update if there is already an
    // existing graph, but for now, just destroy and recreate.
    av_graph.fdGraph = null;
    
    if (av.atom_data != null)
    {
        av.DOM.byId("idGraphCanvas").innerHTML = "";
        createFDGraph();
    }
    else
    {
        av.DOM.byId("idGraphCanvas").innerHTML = "<h1 align='center'>(No Data)</h1>";
    }
}

/*
 * Should be called whenever there's a resize event.
 */
function resizeGraph()
{
    if (av_graph.fdGraph != null)
    {
        av_graph.fdGraph.canvas.resize(getGraphWidth(), getGraphHeight());
    }
}

/*
 * These two functions compute the desired width and height of the graph.
 * Note that we base it on the currently active (visible) tab, not the graph
 * tab itself, since if a refresh is done while any other tab is active, the
 * graph tab defaults to something like 200 x 200 (a dojo/dijit quirk). 
 */
function getGraphWidth()
{
    var activeTabID = (av.Registry.byId("idTabContainer")).selectedChildWidget.id;
    var graph_width = (av.DOM.byId(activeTabID)).clientWidth - 20;
    return graph_width;   
}

function getGraphHeight()
{
    var activeTabID = (av.Registry.byId("idTabContainer")).selectedChildWidget.id;
    var graph_height = (av.DOM.byId(activeTabID)).clientHeight - 20;
    return graph_height;
}

/**
 * disable selection on mouse enter and on drag move
 */
function DeselectOnMouseDrag()
{	
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.cssClass {-webkit-user-select: none;-moz-user-select: -moz-none;-ms-user-select: none;  user-select: none; }';
	document.getElementsByTagName('div')[0].appendChild(style);
	document.getElementById('wrapper').className = 'cssClass';	
}
/**
 * enable selection on mouse leave
 */
function RemoveDisableSelection()
{
	 document.getElementById("wrapper").className = "";
}

/*
 * This function does the work of actually creating our graph. This version
 * creates a force directed style graph, using Jit (InfoVis).
 */
function createFDGraph()
{
    av_graph.fdGraph = new $jit.ForceDirected(
    {
        width: getGraphWidth(),
        height: getGraphHeight(),
        injectInto : "idGraphCanvas",
        Navigation :
        {
            enable : true,

            // Enable panning events only if we're dragging the empty
            // canvas (and not a node):
            panning : 'avoid nodes',
            zooming : 50    // mouse zoom - higher is more sensitive
        },
        Node :
        {
            overridable : true
        },
        Edge :
        {
            overridable : true,
            color : av_graph.edgeColor,
            lineWidth : av_graph.edgeWidth
        },
        Label :
        {
            overridable : true,
            type : 'Native',
            size : av_graph.labelSize,
            color : av_graph.labelColor
        },
        Tips :
        {
            enable : true,
            onShow : function(tip, node)
            {
                tip.innerHTML = "<div class=\"tip-title\"><b>Handle: </b>" + node.id +
                    "</div>" + "<div class=\"tip-text\"><b>Type: </b>" + node.data.atom.type  + "</div>";
            }
        },
        Events :
        {
            enable : true,
            type : 'Native',

            // Change cursor style when hovering a node:
            onMouseEnter : function()
            {
            	DeselectOnMouseDrag();
                av_graph.fdGraph.canvas.getElement().style.cursor = 'move';
            },
            onMouseLeave : function()
            {
            	RemoveDisableSelection();
                av_graph.fdGraph.canvas.getElement().style.cursor = '';
            },

            // Update node positions when dragged:
            onDragMove : function(node, eventInfo, e)
            {
            	DeselectOnMouseDrag();
                var pos = eventInfo.getPos();
                node.pos.setc(pos.x, pos.y);
                av_graph.fdGraph.plot();
            },

            // Implement the same handler for touchscreens:
            onTouchMove : function(node, eventInfo, e)
            {
            	DeselectOnMouseDrag();
                $jit.util.event.stop(e);

                // stop default touchmove event
                this.onDragMove(node, eventInfo, e);
            },

            // Add a click handler to nodes:
            onClick : function(node)
            {
                if (node)
                {
                    // Show details of selected atom:
                    DeselectOnMouseDrag();
                    showSelectedAtom(node);
                    
                }
            }
        },
        iterations : 50,
        levelDistance : 30     // Edge length
    });

    // Load the graph data and draw it:
    av_graph.fdGraph.loadJSON(generateGraphJSON());
    av.DOM.byId("idGraphStatus").hidden = false;
    av_graph.fdGraph.computeIncremental(
    {
        iter : 5,
        property : 'end',
        onStep : function(perc)
        {
            var msg = "Building graph: %" + perc.toString();
            av.DOM.byId("idGraphStatus").innerHTML = "<h2>" + msg + "</h2>";
        },
        onComplete : function()
        {
            av.DOM.byId("idGraphStatus").innerHTML = "";
            av.DOM.byId("idGraphStatus").hidden = true; // IMPORTANT - must hide this when done
            av_graph.fdGraph.animate(
            {
                modes : ['linear'],
                transition : $jit.Trans.linear,
                duration : 750
            });
            
            // Warn the user here if atoms retrieved exceeds the limit:
            var atom_total = av.atom_data.length;
            if (atom_total > MAX_GRAPH_NODES)
            {
                var msg = "The number of atoms exceeds the limit for graphing - " +
                        "showing only " + MAX_GRAPH_NODES.toString() +
                        " of " + atom_total.toString() + " total atoms. Please " +
                        "apply filters to restrict the atoms in view.";
                alert(msg);
            }
        }
    }); 
}


/*
 * This function converts our atom data into a JSON structure formatted for
 * the Jit graph library.
 */
function generateGraphJSON()
{
    var graph_json = new Array();
    
    var node_limit = av.atom_data.length;
    if (node_limit > MAX_GRAPH_NODES)
    {
        // Must cap the number of nodes so Jit graph doesn't crash:
        node_limit = MAX_GRAPH_NODES;
        
        // TODO: a better idea is to change to a different graph type that can
        // show all the nodes as points or something (like a galaxy of stars).
    }
    
    for (var i = 0; i < node_limit; i++)
    {
        var graph_node =
        {
            "id" : av.atom_data[i].handle,
            "name" : getNodeLabel(av.atom_data[i]),
            "adjacencies" : getAdjacencies(av.atom_data[i]),
            data : 
            {
                "$color" : getNodeColor(av.atom_data[i]),
                "$type" : getNodeShape(av.atom_data[i]),
                "$dim" : getNodeSize(av.atom_data[i]),
                "atom" : av.atom_data[i]
            }
        };
        
        graph_json.push(graph_node);
    }
	console.log("Jit implemntation",graph_json);
    return graph_json;
}


function generateGraphJSONForD3()
{
    var graph_json = new Array();
    
    var node_limit = av.atom_data.length;
    if (node_limit > MAX_GRAPH_NODES)
    {
        // Must cap the number of nodes so Jit graph doesn't crash:
        node_limit = MAX_GRAPH_NODES;
        
        // TODO: a better idea is to change to a different graph type that can
        // show all the nodes as points or something (like a galaxy of stars).
    }
    
    for (var i = 0; i < node_limit; i++)
    {
        var graph_node =av.atom_data[i];
        graph_json.push(graph_node);
    }

    return graph_json;
}

/*
 * Helper function to construct the array of adjacent graph nodes, based
 * on the given atom's outgoing connections.
 * 
 * @param atom - the given atom object
 */
function getAdjacencies(atom)
{
    var adj = new Array();
    
    for (var i = 0; i < atom.outgoing.length; i++)
    {
        var adj_obj =
        {
            "nodeTo" : atom.outgoing[i]
            // a "data" object could be added here for overriding default edge properties
        };
        
        adj.push(adj_obj);
    }
    
    return adj;
}

/*
 * Helper function to get the label for the graph node.
 * 
 * @param atom - the given atom object
 */
function getNodeLabel(atom)
{
    // For Node atoms, the label is the name; for Link atoms, use the
    // type.
    var node_label = atom.name;
    if (node_label == "")
    {
        node_label = atom.type;
    }
    
    return node_label;
}

/*
 * Helper function to determine size of the graph node.
 * 
 * @param atom - the given atom object
 */
function getNodeSize(atom)
{
    // Make the graph node for Link atoms smaller
    var node_size = av_graph.nodeSize;
    if (atom.name == "")
    {
        node_size -= 3;
    }
    
    return node_size;
}

/*
 * Helper function for determining the shape of the graph node. For "Link"
 * type atoms, we draw a triangle, and for "Node" type atoms, a circle.
 * 
 * @param atom - the given atom object
 */
function getNodeShape(atom)
{
    var node_shape = "triangle";
    
    // TODO: For lack of a better way to determine if an atom is a Link or a Node,
    // we'll assume if it has a name, it's a Node. We should revisit this at some
    // point to see if this is reliable (i.e. confirm if Node atoms always have
    // names and Link atoms never have a name).   
    if (atom.name != "")
    {
        node_shape = "circle"; 
    }
    
    return node_shape;
}

/*
 * Helper function to determine the color of the graph node, based on
 * importance and type of the atom.
 * 
 * @param atom - the given atom object
 */
function getNodeColor(atom)
{
    var node_color = "#8354ff";
    
    // See comments for getNodeShape() for why we use the name to determine type.
    if (atom.name != "")
    {
        // TODO: maybe use a gradient or other method for setting the color,
        // depending on values of the atom, such as STI.
        node_color = "#00ef00";
    }
    
    return node_color;
}

/*
 * Helper function to show the selected atom in the graph. The graph node
 * is emphasized and the atom details are displayed in the detail pane.
 * Selecting the same node twice de-selects it.
 * 
 * @param graph_node - the given Jit graph node object
 */
function showSelectedAtom(graph_node)
{
    if (av_graph.selectedNode != null)
    {
        // "de-select" previously selected node:
        av_graph.selectedNode.data.$dim -= 3;
    }
    
    if (graph_node == av_graph.selectedNode)
    {
        // Same node selected twice, so just de-select
        av_graph.selectedNode = null;
        resetAtomDetails();
    }
    else
    {
        av_graph.selectedNode = graph_node;
        graph_node.data.$dim += 3;
        
        // Fill in atom details pane:
        var atom = graph_node.data.atom;
        av.DOM.byId("idAtomName").value = atom.name;
        av.DOM.byId("idAtomType").value = atom.type;
        av.DOM.byId("idAtomHandle").value = atom.handle;
        av.DOM.byId("idAvLTI").value = atom.attentionvalue.lti;
        av.DOM.byId("idAvSTI").value = atom.attentionvalue.sti;
        av.DOM.byId("idAvVLTI").value = atom.attentionvalue.vlti;
        av.DOM.byId("idTvCount").value = atom.truthvalue.details.count;
        av.DOM.byId("idTvConfidence").value = atom.truthvalue.details.confidence;
        av.DOM.byId("idTvStrength").value = atom.truthvalue.details.strength;
    }

    av_graph.fdGraph.plot();
}
