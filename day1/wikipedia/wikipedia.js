"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');
var samplefile = 'sample.data';
var june6 = 'wiki6.data';
var heap = require('heap');
const MaxHeap = require("heap-min-max").MaxHeap;
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

// countLines(__filename);

function popularPages(fileName){
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });

  var maxvisits = new MaxHeap();//[0,0,0,0,0,0,0,0,0,0];
  var maxpages = [];

  rl.on('line', function(line) {
    var linearr = line.split(" ");
    var pagename = linearr[1];
    var lang = linearr[0];
    if(lang.indexOf('.mw') ===-1 && pagename.indexOf('Special:')===-1){
      var numvisits = parseInt(linearr[2]);


      if(numvisits > maxvisits[9]){
        //find where it goes?
        maxpages=[pagename];
        maxvisits = numvisits;
      }else if(numvisits === maxvisits){
        maxpages.push(pagename);
      }
    }
  });

  rl.on('close', function() {
    console.log(maxpages,maxvisits);
    return maxpages;
  });
}

popularPages(june6);
