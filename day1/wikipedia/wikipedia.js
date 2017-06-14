"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

// Example code for reading a file line by line and counting
// the lines in it.
// function countLines(fileName) {
//   var input = fs.createReadStream(fileName);
//   var rl = readline.createInterface({
//     input: input
//   });
//   console.log(input)
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
// countLines(__filename);

function maxVisits(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var maxVisits = 0;
  rl.on('line', function(line) {
    // This is called for each line in file
    if( !(line.includes('.mw')) && !(line.includes('Special:'))){
        console.log(line.split(" "))
      if(parseInt(line.split(" ")[2]) > maxVisits){
        maxVisits = parseInt(line.split(" ")[2])
        }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('Max visits is %s in file %s', maxVisits, fileName);
  });
}

//
maxVisits(__filename);
