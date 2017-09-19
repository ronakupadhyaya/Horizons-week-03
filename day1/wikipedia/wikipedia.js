"use strict";
var _ = require('underscore');
var fs = require('fs');
var readline = require('readline');

//Example code for reading a file line by line and counting
//the lines in it.
// function countLines(fileName) {
//   var input = fs.createReadStream(fileName);
//   var rl = readline.createInterface({
//     input: input
//   });
//   var count = 0;
//   rl.on('line', function(line) {
//     // This is called for each line in file
//     count++;
//   });
//   rl.on('close', function() {
//     // This is called when the file is done being read finished
//     console.log('There are %s lines in file %s', count, fileName);
//   });
// }
//
// countLines("./pagecounts-20160606-170000");

function mostPopular(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var highestNum = 0;
  var highestPage = "";
  var highestPages = [];
  var totals = {};
  rl.on('line', function(line){
    var x = line;
    x = x.split(" ");
    if (x[0].indexOf(".mw") === -1 && x[1].indexOf(":") === -1){
      if (parseInt(x[2]) > highestNum){
        highestNum = parseInt(x[2]);
        highestPage = x[1];
      }

      if (totals.hasOwnProperty(x[0])){
        totals[x[0]] += parseInt(x[2]);
      } else {
        totals[x[0]] = parseInt(x[2]);
      }
    }

  });
  rl.on('close', function(){
    var langHits = 0;
    var langName = "";
    _.mapObject(totals, function(val, key){
      if (val > langHits){
        langHits = val;
        langName = key;
      }
    });
    console.log("The most highly read page is " + highestPage);
    console.log("The most widely used language is " + langName);
  })
}

mostPopular("./sample.data");
