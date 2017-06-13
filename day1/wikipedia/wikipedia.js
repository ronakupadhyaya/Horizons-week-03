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

function mostPopularPages(fileName) {
  var most = {};
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  rl.on('line', function(line) {
    // This is called for each line in file
    var lineArr = line.split(' ');
    //console.log(lineArr[2]);

    if (most.hasOwnProperty(lineArr[1])) {
      most[lineArr[1]] += 1;
    } else {
      most[lineArr[1]] = 1;
    }
  
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    //var keysSorted = Object.keys(most).sort(function(a,b){return most[a]-most[b]})
    //var maxSite = Object.keys(most)[0];
    // var maxVisits = maxVisits = most[Object.keys(most)[0]];;
    // for (let i = 0; i < Object.keys(most).length; i++) {
    //   if (most[Object.keys(most)[i]] > maxVisits) {
    //     maxSite = Object.keys(most)[i];
    //     maxVisits = most[Object.keys(most)[i]];
    //   }
    // }
    // console.log(maxSite);
    //console.log(most)
    // _.reduce(most, function(a, b) {
    //   return a > b ? a : b;
    // }, 0);
  });
}

mostPopularPages('pagecounts-20160607-170000');
