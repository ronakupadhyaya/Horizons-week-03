require('events').EventEmitter.prototype._maxListeners = 100;
//var _ = require("../lib/underscore")
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

// Shared Functions
var parseLine = function (line){
  var lineArray = line.split(" ");
  return {
    domain:lineArray[0].split(".")[0],
    name:lineArray[1] || " ",
    count:parseInt(lineArray[2])
  }
}

// PHASE 1

function getTopArticles(callback, lang){
  var instream = fs.createReadStream('asd2');
  var outstream = new stream;
  var rl = readline.createInterface(instream, outstream);
  var topResults = [];
  var lastValueOfTop10=0;
  rl.on('line', function(line) {
    var obj=parseLine(line)
    if(!lang ||( lang && lang === obj.domain) ){
      if (topResults.length<10){
        topResults.push(obj)
      }else{
        if (obj.count>lastValueOfTop10){
          topResults.push(obj)
          topResults.sort(function(a, b) {
            return parseInt(b.count) - parseInt(a.count);
          });
          topResults.splice(-1,1);
          lastValueOfTop10=topResults[topResults.length-1].count;
        }
      }
    }
  });
  rl.on('close', function() { callback(topResults) });
}


function getTopLanguages(callback){
  var instream = fs.createReadStream('asd2');
  var outstream = new stream;
  var rl = readline.createInterface(instream, outstream);
  var topResults = {};
  var lastValueOfTop10=0;
  var rl = readline.createInterface(instream, outstream);
  rl.on('line', function(line) {
    line = line.split(" ");
    var lang =line[0].split(".")[0]
    topResults[lang] = topResults[lang] ?  (topResults[lang] + 1)  : 1;
  });
  rl.on('close', function() {
    var array=[]
    for(var property in topResults){
      array.push({
        lang:property,
        count:topResults[property]
      })
    }
    array.sort(function(a, b) {
      return parseInt(b.count) - parseInt(a.count);
    });
    array=array.slice(0, 10)
    callback(array);
  });
}

/*
// 1. Find the top-10 most popular Wikipedia languages
getTopLanguages(function(lang){
console.log(lang)
} )
*/


/*
// 2. Find the top-10 most popular Wikipedia pages
getTopArticles(function(articles){
console.log(articles)
} )
*/

/*
// For the top 3 most popular languages, find the top-10 most popular pages
getTopLanguages(function(lang){
lang= lang.slice(0, 3)
for (var i=0; i<lang.length; i++){
getTopArticles(function(articles){
console.log(articles)
}, lang[i].lang);
}
} )
*/

// PHASE 2

function getCurrentCountForPreviousTop10 (callback, top10){
  var instream = fs.createReadStream('asd3');
  var outstream = new stream;
  var rl = readline.createInterface(instream, outstream);
  var topResults = [];
  var lastValueOfTop10=0;
  rl.on('line', function(line) {
    var obj=parseLine(line)

    for(var i=0; i<top10.length; i++)
    if(top10[i].name === obj.name && top10[i].domain === obj.domain){
      top10[i].count2=obj.count
      top10[i].gain_loss = top10[i].count/top10[i].count2
    }
  });
  rl.on('close', function() {
    callback(top10)
  });
}

/*
// 1. Detect the top 10 pages from day 1. Calculate their gains and losses in traffic by comparing them to day 2.
getTopArticles(function(articles){
  getCurrentCountForPreviousTop10(function(top10){
    console.log(top10)
  },articles)
})
*/
