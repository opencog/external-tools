var width =  1500,
    height = 1000

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(.05)
    .distance(60)
    .charge(-300)
    .size([width, height]);

var links=[];
d3.json("atomspace.json", function(error, json) {
var index=0;

//with out InheritanceLink 
/*
for(var n=0;n<json.nodes.length;n++){
	//document.write("in json loop"+json.nodes[n].handle);
	if(json.nodes[n].outgoing.length >0){
	//document.write("json.nodes[n].outgoing >0");
		for(var outindex=0;outindex<json.nodes[n].outgoing.length;outindex+=2){
		//document.write("json.nodes[n].outgoing >0 in the loop");
		var templink={};			
			for(var i=0;i<json.nodes.length;i++ ){
			//document.write("all json nodes in the loop");
			var localnode={};
			localnode=json.nodes[i];
			//document.write(localnode.handle);
			if(json.nodes[i].handle==json.nodes[n].outgoing[outindex]){
				//document.write("handle equal with outgoing value");
				templink["source"]=i;
				//document.write(i);
			}
			if(json.nodes[i].handle==json.nodes[n].outgoing[outindex+1]){
				//document.write("handle equal with outgoing value");
				templink["target"]=i;
				//document.write(i);
			}
			}
		links[index]=templink;
		//document.write("source"+links[index].source);
		//document.write("target"+links[index].target);
		index++;
		}
	}
}
*/

//with InheritanceLink 
for(var n=0;n<json.nodes.length;n++){
	if(json.nodes[n].outgoing.length >0){
		for(var outindex=0;outindex<json.nodes[n].outgoing.length;outindex++){
		var templink={};
			templink["source"]=n;			
			for(var i=0;i<json.nodes.length;i++ ){
				if(json.nodes[i].handle==json.nodes[n].outgoing[outindex]){
					templink["target"]=i;
				}
			}
		links[index]=templink;
		index++;
		}
	}
}
/*
for(var t=2;t<20;t+=1){
var temp={};
temp["source"]=links[t].source;
temp["target"]=links[t+3].target;
links[index]=temp;
index++;
}
for(var t=2;t<20;t+=1){
var temp={};
temp["source"]=links[t].source;
temp["target"]=links[t+4].target;
links[index]=temp;
index++;
}
*/
return links;
});

d3.json("atomspace.json", function(error, json) {

force 
      .nodes(json.nodes)
      .links(links)
      .start();
      
  var link = svg.selectAll(".link")
      .data(links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(json.nodes)
      .enter().append("g")
      .attr("class", "node")
      .style("fill", function(d) { if (d.type=="InheritanceLink") {return "blue"}})
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("mousedown",mousedown)
      .call(force.drag);

  node.append("image")
      .attr("xlink:href", function(d){if(d.type=="InheritanceLink") return "treeangle.ico"; else return "shape_shadow.ico";})
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 16)
      .attr("height", 16);
     
  /*
  node.append("circle")
      .attr("r", function(d) { if (d.type=="InheritanceLink") {return 0;}else{return 8;}})
      .attr("fill", "green");
      //.style("fill", function(d) { if (d.type=="InheritanceLink") {return "blue"}});
 */ 

  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d){ if(d.type=="InheritanceLink") return d.type; else return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
	
  function mouseover() {
  /*
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 16);
  */
  d3.select(this).select("image").transition()
	.attr("width",25)
	.attr("height",25);
  }

  function mouseout() {
   /*
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 8);
   */
  d3.select(this).select("image").transition()
	.attr("width",16)
	.attr("height",16);
  }
  function mousedown(){
  d3.select(this).append("text")
      .attr("dx", 12)
      .attr("dy", "12")
      .text(function(d){ if(d.type=="InheritanceLink") return d.handle; else return d.handle; });
  }
});

// consol.log();
