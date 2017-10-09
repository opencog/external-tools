angular.module('glimpse')
  .factory('AttentionFactory', function ($http, $resource, $interval, $location, AtomsFactory) {

    var attentionFactory = {};

    // Values for psi Variables
    attentionFactory.psiValues = {};
    
    //TODO: These should be read from config or set through the app
    attentionFactory.psiVariables = ["arousal", "positive-valence", "negative-valence",
        "power","voice width"];


    attentionFactory.updatePsiValues = function (successCB, errorCB) {
      
        if (!AtomsFactory.connected) {
          //if the AtomsFactory is not connected, fail silently
          if (typeof errorCB === "function") {
            AttentionFactory(err)
          }
          
          return;
        }

        var endpointURL = AtomsFactory.server +"api/v1.1/scheme";

        var vars = ""
        for (i in attentionFactory.psiVariables) {
            vars += "\"" + attentionFactory.psiVariables[i] + "\"";
        }

        var scm = "(psi-get-number-values-for-vars" + vars + ")";


        $http.post(endpointURL, {command: scm}, {headers: {'Content-Type': 'application/json'} }).then(function (response,status) {
            var responseString = response.data.response;
            console.log("\nresponseString: " + responseString);

            var results = JSON.parse(responseString);
            console.log("results: ");
            for (varname in results) {
                console.log("    " + varname + ": " + results[varname])
            }

            attentionFactory.psiValues = results
            
            if (typeof successCB === "function") {
              successCB()
            }
            
        }, function errorCallback(err) {
            if (typeof errorCB === "function") {
              AttentionFactory(err)
            }
        });

    }
    
    return attentionFactory;
})