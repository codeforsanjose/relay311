angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.new', {
      url: "/new",
      views: {
        'home-tab': {
          templateUrl: "templates/new.html"
        }
      }
    })
    .state('tabs.recent', {
      url: "/recent",
      views: {
        'home-tab': {
          templateUrl: "templates/recent.html",
          controller: 'RecentTabCtrl'
        }
      }
    })
    .state('tabs.mine', {
      url: "/mine",
      views: {
        'home-tab': {
          templateUrl: "templates/mine.html"
        }
      }
    })
    .state('tabs.account', {
      url: "/account",
      views: {
        'home-tab': {
          templateUrl: "templates/account.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");

})

.controller('HomeTabCtrl', function($scope, $ionicModal, $state) {
  console.log('HomeTabCtrl');
  $scope.onClick = function(state) {
    console.log(state);
    $state.go('tabs.' + state);
  }
})

.controller('RecentTabCtrl', ['$scope', function ($scope) {

  // remove after api installed
  var mockData = [
    {title: 'Graffiti', location: '311 N 1st St., San Jose, CA, 11111', description: 'Gangster graffiti sprayed on wall of building.', image: 'grafitti_01162016.png', status: 'Open', date: 'Jan 16, 2016'},
    {title: 'Illegal Dumping', location: '211 N 1st St., San Jose, CA, 11111', description: 'Shopping cart full of junk left by parks\'s bench', image: 'illegal_dumping_12162015.png', status: 'Closed', date: 'Dec 16 2015'},
    {title: 'Illegal Dumping', location: '100 Market St., San Jose, CA, 11111', description: 'Sofa left on side of road.', image: 'illegal_dumping_02062016.png', status: 'Open', date: 'Feb 06 2016'}
  ];


  $scope.cases = mockData;
}]);