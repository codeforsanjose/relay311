angular.module('open311.controllers')
.controller('NewRequestCtrl', ['$scope', '$ionicPlatform', 'API', 'NewRequest', '$state', '$cordovaCamera', '$ionicModal',
function($scope, $ionicPlatform, API, NewRequest, $state, $cordovaCamera, $ionicModal, $cordovaGeolocation) {

  // dummy lat&lng, will replace by location of user's location
  var coords = { lat: 37.339244, lng: -121.883638 };

  $scope.case = NewRequest.get();

  $scope.goto = function(name) {
    $state.go('tabs.' + name);
  };

  // PhotoView Modal
  $ionicModal.fromTemplateUrl('templates/photo-view.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    if (ionic.Platform.isIOS()) {
      ionic.Platform.fullScreen();
    }
    $scope.modal = modal;
  });

  $scope.openPhotoView = function() {
    $scope.modal.show();
  };
  $scope.closePhotoView = function() {
    $scope.modal.hide();
  };

  // Camera
  $scope.newPicture = function() {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctionOrientation: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.case.image = "data:image/jpeg;base64," + imageData;
    });
  };

  var options = { timeout: 10000, enableHighAccuracy: true };

  var latLng = new google.maps.LatLng(37.3315876, -121.8905004);
  var mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  $scope.submit = function () {
    console.log($scope.case);
  }
}]);