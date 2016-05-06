angular.module('open311.services', [])
.factory('API', function($http, $httpParamSerializer, $q) {

  var SERVER_PATH = 'http://52.34.144.221:80/v1';
  var recentCasesData = [];

  var getRequests = function(lat, long) {

    var params = $httpParamSerializer({
      lat: lat,
      lng: long
    });

    return $http.get(SERVER_PATH + '/requests.json?' + params)
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
    return $http.get(SERVER_PATH + '/requests/' + caseID + '.json').then(function(response) {
      return response.data[0];
    });
  };

  var getCategories = function(lat, lng) {
    var params = $httpParamSerializer({
      lat: lat,
      lng: lng
    });

    return $http.get(SERVER_PATH + '/services.json?' + params).then(function(response) {
      return response;
    });
  };

  return {
    getRequests: getRequests,
    getCase: getCase,
    getCategories: getCategories
  };
});