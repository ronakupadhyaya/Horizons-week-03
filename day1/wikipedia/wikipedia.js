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
  var max = 0;
  var maxPage;
  rl.on('line', function(line) {
    // This is called for each line in file
    var lineArr = line.split(' ');
    if(lineArr[3] > max) {
      max = lineArr[3]
      maxPage = lineArr[1];
    }
    count++
  });
  console.log(max);

  rl.on('close', function() {
    // This is called when the file is done being read finished
    //console.log(maxPage);
    console.log('There are %s lines in file %s', count, fileName);
  });
}


countLines('./sample.data');
