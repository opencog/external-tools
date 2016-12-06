'use strict';

angular.module('impression.atomspaceCanvasView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/atomspace-canvas', {
        templateUrl: 'views/atomspace-canvas/atomspace.html',
        controller: 'AtomspaceCanvasCtrl'
    });
}])

.controller('AtomspaceCanvasCtrl', function($scope, $interval, $routeParams, $http, $location, AtomsFactory, utils, simplifications) {

    //bounce back to connect screen if disconnected.
    if(!AtomsFactory.connected) { $location.path("/"); } else {

    //Initialize size for canvas drawing
    var width = document.getElementById("atomspace").clientWidth,
        height = document.getElementById("atomspace").clientHeight;

    //Dynamic Resize
    window.addEventListener("resize", function() {
        width = document.getElementById("atomspace").clientWidth;
        height = document.getElementById("atomspace").clientHeight;
        
        chart
            .attr("width", width)
            .attr("height", height);
        
        simulation
          .force("center", d3.forceCenter(width / 2, height / 2))
    });

    var transform = d3.zoomIdentity; //transform identity for pan/zoom
    var nodeBinding, linkBinding, simulation, nodeEnter, linkEnter;


    var base = d3.select("#atomspace");
    var chart = base.append("canvas")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom().scaleExtent([1 / 2, 8]).on("zoom", zoomed));
      
    var context = chart.node().getContext("2d");

    // Create an in memory only element for drawing
    var detachedContainer = document.createElement("custom");
    var dataContainer = d3.select(detachedContainer);

    
    

    function zoomed() {
        transform = d3.event.transform;
        drawCanvas();
    }

    simulation = d3.forceSimulation()
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("link", d3.forceLink().id(function(d) { return d.id; }).strength(0.2))
      .force("collide",d3.forceCollide(function(d) { return getRadiusForAttentionValue(d)}).iterations(8) )
      .force('X', d3.forceX().strength(function(d) { return getCenterGravityStrengthForAttentionValue(d); }).x(width / 2))
      .force('Y', d3.forceY().strength(function(d) { return getCenterGravityStrengthForAttentionValue(d); }).y(height / 2))
      .on("tick", ticked);

    function getRadiusForAttentionValue(d) { if (d.type.search("Node") > -1) { return d.attention_value.sti*2.5 + 3; } else { return d.attention_value.sti*0.5 + 3; }};
    function getCenterGravityStrengthForAttentionValue(d) { if(d.type.search("Node")>-1) return d.attention_value.sti * 0.05; else return 0; }; //TODO: use isNode here in d.

    var atoms = {};

    update();
    $interval(update, 2000);

    function update() {
        console.log("update called");
        
        var settings = {
          simplifications: {
                logical: true,
                evaluation: true
          }
        };

        atoms = utils.indexAtoms(AtomsFactory.atoms, atoms);
        atoms = simplifications.simplify(atoms, settings.simplifications);

///------------------------------------------------------------//
//This whole block is just horrible, replace by using filtered //
//Sort Atoms by sti                                            //
/*var _atoms = atoms;                                            //
var atomArray = [];                                            //
for(var key in _atoms) {                                       //
  atomArray.push(_atoms[key]);                                 //
}                                                              //
function sti_sort(a, b) {                                      //
    var x = a.attention_value.sti;                             //
    var y = a.attention_value.sti;                             //
                                                               //
    return x<y;                                                //
}                                                              //
var atomArray = atomArray.sort(sti_sort);                      //
                                                               //
var _atom_subset = {}                                          //
                                                               //
for (var i in atomArray.slice(1,200)) {                        //
  var atom = atomArray[i];                                     //
  for (var j in _atoms) {                                      //
    if (atom == _atoms[j]) {                                   //
      _atom_subset[j] = atom;                                  //
    }                                                          //
  }                                                            // 
}                                                              //
atoms = _atom_subset;        */                                //
///-----------------------------------------------------------///

        var graph = utils.atoms2Graph(atoms);

        var nodes = graph.nodes;
        var links = graph.edges;

        console.log("nodecount: " + nodes.length);

        nodeBinding = dataContainer.selectAll("custom.circle").data(nodes);
        linkBinding = dataContainer.selectAll("custom.line").data(links);

        linkBinding.exit().remove();

        var linkEnter = linkBinding.enter()
          .append("custom")
            .classed("line", true);
          
        linkBinding = linkEnter.merge(linkBinding)
        
        nodeBinding.exit().remove();

        var nodeEnter = nodeBinding.enter()
          .append("custom")
            .attr("isNode", function(d) { return d.type.search("Node"); })
            .classed("circle", true)

        nodeEnter.append("text")
            .text(function(d) { return d.data.name; });
          
        nodeBinding = nodeEnter.merge(nodeBinding);

        simulation.nodes(nodes)
        simulation.force("link").links(links);

        if (simulation.alpha()<0.002)
          simulation.alpha(0.4);

        simulation.restart();
    }

    function drawCanvas() {
        context.save();

        // clear canvas
        context.clearRect(0,0,width,height);
        context.translate(transform.x, transform.y);
        context.scale(transform.k, transform.k);
        
        var elements = dataContainer.selectAll("custom.line");
        
        context.strokeStyle = "rgba(0,0,0,0.2)";
        context.lineWidth = 0.3;
        
        elements.each(function(d) {
            var node = d3.select(this);
            
            context.beginPath();
            
            context.moveTo(node.attr("x1"), node.attr("y1"));
            context.lineTo(node.attr("x2"), node.attr("y2"));
            context.stroke();
            context.closePath();
        
        });
        
        
        
        var elements = dataContainer.selectAll("custom.circle");
        
            elements.each(function(d) {
            var node = d3.select(this);
            
            context.beginPath();
            
            context.arc(node.attr("x"), node.attr("y"), node.attr("radius"), 0, 2*Math.PI, false);
            
            if (node.attr("isNode") > -1)
              if (node.attr("sti")>0) {
                context.fillStyle = "rgba(255,255,255,"+node.attr("sti")/30+")";
              } else {
                context.fillStyle = "rgba(255,255,255,0.3)";
              }
            else 
              context.fillStyle = "rgba(0,0,0,0.5)";
            
            context.fill();
            context.closePath();
            
            context.font="10px DosisLight";
            context.textAlign="center"; 
            context.textBaseline="middle"; 
            context.fillStyle = "rgba(0,0,0,0.8)";
            
            if (node.attr("isNode") > -1)
              context.fillText(node.text(),node.attr("x"), node.attr("y"));
        
        });

        context.restore();
    }


    function ticked() {

      linkBinding
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      nodeBinding
          .attr("sti", function(d) { return d.attention_value.sti; })
          .attr("radius", function(d) { return getRadiusForAttentionValue(d); })
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; });

      drawCanvas();
    }

}
});