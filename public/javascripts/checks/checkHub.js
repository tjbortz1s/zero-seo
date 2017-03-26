var rules = require('./rules/ruleHub.js');
var apis = require('./apis/apiHub.js');
var httpsRequest = require('./httpsrequest.js');

var check = function(url, callback){
  console.log("RUNINGINGINGING");
  var https = false;
  var html = '';
  //return null;
  httpsRequest(url, function(data){
    //var redirected = data.redirected;
    //var html = data.html;
    //console.log('is data here?');
    //console.log(https);
    //console.log(html);
    callback(data);
  });


  /*var rulesresult = rules(html);
  var apisresult = api(url);

  var returnValues = function(){
    var returnobj = {https: https, rules: rulesresult, apis: apisresult};
    return returnobj;
  };

  var rulesDone = false;
  var apiDone = false;
  var finished = _.after(2, returnValues);
  rules.on('exit', function(){
    finished();
  });
  api.on('exit', function(){
    finished();
  });*/


}

module.exports = check;
