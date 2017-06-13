"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

// Example code for reading a file line by line and counting
// the lines in it.
// function countLines(fileName) {
//   var input = fs.createReadStream(fileName);
//   var rl = readline.createInterface({
//     input: input
//   });
//   var count = 0;
//   rl.on('line', function(line) {
//     // This is called for each line in file
//     console.log(line);
//     if (line)
//       count++;
//   });
//   rl.on('close', function() {
//     // console.log(input);
//     // This is called when the file is done being read finished
//     console.log('There are %s lines in file %s', count, fileName);
//   });
// }

function cleaning(line) {
  if (line.indexOf('.mw') !== -1 || line.indexOf('Special:') !== -1) {
    return false;
  }
  return true
}

function mostVisit(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var currntVisit = 0;
  var currentPage = null;
  var currentLanguage = '';
  rl.on('line', function(line) {
    // This is called for each line in file
    if (cleaning(line)) {
      var item = line.split(' ');
      var visit = parseInt(item[2]);
      // console.log(visit);
      if (visit > currntVisit) {
        currentPage = item[1];
        currntVisit = visit;
        currentLanguage = item[0];
      }
    }

  });
  rl.on('close', function() {

    console.log('the most visited page: ' + currentPage + ' and its visit times is: ' + currntVisit +
      ' the language is: ' + currentLanguage);
    // console.log(input);
    // This is called when the file is done being read finished
    // console.log('There are %s lines in file %s', count, fileName);
  });
}

// mostVisit('pagecounts-20160606-170000.txt');

function mostVisitLanguage(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var currentLanguage = '';
  var result = new Object();

  rl.on('line', function(line) {
    // This is called for each line in file
    if (cleaning(line)) {
      var item = line.split(' ');
      var visit = parseInt(item[2]);
      var language = item[0];
      // console.log(visit);
      if (result.hasOwnProperty(language)) result[language] += visit;
      else result[language] = visit;
    }
    // console.log(result);
  });
  rl.on('close', function() {
    var newList = Object.keys(result);
    newList.sort(function(a, b) {
      return result[b] - result[a];
    })
    // console.log(newList);
    for (var i = 0; i < 3; i++) {
      console.log('the most visited language: ' + newList[i] + ' and its visit times is: ' + result[newList[i]]);
    }
  });
}
// mostVisitLanguage('pagecounts-20160606-170000.txt');


function mostVisitByLanguage(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var listEN = new Array();
  var listES = new Array();
  var listRU = new Array();
  rl.on('line', function(line) {
    // This is called for each line in file
    if (cleaning(line)) {
      var lineArr = line.split(' ');
      if (lineArr[0] === 'en') listEN.push(lineArr);
      else if (lineArr[0] === 'es') listES.push(lineArr);
      else if (lineArr[0] === 'ru') listRU.push(lineArr);
    }
  });
  rl.on('close', function() {
    listEN.sort(function(a, b) {
      return parseInt(b[2]) - parseInt(a[2]);
    })
    // console.log(listES);
    listES.sort(function(a, b) {
      return parseInt(b[2]) - parseInt(a[2]);
    })
    listRU.sort(function(a, b) {
      return parseInt(b[2]) - parseInt(a[2]);
    })
    // console.log(listEN);
    for (var i = 0; i < 10; i++) {
      console.log('the most visited page by EN: ' + listEN[i][1] + ' visits : ' + listEN[i][2]);
    }
    for (var i = 0; i < 10; i++) {
      console.log('the most visited page by ES: ' + listES[i][1] + ' visits : ' + listES[i][2]);
    }
    for (var i = 0; i < 10; i++) {
      console.log('the most visited page by RU: ' + listRU[i][1] + ' visits : ' + listRU[i][2]);
    }

  });
}
// mostVisitByLanguage('sample.data');
mostVisitByLanguage('pagecounts-20160606-170000.txt')
