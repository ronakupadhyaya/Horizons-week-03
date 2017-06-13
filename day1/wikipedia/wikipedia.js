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
  var maxPC = 0;
  rl.on('line', function(line) {
    // This is called for each line in file
    var tempArr = line.split(" ");
    if (!tempArr[0].includes('mw')) {
      if (!tempArr[1].includes('Special')) {

      }
    }
    count++;
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('There are %s lines in file %s', count, fileName);
  });
}

function mostPopular(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var maxPC = 0;
  var retArr = [];
  var retLine = null;
  rl.on('line', function(line) {
    // This is called for each line in file
    var tempArr = line.split(" ");
    if (!tempArr[0].includes('mw')) {
      if (!tempArr[1].includes('Special')) {
        if (tempArr[2] > maxPC) {
          maxPC = tempArr[2];
          retLine = tempArr[1];
        }
      }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('The most popular page is % from %', retLine, fileName);
  });
}

countLines(__filename);
