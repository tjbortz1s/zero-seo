var rules = require('./rules/rulehub.js');
var apis = require('./apis/apihub.js');
var httpsRequest = require('./httpsrequest.js');
var _ = require('underscore');

var check = function(url, callback){
  var redirected = false;
  var html = '';
  var rulesresult;
  var apisresult = ' ';

  var returnValues = function(){
    console.log("FINAL CALLBACK");
    console.log("TESTING");
    console.log(rulesresult);
    var returnobj = {redirected: redirected, rules: rulesresult, apis: apisresult, html: html};
    callback(returnobj);
  };
  var finished = _.after(2, returnValues);

  httpsRequest(url, function(data){
    redirected = data.redirected;
    html = data.html;
    rules(html, function(results){
      rulesresult = results.slice();
      console.log(rulesresult);
      finished();
    });
    apis(url, function(results){
      apisresult = results;
      finished();
    });
    //console.log('is data here?');
    //console.log(https);
    //console.log(html);

    //callback(data);
  });

}

module.exports = check;