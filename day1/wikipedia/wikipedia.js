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
  var max_pages = 0;
  var max_visits = 0;
  var newArr = [];
  rl.on('line', function(line) {
    // This is called for each line in file
    console.log(newArr);
    if (line.indexOf('.mw') === -1 && line.indexOf('Special') === -1){ // line does not contain mw or special
      newArr = line.split(' ');
    }
    if (parseInt(newArr[2]) > max_visits){
      max_visits = parseInt(newArr[2]);
      max_pages = newArr[1];
    }

    count++;
  });

  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('There are %s lines in file %s', count, fileName);

  });
}

var sampleData = ('./sampleData');
// countLines(sampleData);
