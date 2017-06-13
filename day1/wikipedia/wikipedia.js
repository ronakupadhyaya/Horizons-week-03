"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');
var arr = [];
// Example code for reading a file line by line and counting
// the lines in it.
function countLines(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  rl.on('line', function (line) {
    // This is called for each line in file
    cleanUp(line);
    count++;
  });
  rl.on('close', function () {
    // This is called when the file is done being read finished
    console.log('There are %s lines in file %s', count, fileName);
    calculation(arr);
  });
}

function cleanUp(str) {

  if (str.includes("Special:") || str.includes(".mw")) {

  } else {
    var splitedStr = str.split(' ');
    arr.push(splitedStr);
  }
}

function calculation(arr) {
  var sortedArr = _.sortBy(arr, function (num) {
    num[2] = parseInt(num[2]);
    return num[2];
  });
  sortedArr.reverse();
  //console.log(sortedArr);
  for (var i = 0; i < 10; i++) {
    console.log(sortedArr[i]);
  }
}

countLines("sample.data");
