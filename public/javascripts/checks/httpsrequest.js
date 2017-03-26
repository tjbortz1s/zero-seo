var request = require('request');

var doRequest = function(url, callback){
  console.log("doing tsdafasdfasdfhing");
  var returnresult = request.get(url, function(err, res, body){
    var wasdirected = true;

    console.log('NEW URL');
    var newurl = returnresult.uri.href;
    console.log(newurl);

    console.log('OLD URL');
    console.log(url);

    //was directed will not display if https was starting
    //because then it is unnecessary
    //howver, if it was http, then if it didn't end up at
    //https, then it will show as false, and cause the warning to appear.
    if(url.startsWith('http://')){
      wasdirected = false;
      if(newurl.startsWith('https://')){
        wasdirected = true;
      }
    }
    var data = {html: body, redirected: wasdirected};
    callback(data);
  });
}

module.exports = doRequest;
