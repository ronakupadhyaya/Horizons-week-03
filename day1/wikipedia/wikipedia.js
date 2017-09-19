"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

var file = fs.read

// Example code for reading a file line by line and counting
// the lines in it.
function countLines(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;

  var langs = {};
  var langsResult = {}
  var pages = {};

  rl.on('line', function(line) {
    // This is called for each line in file
    var parts = line.split(" ");
    if (parts.length === 4 && !parts[0].includes('.mw') && parts[1].indexOf('Special:') === -1) {
      if (!langs[parts[0]]) langs[parts[0]] = 0
      langs[parts[0]] += parseInt(parts[2])
    }



    count++;
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    


    console.log('There are %s lines in file %s', count, fileName);
    console.log(langs);
  });
}

countLines("./sample.data");
