"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

// Example code for reading a file line by line and counting
// the lines in it.
function countLines (fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  rl.on('line', function(line) {
    // This is called for each line in file
    count++;
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('There are %s lines in file %s', count, fileName);
  });
}

function mostPopular (fileName){
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var mostVisits = 0;
  var mostPopPage = "";
  rl.on('line', function(line) {
    // This is called for each line in file
    if(line.indexOf('.mw') > -1 || line.indexOf('Special:') > -1){}
    else {
      var lineArr = line.split(" ");
      if(lineArr[2] > mostVisits){
        mostVisits = lineArr[2];
        mostPopPage = lineArr[1];
      }
    }
  });
  rl.on('close', function() {
    return mostPopPage;
  });
}

mostPopular('./sample.data')
