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

function popPage(fileName) {
  var obj = {};
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  rl.on('line', function(line) {
    var arr = line.split(' ');

    if (arr[0].indexOf('.mw') === -1) {
      if (arr[1].indexOf(':') === -1) {
        if (obj.hasOwnProperty(arr[1]))
          obj[arr[1]] += arr[2];
        else
          obj[arr[1]] = arr[2];
      }
    }
  });
  rl.on('close', function() {
    console.log(obj);
  });
}

popPage('./sample.data');