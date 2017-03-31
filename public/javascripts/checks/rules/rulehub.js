var testRule = require('./testRule.js');

var checkRules = function(htmlString, callback){
  var testruleresults;
  testRule(htmlString, function(result){
    testruleresults = result;
  });
  var results = {test: testruleresults};

  callback(results);
};

module.exports = checkRules;
