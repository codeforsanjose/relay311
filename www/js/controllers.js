angular.module('open311.controllers', [])
.controller('HomeTabCtrl', function($scope, $ionicModal, $state) {
  console.log('HomeTabCtrl');
  $scope.onClick = function(state) {
    $state.go('tabs.' + state);
  }
})

.controller('RecentCasesCtrl', ['$scope', 'API', function ($scope, API) {
    var coords = {lat: 41.307153, long: -72.925791};
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
        $scope.cases = data; 
    });
}])

.controller('RecentCaseCtrl', ['$scope', '$stateParams', 'API', function ($scope, $stateParams, API) {
  $scope.case = API.getCase($stateParams.caseId);
  console.log($scope.case);
}]);