var express = require('express');
var router = express.Router();
var pageInsights = require('../public/javascripts/pagespeedinsights.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', null);
});

router.get('/test/:id', function(req, res, next) {
  res.render('test', {title: 'Express', output: req.params.id});
});

router.post('/test/submit', function(req, res, next) {
  var id = req.body.id;
  console.log(id);
  //res.redirect('/test/' + id);
  pageInsights(id, function(body) {
    res.render('results', {title: 'ResultsPage', results: body});
  });
});
module.exports = router;
