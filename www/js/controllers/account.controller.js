angular.module('open311.controllers')
.controller('AccountCtrl', ['$scope', '$ionicHistory', '$ionicPlatform', 'API', 'App',
function($scope, $ionicHistory, $ionicPlatform, API, App) {


  $ionicPlatform.ready(function() {
    $scope.account = {};
  });

  $scope.submit = function () {
    console.log($scope.account);
  };

}]);
 
