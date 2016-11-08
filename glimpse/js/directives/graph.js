angular.module('glimpse')
    .directive('graph', function ($http) {

  //Todo: These should be read from config or set through the app
  var psiVariables = ["arousal", "positive-valence", "negative-valence"];
  var numPlotLinePts = 10; //number of most recent values to plot
  var refreshRate = 1000;   // rate in ms that values are updated from server


  var link = function (scope, element, attributes, $parent, $scope) {
    scope.chartTypes = [
      {"id": "line", "title": "Line"},
      {"id": "spline", "title": "Smooth line"},
      {"id": "area", "title": "Area"},
      {"id": "areaspline", "title": "Smooth area"},
      {"id": "column", "title": "Column"},
      {"id": "bar", "title": "Bar"},
      {"id": "pie", "title": "Pie"},
      {"id": "scatter", "title": "Scatter"}
    ];

    scope.init = function () {
      scope.chartSeries = [];
  
      scope.chartConfig = {
        options: {
          chart: {
            type: 'spline'
          },
          plotOptions: {
            series: {
              stacking: ''
            }
          }
        },
        series: scope.chartSeries,
        title: {
          text: 'OpenPSI Variables'
        },
        xAxis: {
          labels: {
            enabled: false
          }
        },
        credits: {
          enabled: false
        },
        loading: false,
        size: {}
      };

      window.setInterval(function() {
        //periodically update data
        scope.update();
      }, refreshRate);

    };

    scope.update = function() {
  
      //TODO: endpoint URL should not be hardcoded but read from global config
      var endpointURL = "http://localhost:5000/api/v1.1/scheme";

      var vars = ""
      for (i in psiVariables) {
        vars += "\"" + psiVariables[i] + "\"";
      }
      //var scm = "(psi-get-number-values-for-vars \"arousal\" \"positive-valence\" \"negative-valence\")";
      var scm = "(psi-get-number-values-for-vars" + vars + ")";
      //console.log("scm command: " + scm);

      $http.post(endpointURL, {command: scm}, {headers: {'Content-Type': 'application/json'} }).then(function (response,status) {
        var responseString = response.data.response;
        console.log("\nresponseString: " + responseString);

        var results = JSON.parse(responseString);
        console.log("results: ");
        for (varname in results) {
          console.log("    " + varname + ": " + results[varname])
        }

        //iterate over each psi variable and feed into chartseries object
        for (varName in results) {
          var value = results[varName];

          //figure out if data point is already in chartSeries
          var variableExists = false;

          for (i in scope.chartSeries) {
            chartSeriesObject = scope.chartSeries[i];
            if (chartSeriesObject.name == varName) {
              //it already exists, update array
              //remove the first element and add current value to the end
              chartSeriesObject.data.shift();
              chartSeriesObject.data.push(value);
              variableExists = true;
            }
          }

          if (!variableExists) {
            //The variable doesn't exist in chartSeries yet, create new entry
            console.log("Found new variable: " + varName)
            // plot the full line at the current value for initiating
            var values = Array(numPlotLinePts).fill(value);
            scope.chartSeries.push({"name": varName, "data": values, connectNulls: true});
          }
        }

      }, function errorCallback(err) {
        console.log(err.message)        
      });

      //console.log("scope.chartSeries: " + scope.chartSeries);

    }  // update()

    //TODO: This executes as soon as glimpse loads, it should only load when graph is loaded / server is connected...
    scope.init();

  };

  return {
      link: link,
      restrict: 'E',
      scope: {atoms: '='},
      templateUrl: 'js/templates/graph.html'
  }
});