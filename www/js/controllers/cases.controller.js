angular.module('open311.controllers')
.controller('RecentCasesCtrl', ['$scope', '$ionicPlatform', '$cordovaGeolocation', 'API', '$ionicPopup', function ($scope, $ionicPlatform, $cordovaGeolocation, API, $ionicPopup) {


    var positionHandler = function(position){
      // var coords = {lat: 37.339244, lng: -121.883638};
      console.log("Geo found:");    
      console.log("lat = " + position.coords.latitude);
      console.log("long = " + position.coords.longitude);

      API.getRequests(position.coords.latitude, position.coords.longitude)
        .then(function(requests) {
          if(requests.status === 200) {
            var data = requests.data.map(function(request) {
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
            if(data && data.length > 0){
              $scope.haveData = true;
            } else {
              $ionicPopup.alert({
                title: 'No data',
                content: 'No records found!'
              }).then(function(res) {
                console.log('No records Alert Box');
                $scope.loadNoRec = true
              });              
            }
            $scope.cases = data;               
          } else {
            //popup no data
            $ionicPopup.alert({
              title: 'Failed',
              content: 'Couldn\'t fetch records!'
            }).then(function(res) {
              console.log('Service call failed Alert Box');
              $scope.loadError = true
            });
          }
          $scope.loadComplete = true
      });
    };

    // same as document ready
    $ionicPlatform.ready(function() {
      $scope.haveData = false;

      var positionOptions = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(positionOptions).then(positionHandler);

    });
}])
