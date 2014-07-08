
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

function updateD3GraphView(json){
	console.log(json);
	
	var margin = {top: 20, right: 10, bottom: 20, left: 10};
	var w=1190 - margin.left - margin.right ,
		h=570- margin.top - margin.bottom ,
		r = 6;
               	
	var svg=d3.select("#idTestTab")
		.append("svg")
		.attr("width",10).attr("height",10);
		  
	svg
		.append("text")
		.text("D3 graph").attr("x",100).attr("y",100);
						
	var svg = d3.select("#idTestTab").append("svg")
    		    .attr("width", w + margin.left + margin.right)
   		        .attr("height", h + margin.top + margin.bottom);
	
	var links=[];
	var index=0;
						
	// determing the source and destination of the the link  
	for(var n=0;n<json.length;n++){
		if(json[n].outgoing.length >0){
			for(var outindex=0;outindex<json[n].outgoing.length;outindex++){
				var templink={};
							
				for(var i=0;i<json.length;i++ ){
					if(json[i].handle==json[n].outgoing[outindex]){
						templink["source"]=n;
						templink["target"]=i;
						links[index]=templink;
						break;
					}
				}
				
				index++;
			}
		}
	}
	
	//alert("linke lengeth"+links.length); 
	
	var link_length=links.length;
	
	/*The gravity between the node computed as the the product of height and width and  
	 *divided by the product distance between the node and number of links in the graph. 
	 *Doing this comptuations help us to use space provided efficiently
	 */
	alert(link_length);
	var force = d3.layout.force()
   		.gravity(.05)
    		.distance(45)
    		.charge(function(d){ if(link_length==0)return -100; else  return (-1)*((h*w)/(links.length*50));})
    		.size([w, h]);
    		
	force 
     	 .nodes(json)
      	 .links(links)
      	 .start();
      
  	var link = svg.selectAll(".link")
      		.data(links)
      		.enter().append("line")
      		.attr("class", "link")
      		.style("stroke-width", function(d) { return Math.sqrt(d.value); });

  	var node = svg.selectAll(".node")
      		.data(json)
      		.enter().append("g")
      		.attr("class", "node")
      		.on("mouseover", mouseover)
      		.on("mouseout", mouseout)
      		.on("mousedown",mousedown)
      		.on("click",click)
      		.call(force.drag);
      		
      		
  //representing the node and Like using images
  
  node.append("image")
      .attr("xlink:href", function(d){if(d.name=="") return "lib/d3/images/square-outline-16.ico"; else return "lib/d3/images/circle-32.ico";})
      .attr("x", function(d){if(d.name=="") return -4; else return -8;})
      .attr("y", function(d){if(d.name=="") return -4; else return -8;})
      .attr("width", function(d){if(d.name=="") return 10; else return 15;})
      .attr("height",function(d){if(d.name=="") return 10; else return 15;});
   
 node.append("title")
      .text(function(d) {if(d.name=="") return "handle: " + d.handle + "\n" + "type: "+d.type; else return "handle: "+ d.handle + "\n" +"Name:"+d.name+"\n"+"type: "+ d.type ; });
 
 node.append("text")
 	  .attr("text-anchor", "middle")
      .attr("dx", 0)//function(d){if(d.name=="") return -30; else return -12;})
      .attr("dy",".35em")
      .text(function(d){ if(d.name=="") return d.type; else return d.name; });

  force.on("tick", function() {
  	node.attr("cx", function(d) { return d.x = Math.max(r, Math.min(w - r, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(r, Math.min(h - r, d.y)); });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    
    });
   
//onmose over effect function called from OnMouseOver.js file 
//mouseover();
function mouseout() {

d3.select(this).select("image").transition()
	.attr("x", function(d){if(d.name=="") return -4; else return -8;})
    .attr("y", function(d){if(d.name=="") return -4; else return -8;})
	.attr("width",function(d){if(d.name=="") return 10; else return 15;})
	.attr("height",function(d){if(d.name=="") return 10; else return 15;});
	
d3.select(this).select("text")
     .attr("fill", "black")
     .attr("font-size",12);

}

//on mouse out effect functio called from OnMouseOut.js file
//mouseout();

function mouseover() {

d3.select(this).select("image").transition()
    .attr("x", -8)
    .attr("y", -8)
	.attr("width",25)
	.attr("height",25);
	
d3.select(this).select("text")
    .attr("fill", "steelblue")
    .attr("font-size", 15);
}

function click(node){
	console.log(node);
	showSelectedAtom(node);
}

function mousedown() {
	
  //alert(d.handle);
  d3.select(this).append("circle")
      .attr("transform", "translate(" + d3.mouse(this) + ")")
      .attr("r", 1e-6)
      .style("fill", "none")
      .style("stroke","green")
      .style("stroke-width", "5px")
      .style("stroke-opacity", 1)
    .transition()
      .ease(Math.sqrt)
      .duration(500)
      .attr("r", 20)
      .style("stroke-opacity", 0);
      
     
     //showSelectedAtom(this); 
}


function showSelectedAtom(graph_node)
{
    
    //if (av_graph.selectedNode != null)
    //{
        // "de-select" previously selected node:
    //    av_graph.selectedNode.data.$dim -= 3;
   // }
    
    //if (graph_node == av_graph.selectedNode)
    //{
        // Same node selected twice, so just de-select
     //   av_graph.selectedNode = null;
     //   resetAtomDetails();
    //}
   // else
   // {
        //av_graph.selectedNode = graph_node;
        //graph_node.data.$dim += 3;
        
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
    //}

    //av_graph.fdGraph.plot();
}

}
