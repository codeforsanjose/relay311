angular.module('open311.controllers', [])
.controller('HomeTabCtrl', function($scope, $ionicModal, $state) {
  console.log('HomeTabCtrl');
  $scope.onClick = function(state) {
    $state.go('tabs.' + state);
  }
})

.controller('RecentCasesCtrl', ['$scope', 'API', function ($scope, API) {
    API.getRequests(41.307153, -72.925791).then(function(requests) {
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
        $scope.cases = data; 
        console.log('data', data);
    });
}])

.controller('RecentCaseCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
  
}]);