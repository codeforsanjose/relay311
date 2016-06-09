angular.module('open311.controllers')
.controller('CategoryCtrl', ['$scope', '$ionicHistory', '$ionicPlatform', 'API', 'App',
function($scope, $ionicHistory, $ionicPlatform, API, App) {
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
    App.setIssue(requestObj);

    $ionicHistory.goBack();
  }

}]);
