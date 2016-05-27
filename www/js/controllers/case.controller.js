angular.module('open311.controllers')
.controller('RecentCaseCtrl', ['$scope', '$ionicPlatform', '$stateParams', 'API', function($scope, $stateParams, API) {
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
}]);