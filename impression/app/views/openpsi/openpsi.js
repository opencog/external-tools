'use strict';

angular.module('impression.openpsiView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/openpsi', {
    templateUrl: 'views/openpsi/openpsi.html',
    controller: 'OpenpsiCtrl'
  });
}])

.controller('OpenpsiCtrl', function($scope, $routeParams, $http, $interval, $timeout) {

var makeGraphInContainer = function(containername) {
    var container = document.getElementById(containername);

    var n = 40,
        random = d3.randomNormal(10, .2),
        data = d3.range(n).map(random);
    var svg = d3.select("#"+containername),
        margin = {top: 30, right: 0, bottom: 30, left: 50},
        width = +container.clientWidth - margin.left - margin.right,
        height = +container.clientHeight - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleLinear()
        .domain([1, n - 2])
        .range([0, width]);
    var y = d3.scaleLinear()
        .domain([0, 1])
        .range([height, 0]);
    var line = d3.line()
    .curve(d3.curveCatmullRomOpen)
        .x(function(d, i) { return x(i); })
        .y(function(d, i) { return y(d); });
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
                .append("text")
          .attr("fill", "white")
          .attr("dy", container.clientHeight-140+"px")
          .attr("dx", container.clientWidth-70+"px")
          .attr("class", "containerlabel")
          .text(containername);
    g.append("g")
        .attr("clip-path", "url(#clip)")
      .append("path")
        .datum(data)
        .attr("class", "line")
      .transition()
        .duration(250)
        .ease(d3.easeLinear)
        .on("start", tick);
    function tick() {
      // Push a new data point onto the back.
      data.push(Math.random()/10);
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

$timeout(function() {
    makeGraphInContainer("anger")
    makeGraphInContainer("compassion")
    makeGraphInContainer("sadness")

},100);

});


