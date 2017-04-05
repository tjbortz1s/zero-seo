var helpers = require('../../htmltagsearch.js');
var htmlToArray = helpers.htmlToArray;
var isContentAttributeValid = helpers.isContentAttributeValid;


var twitterTags = function(html,callback){
      var pass, description = '';
      var twitterCardArray = htmlToArray(html,'twitter');

      if (twitterCardArray!==null){

        if(isContentAttributeValid(twitterCardArray)){
        description = 'Good: All <meta name=\"twitter:...\" tags contain valid content<br>';
        pass = true;
      }
        else{
          description = 'Error: At least 1 <meta name=\"twitter\" tag contains invalid content<br>'
          pass = false;
        }
      }
      else {
      description = 'Warning: There are no <meta name=\"twitter\" tags<br>';
      pass = false;
      }

      var returnObj = {
      name:'Twitter Card Meta Tag',
      passed: pass,
      description : description};
      callback(returnObj);

  }

module.exports = twitterTags;
