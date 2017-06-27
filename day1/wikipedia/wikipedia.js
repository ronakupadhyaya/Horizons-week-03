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
  var lineArr;
  var returnArr = [];
  rl.on('line', function(line) {
    // This is called for each line in file
    lineArr = line.split(' ');
    lineArr[2] = parseInt(lineArr[2]);
    if (!(lineArr[0].includes('.mw') || lineArr[1].includes(':'))) {
      if (returnArr.length < 10) {
        returnArr.push([lineArr[1], lineArr[2]]);
      } else {
        returnArr.sort(function(a, b) {
          return b[1] - a[1];
        });
        if (returnArr[9][1] < lineArr[2]) {
          returnArr.pop();
          returnArr.push([lineArr[1], lineArr[2]]);
        }
      }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    returnArr.forEach(function(item) {
      console.log(item);
    });
  });
}

countLines(process.argv[2]);
