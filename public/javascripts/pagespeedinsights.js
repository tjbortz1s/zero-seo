var request= require('request');

var pageInsightsQuery = function(url, callback){
  var apikey = "AIzaSyCNaOdODmRoJTDbt6xf_XEdTxcA44rBB10";
	var getURL = function(url) {
		return 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url='+url+'&key='+apikey;
	}

	if(url != "") {
    console.log(url);
		var requestURL = getURL(url);
    console.log(requestURL);
		var results = request(requestURL, function(error, response, body) {
      callback(body);
    });
  }
}

module.exports = pageInsightsQuery;
