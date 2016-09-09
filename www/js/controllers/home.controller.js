angular.module('open311.controllers', [])
.controller('HomeTabCtrl', ['$scope', '$ionicModal', '$state', '$ionicPlatform', function($scope, $ionicModal, $state, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.StatusBar) {
      if (ionic.Platform.isIOS()) {
        StatusBar.styleDefault();
      }
    }
  });

  $scope.onMenuClick = function(state) {
    $state.go('tabs.' + state);
  }
}]);
