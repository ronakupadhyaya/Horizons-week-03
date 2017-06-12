"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');
var wordArr;
// Example code for reading a file line by line and counting
// the lines in it.
function countLines(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var max_views = 0;
  var max_page = 0;
  rl.on('line', function(line) {
    if(line.indexOf('.mw') === -1 && (line.indexOf('Special')) === -1){
      //does not contain .mw or special
    wordArr = line.split(" ");
    if(parseInt(wordArr[2]) > max_views){
      max_views = parseInt(wordArr[2]);
      max_page = wordArr[1];
    }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log(max_page)
    console.log(max_views)
  });
}

countLines("./wiki-june6");
