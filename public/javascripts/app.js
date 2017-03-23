var app = angular.module('seoApp', []);

app.controller('myController', function($scope, $http) {
  $scope.text = "https://www.google.com";
  $scope.jsonfile = "";
  $scope.showEntryInfo = true;

  $scope.submit = function() {
    if($scope.text) {
      $scope.showEntryInfo = false;
      var request = $http.post('/api/speedTest', {'url': $scope.text, ismobile: false});
      request.success(function(data){
        $scope.jsonfile = data;
      });
      request.error(function(data) {
        console.log('Error ' + data);
      });
      $scope.text = "";
    }
  };


});
