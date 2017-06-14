"use strict";

var TRELLO_KEY = '0b9f4bfb69684a4b709c4af0e750ded2';
var TRELLO_TOKEN = '93b2d1b3ac2588e4e35c44166fb0c8ecba1c5efab0ac8805ac4438fe31004627';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true
program
  .option('-u, --upload', 'Upload CSV', uploadToTrello, `${boardId}`,  `${csvFilename}`);

  program
    .option('-d, --download', 'Download CSV');


program.parse(process.argv);

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var boardId = program.args[0];
// YOUR CODE HERE
var boardId = program.args[0];
var csvFilename = program.args[1];
// console.log(boardId);
//
// function upload(){
//   uploadToTrello(boardId,csvFilename);
// }
// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(boardId, csvFilename) {
  var csvData = fs.readFileSync(csvFilename).toString();

  csv.parse(csvData, { columns: true}, function(err, data){
    // console.log(data);
    var cardnum=1;
    data.forEach(function(cardrow){
      var numlists = cardrow.length;
      cardnum++;
    })
    // YOUR CODE HERE

  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
uploadToTrello(null, 'sample.csv');
