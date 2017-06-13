"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');


//Known bugs --> only calculates the maximum, instead of a list of the top ten

// Example code for reading a file line by line and counting
// the lines in it.
function countLines(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  console.log(rl);
  rl.on('line', function(line) {
    // This is called for each line in file
    count++;
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('There are %s lines in file %s', count, fileName);
  });
}

//countLines('sample.data');


//Reads file and calculates which pages receive the most Visits
// during the one hour starting June 6th 2016 1700 GMT.
//Part1
function mostPop(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  var page = '';
  rl.on('line', function(line) {
    // This is called for each line in file
    //console.log(line);
    var arr = line.split(' ');
    if (!arr[0].includes('.mw') && !arr[0].includes('Special:')) {

      if (parseInt(arr[2]) > count) {
        count = arr[2];
        page = arr[1];
      }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('There were %s visits on page %s in file %s', count, page, fileName);
  });
}

//mostPop('pagecounts-20160606');


//Most popular languages
//Part2
function popularLanguages(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var newObj = {};

  rl.on('line', function(line) {
    // This is called for each line in file
    var arr = line.split(' ');

    if (!arr[0].includes('.mw') && !arr[0].includes('Special:')) {
      if (newObj[arr[0]] === undefined) {
        newObj[arr[0]] = 1;
      }
      newObj[arr[0]]++;
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    var lang = '';
    var numVisits = 0;

    for (var key in newObj) {
      if (newObj[key] > numVisits) {
        lang = key;
        numVisits = newObj[key];
      }
    }
    console.log('There are %s visits to pages in %s in file %s', numVisits, lang, fileName);
  });
}


//popularLanguages('pagecounts-20160606');
