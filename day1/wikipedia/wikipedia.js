"use strict";
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

function Line(language, name, visits, usage) {
  this.language = language;
  this.name = name;
  this.visits = visits;
  this.usage = usage;
}

var parsedData;

function clean(fileName) {
  var lines = [];
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  rl.on('line', function(line) {
    if(line.indexOf(".mw") === -1 && line.indexOf("Special:") === -1) {
      var tempLine = line.split(" ");
      lines.push(new Line(tempLine[0], tempLine[1], tempLine[2], tempLine[3]));
    }
  });
  rl.on('close', function() {
    console.log(lines);
    return lines;
  });
}

function mostPopularPage(fileName) {
  var pages = clean(fileName);
  var max = 0;
  var name;
  pages.forEach(function(element) {
    if (element.visits > max) {
      max = element.visits;
      name = element.name;
    }
  })
  console.log("Most visited page is %s, %s visits", name, max);
  return name;
}

mostPopularPage('pagecounts-20160606-170000 (2)');