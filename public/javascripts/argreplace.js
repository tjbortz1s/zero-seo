var findArgValue = function(object, key, callback){
  //object is array of arguments
  var retVal;
  object.forEach(function(value){
    if(value.key == key){
      retVal = value.value;
      callback(retVal);
    }
  });
}

var fun = function(object){
  //first, we make the regular expression to find the BEGIN tags
  var stringFindBegin = "{{BEGIN_.*?}}";
  //next, we make the regular experession to find the END tags
  var stringFindTags = "{{(?!BEGIN_)(?!END_).*?}}"
  //now make the actual expressions
  var regExpFindBegin = new RegExp(stringFindBegin, 'g');
  var regExpFindTags = new RegExp(stringFindTags, 'g');
  //now, with these two expressions, loop through each rule result format string
  for(var key in object.formattedResults.ruleResults){
    theobject = object.formattedResults.ruleResults[key];
    console.log(theobject.summary.format);
    //now we make the two arrays
    var beginTags = theobject.summary.format.match(regExpFindBegin);
    var valueTags = theobject.summary.format.match(regExpFindTags);
    //for debug, console.log the arrays
    //if there were begin tags
    if(beginTags != null){
      //strip the BEGIN_ and the {{}}
      var strippedBeginTags = [];
      beginTags.forEach(function(value){
        var stripString = value.substring(8, value.length-2);
        strippedBeginTags.push(stripString);
      });
      //log for debug;
      console.log("StrippedBegin:  " + strippedBeginTags);
    }
    //if there were value tags
    if(valueTags != null){
      //strip the {{}}
      var strippedValueTags = [];
      valueTags.forEach(function(value){
        var stripString = value.substring(2, value.length-2);
        strippedValueTags.push(stripString);
      });
      //loop through the array
      strippedValueTags.forEach(function(thevalue){
          //find the arg object with key value of thevalue
          //in this arg object the value value is what needs to replace
          //the placeholder {{}} thingy
          //
          //theobject.summary.args is a bunch of objects in an array
          //loop through this array and for each object
          //arrayobject.key
          //arrayobject.value
          findArgValue(theobject.summary.args, thevalue, function(retVal){
            console.log("FOUND THIS HERE GUY" + retVal + " FROM " + thevalue);
            var stringArgSearch = "{{" + thevalue + "}}";
            console.log("REGEX IS", stringArgSearch);
            var regExpArgSearch = new RegExp(stringArgSearch, 'g');
            theobject.summary.format = theobject.summary.format.replace(regExpArgSearch, retVal);
          });
      });
    }
  };


}

module.exports = fun;
