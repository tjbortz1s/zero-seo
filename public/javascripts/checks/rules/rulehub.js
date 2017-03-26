var testRule = require('./testRule.js');

var checkRules = function(htmlString){
  var testruleresults = testRule(htmlString);
  var results = {test: testruleresults};

  return results;
};

module.exports = checkRules;
