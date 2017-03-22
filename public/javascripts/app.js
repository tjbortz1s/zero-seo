var app = angular.module('seoApp', []);

app.controller('myController', function($scope, $http) {
  $scope.data = [];
  $scope.text = "https://www.google.com";
  $scope.jsonfile = "";
  $scope.submit = function() {
    if($scope.text) {
      $scope.data.push($scope.text);

      var request = $http.post('/api/speedTest', {'url': $scope.text});
      request.success(function(data){
        $scope.jsonfile = data;
      });
      request.error(function(data) {
        console.log('Error ' + data);
      });

      $scope.text = "";
    }
  };

  //do a request
  var request = $http.get('/data');
  request.success(function(data){
    $scope.data = data;
  });
  request.error(function(data){
    console.log('Error: ' + data);
  });


});
