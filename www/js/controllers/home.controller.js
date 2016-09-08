angular.module('open311.controllers', [])
.controller('HomeTabCtrl', function($scope, $ionicModal, $state) {
  $scope.onMenuClick = function(state) {
    $state.go('tabs.' + state);
  }
});
