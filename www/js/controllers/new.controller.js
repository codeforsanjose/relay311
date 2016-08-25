angular.module('open311.controllers')

.controller('NewRequestCtrl', ['$scope', '$ionicPlatform', 'API', 'App', '$state', '$cordovaCamera', '$ionicModal', '$cordovaGeolocation', '$ionicPopup',
function($scope, $ionicPlatform, API, App, $state, $cordovaCamera, $ionicModal, $cordovaGeolocation, $ionicPopup) {
  console.log('new request init');

  // Initialize new issue
  App.setIssue(null);
  $scope.case = App.getIssue();

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

    $scope.modal.hide();
  };

  // Location Modal
  $ionicModal.fromTemplateUrl('templates/location-view.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    if (ionic.Platform.isIOS()) {
      ionic.Platform.fullScreen();
    }
    $scope.modal2 = modal;
  });

  $scope.openLocation = function() {
    $scope.modal2.show();
  };

  $scope.closeLocation = function() {
    $scope.modal2.hide();
  };

  // Geolocation
  var posOptions = {timeout: 10000, enableHighAccuracy: true};

  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  //Ari comment on 2016.8.25
  //Will move map to the map viewer
  /*
  $scope.getLocation = function() {
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;
        // $scope.case.lat = lat;
        // $scope.case.lng = long;

        geocoder.geocode({'location': {'lat':lat, 'lng':long}}, function(results, status) {
          // console.log(results);
          // console.log(status);
          if (results && results[1]) {
            $scope.$apply(function() {
              $scope.case.location = results[0].formatted_address;
            });
            $scope.map.setZoom(15);
            var marker = new google.maps.Marker({
              position: {'lat':lat, 'lng':long},
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              draggable: true
            });
            infowindow.setContent(results[1].formatted_address);
            infowindow.open($scope.map, marker);
          }
        });

    });
  };

  $scope.setLocation = function (address) {
    $scope.modal2.hide();
    geocoder.geocode({'address': address}, function (results, status) {
      if (results[0]) {
        $scope.map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: results[0].geometry.location,
            animation: google.maps.Animation.DROP,
            draggable: true
        });
      }
    })
  }
  */

  // var latLng = new google.maps.LatLng(37.3315876, -121.8905004);
  // var mapOptions = {
  //   center: latLng,
  //   zoom: 15,
  //   mapTypeId: google.maps.MapTypeId.ROADMAP,
  //   disableDefaultUI: true,
  //   zoomControl: true
  // };
  // $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var popup = function(heading, userMsg, logMsg, nextState) {
    $ionicPopup.alert({
      title: heading,
      content: userMsg
    }).then(function(res) {
      console.log(logMsg);
      if(nextState){
        $state.go(nextState);
      }
    });
  };

  function isFormValid(issue) {
    var errMessages = [];

    if (!issue.category) {
      errMessages.push('Please select Service Type');
    }

    if (!issue.lat || !issue.lng) {
      errMessages.push('Please select location');
    }

    if(!issue.title) {
      errMessages.push('Please add title');
    }

    if(issue.category && issue.category.service_name.search(/describe/i) !== -1) {
      errMessages.push('Please add description');
    }

    if (errMessages.length > 0) {
      var userMsg = errMessages.join('<br>');
      popup('Missing inputs:', userMsg, userMsg);
      return false;
    }
    return true;
  }

  // Post new request
  $scope.submit = function () {
    // check validity
    if (!isFormValid($scope.case)) {
      return;
    }
    var issue = $scope.case;

    var params = {
      "service_code": issue.category.service_code,
      "title": issue.title,
      "description": issue.description,
      "address_string": issue.location,
      "lat": issue.lat.toString(),
      "lng": issue.lng.toString(),
      "media_url": null,
      "email": "jameskhaskell@gmail.com",
      "device_id": "123456789",
      "first_name": "James",
      "last_name": "Haskell",
      "phone": "4445556666",
      "isAnonymous": "true"
    };

    // Ari note: debug payload
    // params = {
    //   "service_code": "CS1-SJ-1-20",
    //   "address_string": "322 E Santa Clara St, San Jose, CA 95112",
    //   "email": "jameskhaskell@gmail.com",
    //   "device_id": "123456789",
    //   "first_name": "James",
    //   "last_name": "Haskell",
    //   "phone": "4445556666",
    //   "description": "Gang signs spray painted on the building.",
    //   "isAnonymous": "true"
    // };

    console.log('params', params);
    API.postRequest(params).then(function () {
      // check success, if success, pop an alert and go back to home
      popup('New request submitted', params.title, params, 'tabs.home');

    });
  }
}]);
