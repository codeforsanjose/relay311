angular.module('open311.controllers')
.controller('CategoryCtrl', ['$scope', '$ionicHistory', '$ionicPlatform', 'API', 'App',
function($scope, $ionicHistory, $ionicPlatform, API, App) {
  var coords = { lat: 37.339244, lng: -121.883638 };

  $ionicPlatform.ready(function() {
    API.getCategories(coords.lat, coords.lng).then(function(response) {
      $scope.data = response.data;
    });
  });

  $scope.selectItem = function (category) {
    var requestObj = App.getIssue();
    requestObj.category = category;
    App.setIssue(requestObj);
    
    $ionicHistory.goBack();
  }

}]);
