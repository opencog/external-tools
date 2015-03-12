function updateD3Graph()
{

}
function createD3GraphView (data)
{

    var width = 960,
        height = 500;

    var color = d3.scale.category10();

   

    var force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .charge(-400)
        .linkDistance(120)
        .size([width, height])
        .on("tick", tick);

    var svg = d3.select("#screen-d3").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id","visualizerInner");

    var node = svg.selectAll(".node"),
        link = svg.selectAll(".link");

    function start() {
      link = link.data(force.links(), function(d) { return d.source.id + "-" + d.target.id; });
      link.enter().insert("line", ".node").attr("class", "link");
      link.exit().remove();

      node = node.data(force.nodes(), function(d) { return d.id;});
      node.enter().append("circle").attr("class", ".node").attr("r", 8);
      node.exit().remove();

      force.start();
    }

    function tick() {
      node.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; })

      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
    }

    var a = nodes[0], b = {id: "b"}, c = nodes[1];
  nodes.push(b);
  links.push({source: a, target: b}, {source: b, target: c});
  start();


}