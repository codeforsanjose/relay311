angular.module('open311.services', [])
.factory('API', function($http, $httpParamSerializer, $q) {

    var SEECLICKFIX_API = 'https://seeclickfix.com/open311/v2';
    var recentCasesData = [];

    var getRequests = function(lat, long) {

      var params = $httpParamSerializer({
          lat: lat,
          long: long 
      });


      return $http.get(SEECLICKFIX_API + '/requests.json?' + params)
        .then(function(response) {
          recentCasesData = response.data;
          return response;
        });
      
    };

    var getCase = function(caseID) {
      for (var i = 0; i < recentCasesData.length; i++) {
        if (recentCasesData[i].service_request_id === parseInt(caseID)) {
          return $q.resolve(recentCasesData[i]);
        }
      }
      return $http.get(SEECLICKFIX_API + '/requests/' + caseID + '.json').then(function(response) {
        return response.data[0];
      });
    };

    return {
        getRequests: getRequests,
        getCase: getCase
    };
});