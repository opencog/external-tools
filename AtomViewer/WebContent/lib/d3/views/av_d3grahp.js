/*
 * av_d3graph.js
 *
 * This file contains the main application code, d3 graph drowing, etc.
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

function updateD3GraphView(json) {
	console.log(json);

	/* Set the color scale we want to use */
	var color = d3.scale.category20();
	//function return the radius of the circles

	var margin = {
		top : 20,
		right : 10,
		bottom : 20,
		left : 10
	};
	var w = 1200, h = 550, r = 6;

	var svg = d3.select("#idTestTab").append("svg").attr("width", w)//+ margin.left + margin.right)
	.attr("height", h);

	var links = [];
	var index = 0;

	// determing the source and destination of the the link
	for (var n = 0; n < json.length; n++) {
		if (json[n].outgoing.length > 0) {
			for (var outindex = 0; outindex < json[n].outgoing.length; outindex++) {
				var templink = {};

				for (var i = 0; i < json.length; i++) {
					if (json[i].handle == json[n].outgoing[outindex]) {
						templink["source"] = n;
						templink["target"] = i;
						links[index] = templink;
						break;
					}
				}

				index++;
			}
		}
	}
	console.log(links);
	//alert("linke lengeth"+links.length);

	var link_length = links.length;

	/*The charge between the node computed as the the product of height and width and
	*divided by the product distance between the node and number of links in the graph.
	*Doing this comptuations help us to use space provided efficiently
	*/
	//alert(link_length);
	var force = d3.layout.force().gravity(.1).distance(30).charge(function(d) {
		if (link_length == 0)
			return -100;
		else
			return (-1) * ((h * w) / (links.length * 50));
	}).size([w, h]);
	//([w, h]);

	force.nodes(json).links(links)
	//.on("tick",tick)
	.start();

	var linkedByIndex = {};
	links.forEach(function(d) {
		linkedByIndex[d.source.handle + "," + d.target.handle] = true;
	});
	console.log(linkedByIndex);

	var link = svg.selectAll(".link").data(links).enter().append("line").attr("class", "link").style("stroke-width", function(d) {
		return Math.sqrt(d.value);
	});

	var node = svg.selectAll(".node").data(force.nodes()).enter().append("g").attr("class", "node").on("mouseover", mouseover).on("mouseout", mouseout).call(force.drag);

	node.append("circle").style("fill", function(d, i) {
		return color(d.type);
	}).attr("r", node_radius);

	node.append("title").text(function(d) {
		if (d.name == "")
			return "handle: " + d.handle + "\n" + "type: " + d.type;
		else
			return "handle: " + d.handle + "\n" + "Name:" + d.name + "\n" + "type: " + d.type;
	});

	node.append("text")
	//.style("fill", "white")
	.attr("text-anchor", "middle").attr("dx", 0)//function(d){if(d.name=="") return -30; else return -12;})
	.attr("dy", ".35em").text(function(d) {
		if (d.name == "")
			return d.type;
		else
			return d.name;
	});

	force.on("tick", function() {

		node.attr("cx", function(d) {
			return d.x = Math.max(6, Math.min(w - 6, d.x));
		}).attr("cy", function(d) {
			return d.y = Math.max(6, Math.min(h - 6, d.y));
		});

		link.attr("x1", function(d) {
			return d.source.x;
		}).attr("y1", function(d) {
			return d.source.y;
		}).attr("x2", function(d) {
			return d.target.x;
		}).attr("y2", function(d) {
			return d.target.y;
		});

		//node.attr("cx", function (d) { return d.x;})
		//   .attr("cy", function (d) { return d.y;});

		node.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});

		//node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";

	});

	function isConnected(a, b) {
		return isConnectedAsSource(a, b) || a.handle == b.handle;
	}

	function isConnectedAsSource(a, b) {

		if (b.name == "") {
			for ( i = 0; i < b.outgoing.length; i++) {
				if (a.handle == b.outgoing[i])
					return true;
			}
		} else {
			for ( j = 0; j < b.incoming.length; j++) {
				if (a.handle == b.incoming[j])
					return true;
			}
		}
	}

	function isConnectedAsTarget(a, b) {
		return linkedByIndex[b.handle + "," + a.handle];
	}

	function isEqual(a, b) {
		return a.handle == b.handle;
	}

	function node_radius(d) {
		if (d.name == "")
			return 2.5;
		else
			return 10;
	}

	function mouseover(d) {

		d3.select(this).select("circle").transition().duration(500).attr("r", function(d) {
			return 1.4 * node_radius(d);
		});
		node.transition(500).style("opacity", function(o) {
			//console.log(d);
			return isConnected(o, d) ? 1.0 : 0.2;
		});

		link.transition(500).style("stroke-opacity", function(o) {
			return o.source === d || o.target === d ? 1 : 0.2;
		});
	}

	function mouseout() {
		d3.select(this).select("circle").transition().duration(750).attr("r", node_radius);
		//Put them back to opacity=1
		link.transition(500).style("stroke-opacity", 1);
		node.transition(500).style("opacity", 1);

	}

	function click(node) {
		console.log(node);
		showSelectedAtom(node);
	}

	function mousedown() {

		//alert(d.handle);
		d3.select(this).append("circle").attr("transform", "translate(" + d3.mouse(this) + ")").attr("r", 1e-6).style("fill", "none").style("stroke", "green").style("stroke-width", "5px").style("stroke-opacity", 1).transition().ease(Math.sqrt).duration(500).attr("r", 20).style("stroke-opacity", 0);

		//showSelectedAtom(this);
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

}