// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'home.html'
  })
  .state('recent', {
    url: '/recent',
    templateUrl: 'recent.html',
    controller: 'RecentController'
  })
})

.controller('RecentController', function($scope, $stateParams) {
  $scope.entries = [
    {
        "MyComment": "Dunne and Hill in Morgan Hill",
        "Id": 100,
        "DateCreated": "2015-05-20T08:30:30",
        "DateUpdated": "2015-05-20T08:30:30",
        "DeviceType": "IPHONE",
        "DeviceModel": "5S",
        "DeviceId": "1111",
        "RequestType": "Graffiti Removal",
        "RequestTypeId": "10",
        "ImageUrl": "http://www.citysourced.com/image_100.png",
        "ImageUrlXl": "http://www.citysourced.com/image_xl_100.png",
        "ImageUrlLg": "http://www.citysourced.com/image_lg_100.png",
        "ImageUrlMd": "http://www.citysourced.com/image_md_100.png",
        "ImageUrlSm": "http://www.citysourced.com/image_sm_100.png",
        "ImageUrlXs": "http://www.citysourced.com/image_xs_100.png",
        "City": "Morgan Hill",
        "State": "CA",
        "ZipCode": "95037",
        "Latitude": "37.138698",
        "Longitude": "-121.615391",
        "Directionality": "25 N NW",
        "Description": "Illegal Trash / Dumping",
        "AuthorNameFirst": "",
        "AuthorNameLast": "",
        "AuthorEmail": "",
        "AuthorTelephone": "",
        "AuthorIsAnonymous": "true",
        "UrlDetail": "http://www.citysourced.com/report/100/graffiti",
        "UrlShortened": "",
        "Votes": "2",
        "StatusType": "Open",
        "TicketSla": "The city's goal is to respond within 1 calendar days"
    },
    {
        "MyComment": "City Hall, San Jose",
        "Id": 101,
        "DateCreated": "2015-10-20T13:45:30",
        "DateUpdated": "2015-10-25T09:00:01",
        "DeviceType": "IPHONE",
        "DeviceModel": "6",
        "DeviceId": "2222",
        "RequestType": "Graffiti Removal",
        "RequestTypeId": "10",
        "ImageUrl": "http://www.citysourced.com/image_200.png",
        "ImageUrlXl": "http://www.citysourced.com/image_xl_200.png",
        "ImageUrlLg": "http://www.citysourced.com/image_lg_200.png",
        "ImageUrlMd": "http://www.citysourced.com/image_md_200.png",
        "ImageUrlSm": "http://www.citysourced.com/image_sm_200.png",
        "ImageUrlXs": "http://www.citysourced.com/image_xs_200.png",
        "City": "San Jose",
        "State": "CA",
        "ZipCode": "95101",
        "Latitude": "37.338208",
        "Longitude": "-121.886329",
        "Directionality": "25 N NW",
        "Description": "I hate this ugly graffiti",
        "AuthorNameFirst": "",
        "AuthorNameLast": "",
        "AuthorEmail": "",
        "AuthorTelephone": "",
        "AuthorIsAnonymous": "true",
        "UrlDetail": "http://www.citysourced.com/report/100/graffiti",
        "UrlShortened": "",
        "Votes": "22",
        "StatusType": "Open"
    },
    {
        "MyComment": "159 Sweetberry Ct., San Jose, CA 95136",
        "Id": 102,
        "DateCreated": "2015-05-20T10:17:00",
        "DateUpdated": "2015-05-30T10:13:45",
        "DeviceType": "IPHONE",
        "DeviceModel": "6",
        "DeviceId": "1111",
        "RequestType": "Graffiti Removal",
        "RequestTypeId": "10",
        "ImageUrl": "http://www.citysourced.com/image_300.png",
        "ImageUrlXl": "http://www.citysourced.com/image_xl_300.png",
        "ImageUrlLg": "http://www.citysourced.com/image_lg_300.png",
        "ImageUrlMd": "http://www.citysourced.com/image_md_300.png",
        "ImageUrlSm": "http://www.citysourced.com/image_sm_300.png",
        "ImageUrlXs": "http://www.citysourced.com/image_xs_300.png",
        "City": "San Jose",
        "State": "CA",
        "ZipCode": "95101",
        "Latitude": "37.273506",
        "Longitude": "-121.835976",
        "Directionality": "25 N NW",
        "Description": "The building wall is covered with graffiti.",
        "AuthorNameFirst": "John",
        "AuthorNameLast": "Citizen",
        "AuthorEmail": "jc@xyz.com",
        "AuthorTelephone": "4082229999",
        "AuthorIsAnonymous": "false",
        "UrlDetail": "http://www.citysourced.com/report/100/graffiti",
        "UrlShortened": "",
        "Votes": "5",
        "StatusType": "Open"
    }
  ]
})
