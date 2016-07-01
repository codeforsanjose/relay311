

angular.module('open311.controllers')
.controller('CategoryCtrl', ['$scope', '$ionicHistory', '$ionicPlatform', 'API', 'App',
function($scope, $ionicHistory, $ionicPlatform, API, App) {
  var coords = { lat: 37.339244, lng: -121.883638 };
  var data;


  $ionicPlatform.ready(function() {
    API.getCategories(coords.lat, coords.lng).then(function(response) {
      data = response.data;
      $scope.filteredData = _.clone(response.data);
      
    });
  });

  $scope.searchList = function (ev) {
    var items = data;
    var val = ev.target.value;
    $scope.filteredItems = items.filter(function(item) {
        var selection = item.service_name.toLowerCase();
        return (_.startsWith(selection, val));
    });   
  }

  $scope.selectItem = function (category) {
    var requestObj = App.getIssue();
    requestObj.category = category;
    console.log(category);
    App.setIssue(requestObj);
    console.log(App.setIssue(requestObj));    
    $ionicHistory.goBack();
  }




  // function searchPage() {
  //   this.searchQuery = '';
  //   this.initializeItems();
  // }

  // searchPage.prototype.initializeItems = function() {
  //   this.items = [
  //     'Angular 1.x',
  //     'Angular 2',
  //     'ReactJS',
  //     'EmberJS',
  //     'Meteor',
  //     'Typescript',
  //     'Dart',
  //     'CoffeeScript'
  //   ];
  // }

  // searchPage.prototype.getItems = function(ev){
  //   this.initializeItems();
  //   let val = ev.target.value;
    
  //   if (val && val.trim() != '') {
  //       this.items = this.items.filter((item) => {
  //         return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //       })
  //     }
  // }

}]);
 