var _ = require('underscore');
var testRule = require('./testRule.js');
var oneTitleRule = require('./onetitletagrule.js');
var h1TagsRule = require('./oneh1tagrule.js');
var imageTagsRule = require('./imagetagsaltrule.js')

var checkRules = function(htmlString, callback){
  var testruleresults = [];

  var returnFunct = function(){
    callback(testruleresults);
  }
  var finished = _.after(4, returnFunct);

  testRule(htmlString, function(result){
    testruleresults.push(result);
    finished();
  });
  oneTitleRule(htmlString, function(result){
    testruleresults.push(result);
    finished();
  });
  h1TagsRule(htmlString, function(result){
    testruleresults.push(result);
    finished();
  });
  imageTagsRule(htmlString, function(result){
    testruleresults.push(result);
    finished();
  })

};

module.exports = checkRules;
