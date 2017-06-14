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

// countLines(__filename);
//
//

function mostPopular(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });

  var mostViews = 0;
  var wikiName = null;

  rl.on('line', function(line) {
    // This is called for each line in file
    var tempArray = [];
    tempArray = line.split(" ");

    if(!tempArr[0].includes('mw') && !tempArr[1].includes('Special')) {
      if(parseInt(tempArray[2]) > mostViews) {
        mostViews = parseInt(tempArray[2]);
        wikiName = tempArray[1];
      }
    }

  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('The most viewed page is ', mostViews, wikiName);
  });
}

mostPopular(sample.data);

function mostLanguage(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });

  var en = 0;

  var wikiName = null;

  rl.on('line', function(line) {
    // This is called for each line in file
    var tempArray = [];
    tempArray = line.split(" ");

    if(!tempArr[0].includes('mw') && !tempArr[1].includes('Special')) {
      if(parseInt(tempArray[2]) > mostViews) {
        mostViews = parseInt(tempArray[2]);
        wikiName = tempArray[1];
      }
    }

  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('The most viewed page is ', mostViews, wikiName);
  });
}

function mostPopular(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });

  var mostViews = 0;
  var wikiName = null;

  rl.on('line', function(line) {
    // This is called for each line in file
    var tempArray = [];
    tempArray = line.split(" ");

    if(!tempArr[0].includes('mw') && !tempArr[1].includes('Special') {
      if(parseInt(tempArray[2]) > mostViews) {
        mostViews = parseInt(tempArray[2]);
        wikiName = tempArray[1];
      }
    }

  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('The most viewed page is ', mostViews, wikiName);
  });
}

function mostPopular(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });

  var mostViews = 0;
  var wikiName = null;

  rl.on('line', function(line) {
    // This is called for each line in file
    var tempArray = [];
    tempArray = line.split(" ");

    if(!tempArr[0].includes('mw') && !tempArr[1].includes('Special') {
      if(parseInt(tempArray[2]) > mostViews) {
        mostViews = parseInt(tempArray[2]);
        wikiName = tempArray[1];
      }
    }

  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('The most viewed page is ', mostViews, wikiName);
  });
}
