angular.module('open311.controllers', [])
.controller('HomeTabCtrl', function($scope, $ionicModal, $state) {
  console.log('HomeTabCtrl');
  $scope.onClick = function(state) {
    $state.go('tabs.' + state);
  }
})

.controller('RecentCasesCtrl', ['$scope', '$ionicPlatform', '$ionicLoading', 'API', function ($scope, $ionicPlatform, $ionicLoading, API) {

    var coords = {lat: 41.307153, long: -72.925791};

    // same as document ready
    $ionicPlatform.ready(function() {
      $scope.haveData = false;
      $ionicLoading.show ({
        template: 'Loading...'
      });

      API.getRequests(coords.lat, coords.long).then(function(requests) {
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

          $scope.haveData = true;
          $ionicLoading.hide();
          $scope.cases = data; 
      });
    });
}])

.controller('RecentCaseCtrl', ['$scope', '$stateParams', 'API', function ($scope, $stateParams, API) {
  API.getCase($stateParams.caseId).then(function(request) {
    if (!request.media_url) {
        request.media_url = 'img/default-placeholder.png';
    }
    if (!request.service_name) {
        request.service_name = "Other";
    }
    if (!request.description) {
        request.description = "No description.";
    }
    $scope.case = request;
  });
}])

.controller('NewRequestCtrl', ['$scope', '$state', '$cordovaCamera', '$ionicModal', 
function ($scope, $state, $cordovaCamera, $ionicModal, $cordovaGeolocation) {

  $scope.caseImage = 'img/default-placeholder.png';

  // PhotoView Modal 
  $ionicModal.fromTemplateUrl('templates/photo-view.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.openPhotoView = function () {
    $scope.modal.show();
  };
  $scope.closePhotoView = function () {
    $scope.modal.hide();
  };

  // Camera 
  $scope.newPicture = function () {
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

    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.caseImage = "data:image/jpeg;base64," + imageData;
    });
  };
  
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  var latLng = new google.maps.LatLng(37.3315876, -121.8905004);
  var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
}]);