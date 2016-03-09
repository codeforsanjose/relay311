angular.module('open311.services', [])
.factory('API', function($http, $httpParamSerializer, $q) {

    var recentCasesData = [];

    var getRequests = function(lat, long) {
      var deferred = $q.defer();

      var params = $httpParamSerializer({
          lat: lat,
          long: long 
      });

      $http.get('https://seeclickfix.com/open311/v2/requests.json?' + params)
        .then(function(response) {
          recentCasesData = response.data;
          deferred.resolve(response);
        }, function(response) {
          deferred.reject(response);
        });
      
      return deferred.promise;
    };

    var getCase = function(caseID) {
      for (var i = 0; i < recentCasesData.length; i++) {
        if (recentCasesData[i].service_request_id === parseInt(caseID)) {
          return recentCasesData[i];
        }
      }
      return null;
    };

    return {
        getRequests: getRequests,
        getCase: getCase
    };
});