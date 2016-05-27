angular.module('open311.controllers')
.controller('CategoryCtrl', ['$scope', '$ionicHistory', '$ionicPlatform', 'API', 'NewRequest',
function($scope, $ionicHistory, $ionicPlatform, API, NewRequest) {
  var coords = { lat: 37.339244, lng: -121.883638 };

  // ari: test api, will move this part to category picker
  $ionicPlatform.ready(function() {
    API.getCategories(coords.lat, coords.lng).then(function(response) {
      $scope.data = response.data;
    });
  });

  $scope.selectItem = function (category) {
    var requestObj = NewRequest.get();
    requestObj.category = category;
    NewRequest.set(requestObj);

    $ionicHistory.goBack();
  }

}]);
