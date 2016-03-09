angular
.module('open311')
.factory('API', function($http, $httpParamSerializer) {
    return {
        getRequests: function(lat, long) {
            var params = $httpParamSerializer({
                lat: lat,
                long: long 
            });
            return $http.get('https://seeclickfix.com/open311/v2/requests.json?' + params);
        }  
    };
})