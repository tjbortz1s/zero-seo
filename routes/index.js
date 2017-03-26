var express = require('express');
var router = express.Router();
var pageInsightsDesktop = require('../public/javascripts/checks/apis/pagespeeddesktop');
var pageInsightsMobile = require('../public/javascripts/checks/apis/pagespeedmobile');
var check = require('../public/javascripts/checks/checkHub.js');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', null);
  //converted to angular html serving
  var thePath = path.join(__dirname, '../', 'views', 'index.html')
  console.log(thePath);
  res.sendFile(thePath);
});

router.post('/api/runChecks', function(req, res, next) {
    var url = req.body.url;
    var test = check(url, function(data){
      res.send(data);
    });
});


router.post('/api/speedTest', function(req, res, next) {
  var url = req.body.url;
  var ismobile = req.body.ismobile;


  if(ismobile){
    pageInsightsMobile(url, function(body) {
      res.json(body);
    });
  }
  if(!ismobile){
    //res.redirect('/test/' + id);
    pageInsightsDesktop(url, function(body) {
      res.json(body);
    });
  }


});


module.exports = router;
