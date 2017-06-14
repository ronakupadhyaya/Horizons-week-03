"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

// Example code for reading a file line by line and counting
// the lines in it.
var obj;

function countLines(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });

  var count = 0;
  var objArray = [];

  rl.on('line', function(line) {
    // This is called for each line in file
    var arr = line.split(' ');
    var obj = {};
    
    obj['language'] = arr[0];
    obj['page name'] = arr[1];
    obj['number of visits'] = arr[2];
    obj['bandwidth'] = arr[3];
    objArray.push(obj);
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log(objArray);
    //globalVal = count;
  });
}
countLines("sample.data");
