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
          templateUrl: "templates/recent.html"
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
});