angular.module('open311.controllers', [])
.controller('HomeTabCtrl', function($scope, $ionicModal, $state) {
  $scope.onClick = function(state) {
    $state.go('tabs.' + state);
  }
});