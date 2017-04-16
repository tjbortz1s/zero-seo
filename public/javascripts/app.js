var app = angular.module('seoApp', []);

app.controller('myController', function($scope, $http) {
  $scope.text = "https://www.vintagesoftware.com";
  $scope.jsonfile = "";

  $scope.pagespeedheadertext = "+ Page Speed Results";
  $scope.resultsheadertext = "+ Meta Tag Checks";

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

  $scope.selectmobilecss = {'background-color': '#FFFFFF', 'text-align': 'center'};
  $scope.selectdesktopcss = {'background-color': '#EEEEFF', 'text-align': 'center'};


  $scope.selectMobile = function(){
    $scope.selectmobilecss = {'background-color': '#EEEEFF', 'text-align': 'center'};
    $scope.selectdesktopcss = {'background-color': '#FFFFFF', 'text-align': 'center'};
    var numissues = 0;
    var rules = $scope.mobileinfo.formattedResults.ruleResults;

    for(var object in rules){
      var trueobj = rules[object];
      if(trueobj.ruleImpact > 0){
        numissues++;
      }
    };

    $scope.numissues = numissues;
    $scope.jsonfile = $scope.mobileinfo;
  }

  $scope.selectDesktop = function(){
    $scope.selectmobilecss = {'background-color': '#FFFFFF', 'text-align': 'center'};
    $scope.selectdesktopcss = {'background-color': '#EEEEFF', 'text-align': 'center'};
    var numissues = 0;
    var rules = $scope.desktopinfo.formattedResults.ruleResults;

    for(var object in rules){
      var trueobj = rules[object];
      if(trueobj.ruleImpact > 0){
        numissues++;
      }
    };

    $scope.numissues = numissues;
    $scope.jsonfile = $scope.desktopinfo;
  }


  $scope.rulesExpand = function(){
    if($scope.resultsheadertext.charAt(0) == '+'){
      $scope.resultsheadertext = "- Meta Tag Checks";
    }
    else{
      $scope.resultsheadertext = "+ Meta Tag Checks";
    }

    $scope.showruleresults = !($scope.showruleresults);
  };

  $scope.speedExpand = function(){
    if($scope.pagespeedheadertext.charAt(0) == '+'){
      $scope.pagespeedheadertext = "- Page Speed Results";
    }
    else{
      $scope.pagespeedheadertext = "+ Page Speed Results";
    }
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

      $scope.framename = 'test';

      //begin the API requests
      var url = $scope.text;
      var testReq = $http.post('/api/runChecks', {'url': url});
      //request for the rules
      testReq.success(function(data){
        $scope.url = url;
        $scope.pagehtml = data.html;
        $scope.ruleresults = data.rules;

        var passedrules = 0;
        for(var object in data.rules){
          var trueobject = data.rules[object];
          if(trueobject.passed){
            passedrules++;
          }
        }
        $scope.totalrules = data.rules.length;
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
        $scope.desktopinfo = data.apis.desktopspeed;
        $scope.mobileinfo = data.apis.mobilespeed;
        $scope.showloader = false;
      });

      $scope.text = "";
    }
  };


});
