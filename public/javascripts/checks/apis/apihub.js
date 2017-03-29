var mobileSpeed = require('./pagespeedmobile');
var desktopSpeed = require('./pagespeeddesktop');
var _ = require('underscore');

var runChecks = function(url, callback){

  var mobileresults = " ";
  var desktopresults = " ";
  var structureresults = false;

  var returnFunct = function(){
    var results = {mobilespeed: mobileresults, desktopspeed: desktopresults,
    structuretest: structureresults};
    callback(results);
  }
  var finished = _.after(2, returnFunct);


  mobileSpeed(url, function(results){
      mobileresults = results;
      finished();
  });
  desktopSpeed(url, function(results){
      console.log("RETURNING RESULTS OF");
      console.log(results);
      desktopresults = results;
      finished();
  });


};

module.exports = runChecks;
