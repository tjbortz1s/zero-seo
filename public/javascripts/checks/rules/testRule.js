var returnDummy = function(htmlString, callback){
    var returnvalue = {name: 'TestRule', passed: true, description: "You should only have one title tag on your webpage", arguments: []};
    callback(returnvalue);
};

module.exports = returnDummy;
