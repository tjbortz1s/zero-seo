var mobileSpeed = require('./pagespeedmobile');
var desktopSpeed = require('./pagespeeddesktop');

var runChecks = function(url){
  var mobileResults = mobileSpeed(url);
  var desktopResults = desktopSpeed(url);
  var structureResults = false;

  var results = {mobilespeed: mobileresults, desktopspeed: desktopresults,
                 structuretest: structureresults};
};

module.exports = runChecks;
