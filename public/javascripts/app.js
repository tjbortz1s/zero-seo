var app = angular.module('seoApp', []);

app.controller('myController', function($scope, $http) {
  $scope.text = "https://www.google.com";
  $scope.jsonfile = "";

  $scope.showentrybox = true;
  //before anything is loaded nothing should be shown
  $scope.showspeedinfo = false;
  $scope.showspeedresults = false;
  //showinfo shows the header, which is then used through double-click
  //to show the results
  $scope.showrulesinfo = false;
  $scope.showrulesresults = false;
  //this will be split up into different loaders eventually
  $scope.showloader = false;
  //this is the only warning show label.
  $scope.redirectstohttps = true;

  $scope.rulesExpand = function(){
    console.log("TEST");
    $scope.showruleresults = !($scope.showruleresults);
  };

  $scope.speedExpand = function(){
    $scope.showspeedresults = !($scope.showspeedresults);
  };

  //on button click to start up the process
  $scope.submit = function() {
    //if a URL was input
    //have a module to check if URL is valid
    //in the future
    if($scope.text) {
      //show the headers
      //and the loaders
      $scope.showentrybox = false;
      $scope.showrulesinfo = true;
      $scope.showentryinfo = true;
      $scope.showloader = true;

      //begin the API requests
      //var request = $http.post('/api/speedTest', {'url': $scope.text, ismobile: false});
      var testReq = $http.post('/api/runChecks', {'url': $scope.text});
      //request for the rules
      testReq.success(function(data){
        var x = data.html;
        var y = data.redirected;
        console.log(y);
        $scope.showrulesinfo = true;
        $scope.pagehtml = x;
        $scope.redirectstohttps = y;

        //api result?


        $scope.showspeedinfo = true;
        $scope.jsonfile = data.apis.desktopspeed;
        $scope.showloader = false;
      });
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
      //this should all still work

      //request for the speedtest API
      request.success(function(data){
        $scope.showspeedinfo = true;
        $scope.jsonfile = data;
        $scope.showloader = false;
      });
      request.error(function(data) {
        console.log('Error ' + data);
        $scope.showloader = false;
      });
      $scope.text = "";
    }
  };


});
