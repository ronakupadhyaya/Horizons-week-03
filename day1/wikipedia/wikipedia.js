"use strict";
// var _ = require('underscore')
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
    // console.log('There are %s lines in file %s', count, fileName);
  });
}

countLines(__filename);


function cleanData(fileName) {
  // var rawData = fs.readFileSync(fileName, 'utf-8');
  // var inputData = rawData.split('\\n');
  // var cleanArr = [];
  // inputData.forEach(function(item){
  //   var itemObj = {};
  //   var thisString = item.split(' ')
  //   itemObj.language =
  // })
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  rl.on('line', function(line) {
    ;
  });
  rl.on('close', function() {

  });
}

function arrayMaker(string) {
  var clean = string.split(" ");
}

cleanData('sample.data');
