angular.module('open311.controllers')
.controller('RecentCasesCtrl', ['$scope', '$ionicPlatform', '$ionicLoading', 'API',
function($scope, $ionicPlatform, $ionicLoading, API) {
  var coords = { lat: 37.339244, lng: -121.883638 };

  // same as document ready
  $ionicPlatform.ready(function() {
    console.log('ready');
    $scope.haveData = false;
    $ionicLoading.show({
      template: 'Loading...'
    });

    API.getRequests(coords.lat, coords.lng).then(function(requests) {
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

      console.log(requests);

      $scope.haveData = true;
      $ionicLoading.hide();
      $scope.cases = data;
    });
  });
}])