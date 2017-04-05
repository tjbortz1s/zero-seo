var htmlToArray = function(html,tag) {
 switch(tag){
  case 'img':
    regExp = '<' + tag +'.*?>'
    break;
  case 'h1':
    var regExp = '<' + tag + '.*?>.*?</' + tag + '>';
    break;
  case 'title':
    var regExp = '<' + tag + '.*?>.*?</' + tag + '>';
    break;
  case 'link':
    var regExp = '<' + tag + ' rel=".*?".*?>';
    break;
}

  var regex = new RegExp(regExp,'gi');
  metaTagArray = html.match(regex);
  return metaTagArray;
};

var isContentAttributeValid = function(searchEngingeTagArray){
    var numTagsWithContent = 0;
    var regExp = 'content="[^"].+?"';
    var regex = new RegExp(regExp,'gi');

    for (i = 0; i < searchEngingeTagArray.length; i++){
        if (searchEngingeTagArray[i] !== null)
          numTagsWithContent +=  (searchEngingeTagArray[i].toLowerCase().match(regExp)||[]).length;
      }
       if (numTagsWithContent == searchEngingeTagArray.length)
          return true;
        else
          return false;
}

module.exports = {htmlToArray: htmlToArray, isContentAttributeValid: isContentAttributeValid};
