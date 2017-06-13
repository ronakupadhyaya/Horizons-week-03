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

countLines(__filename);

function mostVisits(fileName){
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var max = 0;
  var name = "";
  rl.on('line', function(line) {
    // This is called for each line in file
    var lineArr = line.split(" ");
    if(line.indexOf(".mv") === -1
      && line.indexOf("Special:") === -1){
        if(parseInt(lineArr[2]) > max){
          max = parseInt(lineArr[2]);
          name = lineArr[1];
        }
    }
  });

  // Sort the objects by num visits
  console.log(name + " has the most visits --> " + max);
}
function convertToObj(lineStr){
  var lineStrArr = lineStr.split(" ");
  var obj = {
    lang: lineStr[0],
    name: lineStr[1],
    numVisits: Number.parseInt(lineStr[2])
  };

  return obj;
}

mostVisits(fileName);
