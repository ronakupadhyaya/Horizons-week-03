"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');
var program = require('commander');

program
  .option('-p, --pages', 'Specify to calculate most popular pages')
  .option('-l, --lang', 'Specify to calculate most popular languages')
  .parse(process.argv);
//program.option('-c, --completed', 'Specify to see completed or non-completed tasks');
//program.option('-c, --completed', 'Specify to see completed or non-completed tasks');

// Example code for reading a file line by line and counting
// the lines in it.

var allPages = [];
var allLangs = [];

function countLines(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  var allPages = {};
  var allLanguages = {};
  rl.on('line', function(line) {
    // This is called for each line in file
    cleanup(line);
    count++;
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    findMax();
    console.log('There are %s lines in file %s', count, fileName);
  });
}

// Does not process lines with the .mw or Special: string
function cleanup(fileLine) {
  var dotMW = fileLine.search("\.mw");
  var special = fileLine.search("Special:");

  if (dotMW === -1 && special === -1) {
    parseLine(fileLine);
  } else {
    return false;
  }
}

function parseLine(fileLine) {
  var split = fileLine.split(" ");
  allPages.push({name: split[1], lang: split[0], visits: split[2]});
}

function findMax() {
  if (program.pages) {
    var sortedPages = _.sortBy(allPages, 'visits');
    console.log("");
    console.log("MOST POPULAR PAGES");
    for (var a = sortedPages.length - 1; a > sortedPages.length - 11; a--) {
      var page = sortedPages[a];
      console.log("LANG: " + page.lang + " || PAGE: " + page.name + " || VISITS: " + page.visits);
    }
  } else if (program.lang) {
  }
}


countLines("dataset1.data");
