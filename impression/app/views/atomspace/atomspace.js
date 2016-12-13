'use strict';

angular.module('impression.atomspaceView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/atomspace', {
        templateUrl: 'views/atomspace/atomspace.html',
        controller: 'AtomspaceCtrl'
    });
}])

.controller('AtomspaceCtrl', function($scope, $interval, $routeParams, $http, $location, AtomsFactory) {

    $scope.$on('$destroy', function() {
        $interval.cancel(stop);
        stop = undefined;
        simulation.stop();
        chart.remove();
        AtomsFactory.pollSettings = { 'filterby': 'attentionalfocus', 'includeIncoming': 'true', 'includeOutgoing': 'true' }
        //AtomsFactory.stopPeriodicUpdate() // TODO: this could happen here, but we do cleanup
    });

    //stuff for options:
    $scope.pollSettings = {
      "filterby": "attentionalfocus",
      "stimin": 1,
      "stimax": 40,
      "includeIncoming": true,
      "includeOutgoing": true 
    }

    $scope.$watch('pollSettings', function(newValue) {
      console.log("🎑 new filter")
      AtomsFactory.pollSettings = newValue
      AtomsFactory.updateAtoms()
    }, true);

    //bounce back to connect screen if disconnected.
    if(!AtomsFactory.connected) { $location.path("/"); } else {

      //Initialize size for canvas drawing
      var width = document.getElementById("atomspace").clientWidth,
          height = document.getElementById("atomspace").clientHeight;
  
      //Dynamic Resize
      window.addEventListener("resize", function() {
          width = document.getElementById("atomspace").clientWidth;
          height = document.getElementById("atomspace").clientHeight;
          
          chart.attr("width", width).attr("height", height);
          
          simulation.force("center", d3.forceCenter(width / 2, height / 2))
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
        .force("link", d3.forceLink().id(function(d) { return d.id; }).strength(0.5))
        .force("collide",d3.forceCollide(function(d) { return getRadiusForAttentionValue(d)}).iterations(8) )
        .force('X', d3.forceX().strength(function(d) { return getCenterGravityStrengthForAttentionValue(d); }).x(width / 2))
        .force('Y', d3.forceY().strength(function(d) { return getCenterGravityStrengthForAttentionValue(d); }).y(height / 2))
        .on("tick", ticked);
  
      simulation.alphaTarget(0.1)

      function getRadiusForAttentionValue(d) { 
        if (d.isNode) { 
          return d.attentionvalue.sti*0.0095 + 9; 
        } else { 
          return 1; 
        }
      };

      function getCenterGravityStrengthForAttentionValue(d) { 
        if(d.isNode) 
          return d.attentionvalue.sti * 0.00025; 
        else 
          return 0; 
      }; 
  
      var atoms = {};
  
      update()
      AtomsFactory.modificationCB = update;

      AtomsFactory.warningCB = function(msg) {
        $scope.warning = msg
      };

      function update() {
          console.log("🎑 update called");
          $scope.warning = null
          
          var nodes = Object.values(AtomsFactory.nodes)
          var links = AtomsFactory.links
  
          nodeBinding = dataContainer.selectAll("custom.circle").data(nodes, function(d) { return d.id;});
          linkBinding = dataContainer.selectAll("custom.line").data(links, function(d) { return d.source.id + "-" + d.target.id; });
  
          linkBinding.exit().remove();
  
          var linkEnter = linkBinding.enter()
            .append("custom")
              .classed("line", true);
            
          linkBinding = linkEnter.merge(linkBinding)
          
          nodeBinding.exit().remove();
  
          var nodeEnter = nodeBinding.enter()
            .append("custom")
              .attr("isNode", function(d) { return d.isNode; } )
              .classed("circle", true)
  
          nodeEnter.append("text")
              .text(function(d) { return d.name.split("@")[0]; });
            
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
          
          context.strokeStyle = "rgba(0,0,0,0.4)";
          context.lineWidth = 0.15;
          context.globalCompositeOperation = "source-over";
          
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
              context.globalCompositeOperation = "screen";

              context.arc(node.attr("x"), node.attr("y"), node.attr("radius"), 0, 2*Math.PI, false);
  

              //TODO: here we should use an external json as stylesheet substitute


              if (d.isNode) {
                /*if (node.attr("sti")>0) {
                  //context.fillStyle = "rgba(255,255,255,"+node.attr("sti")*0.00032+")";
                  context.fillStyle = "rgb(255,255,255)";
                } else {
                  //context.fillStyle = "rgba(255,255,255,0.3)";
                  context.fillStyle = "rgb(200,200,240)";
                }*/

                //var alpha = 0.5 + (node.attr("sti")*0.32)

                     if (d.type == "WordNode")                      context.fillStyle = "rgb(255,252,247)";
                else if (d.type == "WordInstanceNode")              context.fillStyle = "rgb(255,252,247)";
                else if (d.type == "ConceptNode")                   context.fillStyle = "rgb(120,68,74)";
                else if (d.type == "NumberNode")                    context.fillStyle = "rgba(62,66,58,0.5)";
                else context.fillStyle = "rgba(108,110,88,0.5)";

              } else {
                // it's a link, color it black
                context.fillStyle = "rgb(0,0,0)";
              }

              context.fill();
              context.closePath();
              
              context.font=node.attr("radius")/2.0+"px DosisLight";
              context.textAlign="center"; 
              context.textBaseline="middle"; 

              if (d.type == "WordNode" || d.type == "WordInstanceNode") {
                context.fillStyle = "rgb(0,0,0)";
                context.globalCompositeOperation = "darken";
              } else {
                context.fillStyle = "rgb(255,255,255)";
                context.globalCompositeOperation = "hard-light";                
              }


              if (d.isNode)
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
            .attr("sti", function(d) { return d.attentionvalue.sti; })
            .attr("radius", function(d) { return getRadiusForAttentionValue(d); })
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; });
  
        drawCanvas();
      }

    }
});