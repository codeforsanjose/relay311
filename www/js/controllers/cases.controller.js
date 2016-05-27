angular.module('open311.controllers')
.controller('RecentCasesCtrl', ['$scope', '$ionicPlatform', '$ionicLoading', '$cordovaGeolocation', 'API', function ($scope, $ionicPlatform, $ionicLoading, $cordovaGeolocation, API) {


    var positionHandler = function(position){
      // var coords = {lat: 37.339244, lng: -121.883638};
      console.log("Geo found:");    
      console.log("lat = " + position.coords.latitude);
      console.log("long = " + position.coords.longitude);

      API.getRequests(position.coords.latitude, position.coords.longitude)
        .then(function(requests) {
          var data = requests.data.map(function(request) {
            console.log("Requests found:");    
            console.log(JSON.stringify(requests));            
              if (!request.media_url) {
                  request.media_url = 'img/default-placeholder.png';
              }
              if (!request.service_name) {
                  request.service_name = "Other";
              }
              if (!request.description) {
                  request.description = "No description.";
              }
              return request;
          });

          $scope.haveData = true;
          $ionicLoading.hide();
          $scope.cases = data; 
      });
    };

    // same as document ready
    $ionicPlatform.ready(function() {
      $scope.haveData = false;
      $ionicLoading.show ({
        template: 'Loading...'
      });

      var positionOptions = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(positionOptions).then(positionHandler);

    });
}])
