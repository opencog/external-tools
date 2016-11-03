'use strict';
/////////////////

//////////TODO: update atoms dynamically (lift some code from glimpse for this)


angular.module('impression.atomspaceView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/atomspace', {
    templateUrl: 'views/atomspace/atomspace.html',
    controller: 'AtomspaceCtrl'
  });
}])

.controller('AtomspaceCtrl', function($scope, $routeParams, $http, $location, AtomsFactory, utils, simplifications) {

    //bounce back to connect screen if disconnected.
    if(!AtomsFactory.connected) { $location.path("/"); }

    var width = 1000,
        height = 1000;

    //console.log(AtomsFactory.atoms);

    var settings = {
        simplifications: {
            logical: true,
            evaluation: true
        }
    };

    var _atoms = utils.indexAtoms(AtomsFactory.atoms);
    _atoms = simplifications.simplify(_atoms, settings.simplifications);
    var graph = utils.atoms2Graph(_atoms);

    var i = 0;

    var transform = d3.zoomIdentity;

    var nodeSvg, linkSvg, simulation, nodeEnter, linkEnter ;

    var svg = d3.select("svg#atomspace")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom().scaleExtent([1 / 2, 8]).on("zoom", zoomed))
      .append("g")
        .attr("transform", "translate(40,0)");

    function zoomed() {
      svg.attr("transform", d3.event.transform);
    }

    simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

    update();

    function update() {
      var nodes = graph.nodes;
      var links = graph.edges;

    //console.log(nodes)
    //console.log(links)

      linkSvg = svg.selectAll(".link")
        .data(links, function(d) { return d.target.id; })

      linkSvg.exit().remove();

      var linkEnter = linkSvg.enter()
          .append("line")
          .attr("class", "link");
        
      linkSvg = linkEnter.merge(linkSvg)
      
      nodeSvg = svg.selectAll(".node")
        .data(nodes, function(d) { return d.id; })

      nodeSvg.exit().remove();

      var nodeEnter = nodeSvg.enter()
        .append("g")
          .attr("class", function(d) { return "node "+d.type; })
          .on("click", click)
          .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))

        nodeEnter.append("circle")
          .attr("r", function(d) { return d.attention_value.sti + 4; }  )
          .append("title")
            .text(function(d) { return d.data.name; })

        nodeEnter.append("text")
          .attr("dy", 3)
          .attr("x", function(d) { return d.children ? -8 : 8; })
          .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
          .text(function(d) { return d.data.name; });
        
      nodeSvg = nodeEnter.merge(nodeSvg);
      
        simulation
          .nodes(nodes)

        simulation.force("link")
          .links(links);

    }

    function ticked() {
      linkSvg
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      nodeSvg
          .attr("transform", function(d) { return "translate(" + d.x + ", " + d.y + ")"; });
    }

    function click (d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        update();
        simulation.restart();
        } else {
            d.children = d._children;
            d._children = null;
        update();
        simulation.restart();
        }
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()

      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function flatten (root) {
      // hierarchical data to flat data for force layout
      var nodes = [];
      function recurse(node) {
        if (node.children) node.children.forEach(recurse);
        if (!node.id) node.id = ++i;
        else ++i;
        nodes.push(node);
      }
      recurse(root);
      return nodes;
    }




});