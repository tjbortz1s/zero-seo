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

module.exports = htmlToArray;
