//VARIABLES
var r=8;
var first = true;
var selectedNode = null;
var force;

//DATA
var nodes = [
    { id:23 , name:"skoumas" , LTI:2, x:  100, dy: 200 },
    { id:34 , name:"kostas" , LTI:4,  x: 150 , fy: 250 },
    { id:54 , name:"vasilis" , LTI:1, x: 150 , fy: 250 },
    { id:34 , name:"misel" , LTI:7, x: 150 , fy: 250 },
    { id:54 , name:"obama" , LTI:8, x: 150 , fy: 250 },
    { id:32 , name:"xristos" , LTI:3, x: 150 , fy: 250 },
    { id:12 , name:"ben" , LTI:5, x: 150 , fy: 250 },
    { id:22 , name:"robot" , LTI:1, x: 150 , fy: 250 },
    { id:46 , name:"gino" , LTI:0, x: 150 , fy: 250 },
    { id:54 , name:"yu" , LTI:1,  x: 150 , fy: 250 }
];

var links = [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 2 },
    { source: 4, target: 2 },
    { source: 2, target: 5 },
    { source: 1, target: 5 },
    { source: 7, target: 2 },
    { source: 5, target: 2 },
    { source: 9, target: 1 },
    { source: 6, target: 7 },
    { source: 8, target: 2 }
];

function loadVisual(data)
{


svg = d3.select('#screen-d3')
	.append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr("id","visualizerInner");

force = d3.layout.force()
    .size([width, height])
    .nodes(nodes)
    .links(links)
    .on("tick", tick)
    .linkStrength(0.1)
    .friction(0.9)
    .linkDistance(200)
    .charge(-200)
    .gravity(0.1);

var drag = force.drag()
	.on("dragstart", dragstart);

var link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr('class', 'link');

var node = svg.selectAll('.node')
    .data(nodes)
    .enter().append('circle')
    .attr('class', 'node')
    .attr("r", r)
    .attr("index",function(d,i){return i;})
    .call(force.drag) 
	.on("mousedown", function(d,i) { nodeClick(d,i); })

function dblclick(d) {
		//d3.select(this).classed("fixed", d.fixed = false);
}

function dragstart(d) {
		//d3.select(this).classed("fixed", d.fixed = true);
}

function tick()
{

	if (selectedNode!=null)
	{
		//d3.select(selectedNode).classed("hover");
	}

	node.attr("cx", function(d) 
	{
		return d.x = Math.max(r, Math.min(width - r, d.x));
	})
	.attr("cy", function(d) 
	{
		return d.y = Math.max(r, Math.min(height - r, d.y));
	});

	link.attr("x1", function(d) { return d.source.x; })
	    .attr("y1", function(d) { return d.source.y; })
	    .attr("x2", function(d) { return d.target.x; })
	    .attr("y2", function(d) { return d.target.y; });
}

function nodeClick(d,i)
{
	showDetailAtom(d);
	selectedNode = i;
}

function showDetailAtom(atom)
{
	$("#detailsAtomHandle").val(atom.id);
	$("#detailsAtomName").val(atom.name);
	$("#detailsAtomLTI").val(atom.LTI);
}

force.start();
drawedd3 = true;
}