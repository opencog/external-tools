angular.module('impression.attentionFactory', ['ngResource'])

/**********

VERY MUCH UNFINISHED

************/

.factory('AttentionFactory', function ($http, $resource, $interval, $location) {

    var attentionFactory = {};

    // Data members
    attentionFactory.server = "";
    attentionFactory.attention = {};

    attentionFactory.timer = null;
    attentionFactory.period = 0;

    attentionFactory.connected = false;

   // Member functions
  
    attentionFactory.updateAttention = function (successCB, failureCB) {
       $http({
            method: 'GET',
            url: atomsFactory.server + "api/v1.1/scheme", //TODO: this is a placeholder and will just work for test data, should fetch POST w. correct scm command.
            cache: false
        }).then(
            function (response) {
                atomsFactory.attention = response.data;
                console.log("[AF] updated attention...")
                if (typeof successCB === "function") successCB();
            },
            function (error) {
                if (typeof failureCB === "function") failureCB();
            }
        );
    };

    attentionFactory.startPeriodicUpdate = function(atomsPeriod, attentionPeriod) {
      attentionFactory.atomsPeriod = atomsPeriod;
      attentionFactory.attentionPeriod = attentionPeriod;
      
      attentionFactory.connected = true;

      if (attentionPeriod>0) {
        atomsFactory.interval = $interval(function() {
          atomsFactory.updateAttention(null, function() {atomsFactory.connectionFailed()});
        }, attentionPeriod);       
      }

    };

    attentionFactory.connectionFailed = function() {
        atomsFactory.stopPeriodicUpdate();
        $location.path("/");
    };

    atomsFactory.stopPeriodicUpdate = function() {
      atomsFactory.connected = false;

      $interval.cancel(atomsFactory.atomsTimer);
      $interval.cancel(atomsFactory.attentionTimer);
    };

    atomsFactory.setServer = function (s) {
        atomsFactory.server = s; 
    };




    return attentionFactory;
})