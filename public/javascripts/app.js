var app = angular.module('seoApp', []);

app.controller('myController', function($scope, $http) {
  $scope.text = "https://www.google.com";
  $scope.jsonfile = "";
  $scope.showEntryInfo = true;
  $scope.showLoader = false;

  $scope.submit = function() {
    if($scope.text) {
      $scope.showEntryInfo = false;
      $scope.showLoader = true;
      var request = $http.post('/api/speedTest', {'url': $scope.text, ismobile: false});
      //need a few different variables and actions
      //one, the arguments need to be used in the descriptions, links and so on
      //should be turned into html? or something of that sort

      //two, there should be a few variables
      //overall score
      //total score
      //amount each group contributes to score

      //make it so that the groupScores shows the total scores for each group.
      /*$scope.groupScores = data.ruleGroups;
      $scope.pageStats = data.pageStats;
      //{{beginlink}} and {{endlink}} should be replaced with <href> tags as is appropriate
      var formattedArray = [];
      data.formattedResults.ruleResults.forEach(function(ruleData){
        var tempObject = [];

      });*/

      console.log("GOT HERE GUYA");
      //this should all still work

      request.success(function(data){
        $scope.jsonfile = data;
        $scope.showLoader = false;
      });
      request.error(function(data) {
        console.log('Error ' + data);
        $scope.showLoader = false;
      });
      $scope.text = "";
    }
  };


});
