angular.module('open311.controllers')
.controller('AccountCtrl', ['$scope', '$ionicHistory', '$ionicPlatform', '$localStorage', 'API', 'App',
function($scope, $ionicHistory, $ionicPlatform, $localStorage, API, App) {


  $ionicPlatform.ready(function() {
    if ($localStorage.account === undefined) {
      $scope.account = {};
    } else {
      $scope.account = $localStorage.account;
    }
  });

  $scope.saveAccount = function () {
    console.log($scope.account);
    $localStorage.account = $scope.account;
  };

  $scope.clearAccount = function () {
    $scope.account = {};
    delete $localStorage.account;
  };

}]);
 
