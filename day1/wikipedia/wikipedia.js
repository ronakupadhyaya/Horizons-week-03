"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

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

// countLines('sample.data');

function fileReader(fileName){
  var res = [];
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  rl.on('line', function(line) {
    var newLine = {
      language: line.split(' ')[0],
      name: line.split(' ')[1],
      number: line.split(' ')[2],
      bytes: line.split(' ')[3]
    }
    res.push(newLine);
  });
  return res;
}
console.log(fileReader('sample.data'));
