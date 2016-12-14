'use strict';

angular.module('impression.atomspaceView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/atomspace', {
        templateUrl: 'views/atomspace/atomspace.html',
        controller: 'AtomspaceCtrl'
    });
}])

.controller('AtomspaceCtrl', function($scope, $interval, $routeParams, $http, $location, AtomsFactory, config, atomspaceStyle) {

    //stuff for options:
    $scope.pollSettings = AtomsFactory.pollSettings 

    $scope.$watch('pollSettings', function(newValue) {
      console.log("🎑 new filter")
      AtomsFactory.pollSettings = newValue
      AtomsFactory.updateAtoms()
    }, true);

    //bounce back to connect screen if disconnected.
    var connectionSucceeded = function() {

      $scope.$on('$destroy', function() {
        AtomsFactory.stopPeriodicUpdate()
        simulation.stop();
        simulation = null;
        chart.remove();
      });

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
  
      simulation.alphaTarget(config.simulationAlphaTarget)

      function getRadiusForAttentionValue(d) {

        function sigmoid(x,steepness,mid,max) {
            return max/(1+Math.pow(Math.E, -steepness*(x-mid)));
        }

        if (d.isNode) {
          var radius = sigmoid(d.attentionvalue.sti, 
                               config.atomspaceNodeScalingSteepness, 
                               config.atomspaceNodeScalingInputMidpoint, 
                               config.atomspaceNodeScalingOutputMaxpoint) + config.atomspaceNodeScalingMinimal
          return radius;
        } else { 
          return 1; 
        }
      };

      function getCenterGravityStrengthForAttentionValue(d) { 
        if(d.isNode) 
          return (d.attentionvalue.sti * config.atomspaceCenterGravityCoefficient) + config.atomspaceMinimalCenterGravity; 
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
          
          // default source-over composite operation
          context.globalCompositeOperation = "source-over";

          // clear canvas
          context.clearRect(0,0,width,height);
          context.translate(transform.x, transform.y);
          context.scale(transform.k, transform.k);
          

          // draw the edges
          var elements = dataContainer.selectAll("custom.line");
          
          context.strokeStyle = atomspaceStyle.LineColor;
          context.lineWidth = atomspaceStyle.LineWidth;
          
          elements.each(function(d) {
              var node = d3.select(this);
              
              context.beginPath();
              
              context.moveTo(node.attr("x1"), node.attr("y1"));
              context.lineTo(node.attr("x2"), node.attr("y2"));
              context.stroke();
              context.closePath();
          });
          

          // use screen composite operation for nodes
          context.globalCompositeOperation = "screen";

          // draw the nodes
          var elements = dataContainer.selectAll("custom.circle");
          
          elements.each(function(d) {
              var node = d3.select(this);
              
              context.beginPath();
              context.arc(node.attr("x"), node.attr("y"), node.attr("radius"), 0, 2 * Math.PI, false);

              if (d.isNode) {
                var nodeColor = atomspaceStyle.DefaultNodes.nodeColor
                var textColor = atomspaceStyle.DefaultNodes.textColor
              } else {
                var nodeColor = atomspaceStyle.DefaultLinks.nodeColor
                var textColor = atomspaceStyle.DefaultLinks.textColor
              }

              if (Object.keys(atomspaceStyle).includes(d.type)) {
                var nodeColor = atomspaceStyle[d.type].nodeColor
                var textColor = atomspaceStyle[d.type].textColor
              }

              context.fillStyle = nodeColor;
              context.fill();
              context.closePath();
              
              context.font = node.attr("radius")/2.0+"px "+atomspaceStyle.Font;
              context.fillStyle = textColor;
              context.textAlign="center"; 
              context.textBaseline="middle"; 
              context.globalCompositeOperation = "source-over";                

              if (d.isNode) {
                if (atomspaceStyle.DrawNodeText)
                  context.fillText(node.text(),node.attr("x"), node.attr("y"));
              } else {
                if (atomspaceStyle.DrawLinkText)
                  context.fillText(node.text(),node.attr("x"), node.attr("y"));
              }

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

    AtomsFactory.successCB = connectionSucceeded;
    AtomsFactory.startPeriodicUpdate(config.atomspaceRefreshrate);
});