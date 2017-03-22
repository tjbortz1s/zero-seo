var express = require('express');
var router = express.Router();
var pageInsights = require('../public/javascripts/pagespeedinsights.js')
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', null);
  //converted to angular html serving
  var thePath = path.join(__dirname, '../', 'views', 'index.html')
  console.log(thePath);
  res.sendFile(thePath);
});

router.get('/data', function(req,res){
	res.json(["1", "2", "3", "4", "5"]);
});

router.post('/api/speedTest', function(req, res, next) {
  var url = req.body.url;
  //res.redirect('/test/' + id);
  pageInsights(url, function(body) {
    res.render('results', {title: 'ResultsPage', results: body});
  });
});


module.exports = router;
