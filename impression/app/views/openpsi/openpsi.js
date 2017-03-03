'use strict';

angular.module('impression.openpsiView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/openpsi', {
    templateUrl: 'views/openpsi/openpsi.html',
    controller: 'OpenpsiCtrl'
  });
}])

.controller('OpenpsiCtrl', function($scope, $routeParams, $http, $interval, $location, AttentionFactory, AtomsFactory, $timeout, config, openpsiVariables) {

    //bounce back to connect screen if disconnected.
    if(!AtomsFactory.connected) { $location.path("/"); }

    //fetch psi variables from config to our scope
    $scope.psiVariables = openpsiVariables

    var makeGraphInContainer = function(containername) {
        var container = document.getElementById(containername);

        if (!container) return;
    
        var n = 40,
            random = d3.randomNormal(0, 0),
            data = d3.range(n).map(random);
        var svg = d3.select("#"+containername),
            margin = {top: 18, right: 0, bottom: -1, left: 0},
            width = +container.clientWidth - margin.left - margin.right,
            height = +container.clientHeight - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleLinear()
            .domain([1, n - 2])
            .range([0, width]);

        var y = d3.scaleLinear()
            .domain([0, 1])
            .range([height, 0]);

        var line = d3.area()
        .curve(d3.curveCatmullRomOpen)
            .x(function(d, i) { return x(i); })
            .y1(function(d, i) { return y(d); })
            .y0(function(d, i) { return height; });

        g.append("defs").append("clipPath")
            .attr("id", "clip")
          .append("rect")
            .attr("width", width)
            .attr("height", height);
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + y(0) + ")")
            .call(d3.axisBottom(x));
    
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))
        g.append("g")
            .attr("clip-path", "url(#clip)")
          .append("path")
            .datum(data)
            .attr("class", "area")
          .transition()
            .duration(config.openpsiRefreshrate)
            .ease(d3.easeLinear)
            .on("start", tick);

        function tick() {
          // Push a new data point onto the back.
          if (containername == "voicewidth") containername = "voice width"
          data.push(AttentionFactory.attention[containername]);
          // Redraw the line.
          d3.select(this)
              .attr("d", line)
              .attr("transform", null);
          // Slide it to the left.
          d3.active(this)
              .attr("transform", "translate(" + x(0) + ",0)")
            .transition()
              .on("start", tick);
          // Pop the old data point off the front.
          data.shift();
        }
    }

    AttentionFactory.successCB = function() {
        var keys = Object.keys(AttentionFactory.attention)
        for (var i = 0; i < keys.length; i++) {
          makeGraphInContainer(keys[i].replace(" ", ""));
        }
    }
    
    AttentionFactory.startPeriodicUpdate(config.openpsiRefreshrate)

    $scope.$on('$destroy', function() {
        d3.selectAll('*').transition();
        AttentionFactory.stopPeriodicUpdate()
    });

});


