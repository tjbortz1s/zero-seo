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
      $scope.showentryinfo = true;
      $scope.showloader = true;

      console.log("SETTING SOURCE TEXT");
      $scope.framename = 'test';

      //begin the API requests
      var testReq = $http.post('/api/runChecks', {'url': $scope.text});
      //request for the rules
      testReq.success(function(data){

        $scope.pagehtml = data.html;
        $scope.ruleresults = data.rules;

        var passedrules = 0;
        for(var object in data.rules){
          var trueobject = data.rules[object];
          if(trueobject.passed){
            passedrules++;
          }
        }
        $scope.totalrlues = data.rules.length;
        $scope.passedrules = passedrules;

        $scope.showrulesinfo = true;


        $scope.redirectstohttps = data.redirected;

        //api result?

        //get number of issues

        var numissues = 0;
        var rules = data.apis.desktopspeed.formattedResults.ruleResults;

        for(var object in rules){
          var trueobj = rules[object];
          if(trueobj.ruleImpact > 0){
            numissues++;
          }
        };

        $scope.numissues = numissues;

        $scope.showspeedinfo = true;
        $scope.jsonfile = data.apis.desktopspeed;
        $scope.showloader = false;
      });

      $scope.text = "";
    }
  };


});
