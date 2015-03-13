/*
 * av_d3graph.js
 *
 * This file contains the main application code, d3 graph drawing, etc.
 *
 * Copyright (C) 2013, 2014 OpenCog Foundation
 * All Rights Reserved
 *
 * Written by Tsega Endashaw <tsegshi2003@gmail.com>
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
 * This function use force directed layout and take json input which is generated from the atom Space
 * d3 forced layout graph two thing as an input one set of nodes and set of links
 * JSON contain only the nodes of several type
 * The link is generated here by traversing inside JSON object
 *
 */

var force;

function updateD3GraphView(json) {
	console.log(json);
	var gui;
	var links = [];
	var index = 0;
	
	// determing the source and destination of the the link
	for (var n = 0; n < json.length; n++) {
		//console.log(json[n]);
		if (json[n].outgoing.length > 0) {
			for (var outindex = 0; outindex < json[n].outgoing.length; outindex++) {
				var templink = {};
				
				for (var i = 0; i < json.length; i++) {
					if (json[i].handle == json[n].outgoing[outindex]) {
						templink["source"] = n;
						templink["target"] = i;
						links[index] = templink;
						index++;
						break;
					}
				}
				
			}
		}
		/*
		if (json[n].incoming.length > 0) {
			for (var inindex = 0; inindex < json[n].incoming.length; inindex++) {
				var templink = {};
				
				for (var i = 0; i < json.length; i++) {
					if (json[i].handle == json[n].ingoing[inindex]) {
						templink["source"] = n;
						templink["target"] = i;
						links[index] = templink;
						index++;
						break;
					}
				}
			}
		}
		*/
	}
	console.log(links);

	var link_length = links.length;

	var margin = {
		top : -5,
		right : -5,
		bottom : -5,
		left : -5
	};
	var width = getGraphWidth() - margin.left - margin.right, height = getGraphHeight() - margin.top - margin.bottom;

	var color = d3.scale.category20();
	var linkD = controls.linkDistance-10;
	force = d3.layout.force().charge(controls.charge).gravity(controls.gravity).linkDistance(controls.linkDistance).size([width + margin.left + margin.right, height + margin.top + margin.bottom]);

	var zoom = d3.behavior.zoom().scaleExtent([0.05, 5]);

	zoom.on("zoom", zoomed);

	var drag = d3.behavior.drag().origin(function(d) {
		return d;
	}).on("dragstart", dragstarted).on("drag", dragged).on("dragend", dragended);

	var svg = d3.select("#idTestTab").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.right + ")").call(zoom);

	var rect = svg.append("rect").attr("width", width).attr("height", height).style("fill", "none").style("pointer-events", "all");

	var container = svg.append("g");

	//d3.json('http://blt909.free.fr/wd/map2.json', function(error, graph) {

	force.nodes(json).links(links).start();

	var link = container.append("g").attr("class", "links").selectAll(".link").data(links).enter().append("line").attr("class", "link").style("stroke-width", function(d) {
		return Math.sqrt(d.value);
	});

	var node = container.append("g")
	//.attr("class", "nodes")
	.selectAll(".node").data(force.nodes()).enter().append("g").attr("class", "node").attr("cx", function(d) {
		return d.x;
	}).attr("cy", function(d) {
		return d.y;
	}).call(drag);

	/*node look gridiante */
	var grads = svg.append("defs").selectAll("radialGradient").data(force.nodes()).enter().append("radialGradient").attr("gradientUnits", "objectBoundingBox").attr("cx", 0).attr("cy", 0).attr("r", "100%").attr("id", function(d, i) {
		return "grad" + i;
	});

	grads.append("stop").attr("offset", "0%").style("stop-color", "white");

	grads.append("stop").attr("offset", "100%").style("stop-color", function(d, i) {
		return color(d.type);
	});

	node.append("circle").attr("r", node_radius)
	//.style("fill", "url(#nodeGradient)");
	.style("fill", function(d, i) {
		return "url(#grad" + i + ")";
	});
	//.style("fill", function(d, i){return color(d.type);});

	node.append("text").attr("text-anchor", "middle").attr("dx", 0).attr("dy", ".35em").text(function(d) {
		if (d.name == "")
			return d.type;
		else
			return d.name;
	})
	.filter(function(d){
			d.tw=this.getComputedTextLength();
			//console.log(function(d){if(d.name=="")return d.type; else return d.name;},d.tw,"",(Math.PI*10/2));
			return (Math.PI*linkD/2)<d.tw;
			})
	.each(function(d){
			     var proposedLabel;
				if(d.name=="") proposedLabel=d.type; else proposedLabel=d.name;
                var proposedLabelArray = proposedLabel.split('');
                while ((d.tw > (Math.PI*linkD/2) && proposedLabelArray.length)) {
                    // pull out 3 chars at a time to speed things up (one at a time is too slow)
                    proposedLabelArray.pop();proposedLabelArray.pop(); proposedLabelArray.pop();
                    if (proposedLabelArray.length===0) {
                        proposedLabel = "";
                    } else {
                        proposedLabel = proposedLabelArray.join('') + "..."; // manually truncate with ellipsis
                    }
                    d3.select(this).text(proposedLabel);
                    d.tw = this.getComputedTextLength();
                }
			});
	//.style("stroke","gray");
	node.append("title").text(function(d) {
		if (d.name == "")
			return "handle: " + d.handle + "\n" + "type: " + d.type;
		else
			return "handle: " + d.handle + "\n" + "Name:" + d.name + "\n" + "type: " + d.type;
	});

	force.on("tick", function() {
		link.attr("x1", function(d) {
			return d.source.x;
		}).attr("y1", function(d) {
			return d.source.y;
		}).attr("x2", function(d) {
			return d.target.x;
		}).attr("y2", function(d) {
			return d.target.y;
		});

		node.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
	});

	var connectedNode = [];
	var allNode;

	function arrycontain(obj) {
		var i = connectedNode.length;
		while (i--) {
			if (connectedNode[i] === obj) {
				return true;
			}
		}
		return false;
	}

	function getnode(handle) {
		for ( jnode = 0; jnode < json.length; jnode++)
			if (handle == json[jnode].handle)
				return json[jnode];
	}

	/*this function check wethr the nodes are connecte or not */
	function isConnected(a, b) {

		if (!arrycontain(a))
			connectedNode[connectedNode.length] = a;
	
		function recurse(node) {
			if (node.incoming.length > 0)
				node.incoming.forEach(function(entry) {
					//finde better way
					var currentNde = getnode(entry);
					if (!arrycontain(currentNde)) {
						connectedNode[connectedNode.length] = currentNde;
						recurse(currentNde);
					}
				});
			if (node.outgoing.length > 0)
				node.outgoing.forEach(function(entry) {
					//finde better way
					var currentNde = getnode(entry);
					if (!arrycontain(currentNde)) {
						connectedNode[connectedNode.length] = currentNde;
						recurse(currentNde);
					}
				});
			//return connectedNode;
		}

		recurse(a);

		if (!arrycontain(b))
			return false;
		else
			return true;
	}

	function node_radius(d) {
		if (d.name == "")
			return 2.5;
		else
			return 10;
	}


	node.on("mouseover", function(d) {
		
		node.classed("node-active", function(o) {
			thisOpacity = isConnected(d, o) ? true : false;
			this.setAttribute('fill-opacity', thisOpacity);
			return thisOpacity;
		});
		
		link.classed("link-active", function(o) {
			return o.source === d || o.target === d ? true : false;
		});
		
		d3.select(this).classed("node-active", true);
		d3.select(this).select("circle").transition().duration(750).attr("r", function(d) {
			if (d.name == "")
				return 5;
			else
				return 15;
		});

	}).on("mouseout", function(d) {

		node.classed("node-active", false);
		link.classed("link-active", false);
		d3.select(this).select("circle").transition().duration(750).attr("r", function(d) {
			if (d.name == "")
				return 2.5;
			else
				return 10;
		});
		connectedNode.splice(0, connectedNode.length);
	});

	//"dblclick.zoom"
	node.on("click", function(d) {
		d3.event.stopPropagation();
		var dcx = (width / 2 - d.x * zoom.scale());
		var dcy = (height / 2 - d.y * zoom.scale());
		zoom.translate([dcx, dcy]);
		container.transition().duration(750).attr("transform", "translate(" + dcx + "," + dcy + ")scale(" + zoom.scale() + ")");
		showSelectedAtom(d);
		
		 d3.select(this).select("circle")
		 .transition()
		 .duration(500)
		 .attr("r", function(d){ return 1.4 * node_radius(d);});
		 
		node.transition(5000).duration(1000).style("opacity", function(o) {
			//console.log(d);
			return isConnected(d, o) ? 1.0 : 1e-6;
		}).ease(Math.sqrt).attr("r", function(o) {
			return isConnected(d, o) ? node_radius(d) : 1;
		});

		link.transition(5000).duration(1000).style("stroke-opacity", function(o) {
			
			for ( j = 0; j < connectedNode.length; j++) {
				if (connectedNode[j].handle == o.source.handle)
					return 1.0;
				if (connectedNode[j].handle == o.target.handle)
					return 1.0;
			}
			return 1e-6;
		});
	});

	svg.on("click", function(d) {
		d3.select(this).select("circle").transition().duration(1000).attr("r", node_radius);
		//Put them back to opacity=1
		link.transition(5000).duration(1000).style("stroke-opacity", 1);
		node.transition(5000).duration(1000).style("opacity", 1);

		connectedNode.splice(0, connectedNode.length);
	});

	function dottype(d) {
		d.x = +d.x;
		d.y = +d.y;
		return d;
	}

	function zoomed() {
		container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	}

	function dragstarted(d) {
		d3.event.sourceEvent.stopPropagation();
		d3.select(this).classed("dragging", true);
		force.start();
	}

	function dragged(d) {

		d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);

	}

	function dragended(d) {

		d3.select(this).classed("dragging", false);
	}

	function showSelectedAtom(graph_node) {
		// Fill in atom details pane:
		var atom = graph_node;
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

	function getGraphWidth() {
		var activeTabID = (av.Registry.byId("idTabContainer")).selectedChildWidget.id;
		var graph_width = (av.DOM.byId(activeTabID)).clientWidth - 20;
		return graph_width;
	}

	function getGraphHeight() {
		var activeTabID = (av.Registry.byId("idTabContainer")).selectedChildWidget.id;
		var graph_height = (av.DOM.byId(activeTabID)).clientHeight - 20;
		return graph_height;
	}

}