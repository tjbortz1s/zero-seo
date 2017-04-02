var htmlToArray = require('../../htmltagsearch.js');

var imageTags = function(html,callback){
  var pass, description;
  imageTagArray = htmlToArray(html,'img');
  if (imageTagArray !== null)
    numOfTags = imageTagArray.length;
  else{
    numOfTags = 0;
    pass = false;
    description = 'Warning: Page contains 0 "<img =" tags. Cant perform alt text check';
    return [pass,description];
  }

   var regExp = 'alt=".*"';
  var regex = new RegExp(regExp,'gi');
  var count = 0;

  for (i = 0; i < numOfTags; i++){
    if (imageTagArray[i] !== null)
      count +=  (imageTagArray[i].match(regex)||[]).length;
  }
  if (count == numOfTags){
    pass = true;
    description = 'All "<img =" tags contain an alt text'
  }
  else{
    pass = false;
    description = 'Error: There are '+ numOfTags + ' "<img =" tags and '+ count + ' of them are missing an alt text.';
  }
  var returnObj = {
    name:'Title Check',
    passed: pass,
    description : description};
   callback(returnObj);
}

module.exports = imageTags;
