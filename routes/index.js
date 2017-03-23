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

router.post('/api/speedTest', function(req, res, next) {
  var url = req.body.url;
  //res.redirect('/test/' + id);
  pageInsights(url, function(body) {
    res.json(body);
  });
});


module.exports = router;
