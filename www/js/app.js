angular.module('open311', [
  'ionic',
  'ngCordova',
  'open311.controllers',
  'open311.services'
])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('Back');
  
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
          templateUrl: "templates/new.html",
          controller: 'NewRequestCtrl'
        }
      }
    })
    .state('tabs.recent', {
      url: "/recent",
      views: {
        'home-tab': {
          templateUrl: "templates/recent.html",
          controller: 'RecentCasesCtrl'
        }
      }
    })
    .state('tabs.case', {
      url: "/recent/:caseId",
      views: {
        'home-tab': {
          templateUrl: "templates/case.html",
          controller: 'RecentCaseCtrl'
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
    })
    .state('tabs.categories', {
      url: "/categories",
      views: {
        'home-tab': {
          templateUrl: "templates/categories.html",
          controller: "CategoryCtrl"
        }
      }
    })
    .state('tabs.calendar', {
      url: "/calendar",
      views: {
        'home-tab': {
          templateUrl: "templates/404.html",
          controller: "CalendarCtrl"
        }
      }
    })
    .state('tabs.discussion', {
      url: "/discussion",
      views: {
        'home-tab': {
          templateUrl: "templates/404.html",
          controller: "DiscussionCtrl"
        }
      }
    });

   $urlRouterProvider.otherwise("/tab/home");

});