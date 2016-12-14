angular.module('impression.attentionFactory', ['ngResource'])

.factory('AttentionFactory', function ($http, $resource, $interval, $location, openpsiVariables) {

    var attentionFactory = {};

    // Data members
    attentionFactory.server = "";
    attentionFactory.attention = {};

    attentionFactory._timer = null;

    attentionFactory.connected = false;
    attentionFactory.successCB = null

    // Member functions
    attentionFactory.startPeriodicUpdate = function(period) {
      if (period>0) {
        attentionFactory._timer = $interval(function() {
          attentionFactory.updateAttention();
        }, period);       
      }
    };

    attentionFactory.stopPeriodicUpdate = function() {
      attentionFactory.connected = false;
      $interval.cancel(attentionFactory._timer);
    };

    attentionFactory.connectionFailed = function() {
        attentionFactory.stopPeriodicUpdate();
        $location.path("/");
    };


    attentionFactory.updateAttention = function () {
        
        var vars = ""

        for (i in Object.keys(openpsiVariables)) {
            vars += "\"" + Object.keys(openpsiVariables)[i] + "\"";
        }

        var scm = "(psi-get-number-values-for-vars" + vars + ")";

       $http({
            method: 'POST',
            url: attentionFactory.server + "api/v1.1/scheme",
            cache: false,
            headers: {
              'Content-Type': 'application/json'
            },
            data: {command: scm}
        }).then(
            function (response) {
                attentionFactory.connected = true;
                attentionFactory.attention = JSON.parse(response.data.response);
                console.log("🎢 updated attention...")

                if (typeof attentionFactory.successCB === "function") attentionFactory.successCB();
                attentionFactory.successCB = null;
            },
            function (error) {
                connectionFailed()
            }
        );
    };

    return attentionFactory;
})