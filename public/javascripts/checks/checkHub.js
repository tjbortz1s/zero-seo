var rules = require('./rules/rulehub.js');
var apis = require('./apis/apihub.js');
var httpsRequest = require('./httpsrequest.js');
var _ = require('underscore');

var check = function(url, callback){
  var redirected = false;
  var html = '';
  var rulesresult = ' ';
  var apisresult = ' ';

  var returnValues = function(){
    console.log("SENDING OUT THE RNESULTSOF");
    console.log(apisresult);
    var returnobj = {redirected: redirected, rules: rulesresult, apis: apisresult, html: html};
    console.log("GOTTA GOTTA HERE BUDDY");
    callback(returnobj);
  };
  var finished = _.after(2, returnValues);
  console.log("RUNINGINGINGING");

  httpsRequest(url, function(data){
    redirected = data.redirected;
    html = data.html;
    rulesresult = rules(html, function(results){
      rulesresult = results;
      finished();
    });
    apisresult = apis(url, function(results){
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
