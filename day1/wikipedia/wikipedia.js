"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

var __filename = process.argv[2]
// Example code for reading a file line by line and counting
// the lines in it.
function countLines(fileName, lang) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  var bank = [];
  rl.on('line', function(line) {
    var pieces = line.split(' ');
    if (pieces[0].indexOf('.') !== -1 || pieces[1].indexOf(':') !== -1) {
      return
    }
    if (lang === "all" || lang.indexOf(pieces[0]) !== -1) {
      if (parseInt(pieces[2]) > currentMax) {
        currentMax = parseInt(pieces[2]);
        currentPage = pieces[0] + "_" + pieces[1];
      }
      count++;
    }
  });
  rl.on('close', function() {
    console.log("The page with the most hits is " + currentPage + " with " + currentMax.toString() + " hits.");
    console.log('There are %s lines in file %s', count, fileName);
  });
}

function countLanguageLines(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  var objbank = {};
  rl.on('line', function(line) {
    var pieces = line.split(' ');
    var language = pieces[0];
    for (var i = 0; i < pieces[0].length; i++) {
      if (pieces[0][i] === '.' || pieces[1][i] === ":") {
        return
      }
    }
    if (objbank[language] !== undefined) {
      objbank[language] += parseInt(pieces[2])
    } else {
      objbank[language] = parseInt(pieces[2])
    }
    count++;
  });
  rl.on('close', function(bank) {
    var arrbank = _.pairs(objbank);
    // console.log(objbank);
    // console.log(arrbank);
    var arrbank = arrbank.sort(function(a, b) {
      return a[1] > b[1] ? -1 : 1
    })
    console.log("The language with the most hits is " + arrbank[0][0] + " with " + arrbank[0][1].toString() + " hits.");
    console.log('There are %s lines in file %s', count, fileName);
    return arrbank
  });
  return arrbank
}

function sorter(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var bank = [];
  rl.on('line', function(line) {
    var pieces = line.split(' ');
    if (pieces[0].indexOf('.') !== -1 || pieces[1].indexOf(':') !== -1) {
      return
    }
    var lineobj = {
      "language": pieces[0],
      "pageName": pieces[1],
      "hits": pieces[2]
    };
    bank.push(lineobj);
  });
  rl.on('close', function() {
    bank.sort(function(a, b) {
      return b.hits - a.hits
    })
    // console.log(bank);
    return bank
  });
  // console.log(bank);
  return bank
}

// countLines(__filename);
sorter(__filename);
