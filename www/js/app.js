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
    $state.go('tabs.' + state);
  }
})

.controller('RecentTabCtrl', ['$scope', 'API', function ($scope, API) {
    API.getRequests(41.307153, -72.925791).then(function(requests) {
        var data = requests.data.map(function(request) {
            if (!request.media_url) {
                request.media_url = 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png';
            }
            if (!request.service_name) {
                request.service_name = "Other";
            }
            if (!request.description) {
                request.description = "No description.";
            }
            return request;
        });
        $scope.cases = data; 
    });
}]);