//var _ = require("../lib/underscore")
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var instream = fs.createReadStream('asd2');
var outstream = new stream;
//var rl = readline.createInterface(instream, outstream);

function getTopArticles(){
  var topResults = [];
  var lastValueOfTop10=0;
  var rl = readline.createInterface(instream, outstream);
  rl.on('line', function(line) {

  //  Get top articles
    var obj=parseLine(line)
    if (topResults.length<=10){
      topResults.push(obj)
    }else{
      if (obj.count>lastValueOfTop10){
        topResults.push(obj)
        topResults.sort(sort);
        topResults.splice(-1,1);
        lastValueOfTop10=topResults[topResults.length-1].count;
      }
    }
  });

  rl.on('close', function() {
    console.log(topResults)
  });

  var parseLine = function (line){
    var lineArray = line.split(" ");
    return {
      domain:lineArray[0],
      name:lineArray[1],
      count:lineArray[2]
    }
  }
  var sort = function(a, b, sortBy) {
    return parseInt(b.count) - parseInt(a.count);
  };
}

getTopArticles()






function getTopLanguages(){
  var topResults = [];
  var lastValueOfTop10=0;
  var rl = readline.createInterface(instream, outstream);
  rl.on('line', function(line) {

  //  Get top articles
    var obj=parseLine(line)
    if (topResults.length<=10){
      topResults.push(obj)
    }else{
      if (obj.count>lastValueOfTop10){
        topResults.push(obj)
        topResults.sort(sort);
        topResults.splice(-1,1);
        lastValueOfTop10=topResults[topResults.length-1].count;
      }
    }
  });

  rl.on('close', function() {
    console.log(topResults)
  });

  var parseLine = function (line){
    var lineArray = line.split(" ");
    return {
      domain:lineArray[0],
      name:lineArray[1],
      count:lineArray[2]
    }
  }
  var sort = function(a, b, sortBy) {
    return parseInt(b.count) - parseInt(a.count);
  };
}






var sortByLang = function(a, b, sortBy) {
  return parseInt(b.count) - parseInt(a.count);
};

//domain_code
//page_title
//count_views
//total_response_size
