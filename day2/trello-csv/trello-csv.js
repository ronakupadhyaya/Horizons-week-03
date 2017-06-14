"use strict";

var TRELLO_KEY = 'e95d7557c9376f072a09f5b3898d550f';
var TRELLO_TOKEN = '658465b21d26fbd203792a489cec3794206421b7ad85b8d7366f51f75dd58246';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true
program.option('-u, --upload', 'Upload CSV');
program.option('-d, --download', 'Download CSV');

program.parse(process.argv);

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var boardId = program.args[0];
var boardId = program.args[0];
var csvFilename = program.args[1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(boardId, csvFilename) {
  var csvData = fs.readFileSync(csvFilename).toString();

  csv.parse(csvData, { columns: true}, function(err, data){
    var keys = Object.keys(data[0]);
    var str = ""
    keys.forEach(function(listTitle, i) {
      str += listTitle
      //stops the last comma
      if(keys.length - 1 !== i) {
        str += ","
      }
    })

    data.forEach(function(lists) {
      var cardLine = ''
      keys.forEach(function(key, i){
        cardLine += lists[key]
        if(keys.length - 1 !== i) {
          str += ","
        }
      });
      str += cardLine
      str += '\n'
    });
    console.log(str);
  });
}

  // 3. download functionality - read trello data and output to csv
  var downloadFromTrello = function(boardId) {
    // YOUR CODE HERE
  };

  // This line is here for demo purposes, you should delete it
  // when you get started!
  uploadToTrello(null, 'sample.csv');
