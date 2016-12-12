angular.module('impression.attentionFactory', ['ngResource'])

.factory('AttentionFactory', function ($http, $resource, $interval, $location) {

    var attentionFactory = {};

    // Data members
    attentionFactory.server = "";
    attentionFactory.attention = {};

    attentionFactory._timer = null;

    attentionFactory.connected = false;
    attentionFactory.updateCB = null

    attentionFactory.psiVariables = ["arousal", "positive-valence", "negative-valence", "power","voice width"];


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

        for (i in attentionFactory.psiVariables) {
            vars += "\"" + attentionFactory.psiVariables[i] + "\"";
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
                attentionFactory.attention = response.data;
                console.log("[AF] updated attention...")
                if (typeof attentionFactory.updateCB === "function") attentionFactory.updateCB();
            },
            function (error) {
                connectionFailed()
            }
        );
    };

    return attentionFactory;
})