"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');
var path = require('path')

var sampleDataFilePath = path.join(__dirname, 'sample.data')
// Example code for reading a file line by line and counting
// the lines in it.
function countLines(fileName) {
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

function mostVisited(fileName){
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var arr = [];
  rl.on('line', function(line) {
    // This is called for each line in file
    // count++;
    var arr = line.split(" ");
    if (arr[0].indexOf(".") !== -1 || arr[0].indexOf("Special") !== -1) {
      arr.push({arr[1]: arr[2]})
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    arr.sort(function(a,b){
      return a
    })
    //console.log('There are %s lines in file %s', count, fileName);



  });
}


countLines(sampleDataFilePath);
