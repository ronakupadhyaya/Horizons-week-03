"use strict";

var TRELLO_KEY = '1cc74de769bff1dcdd5f46400cebb1fa';
var TRELLO_TOKEN = '6371b685e35d090c35c9d0771d84988054851eaf4d53850a29c0ec797ef3949b';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);


var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true

program.parse(process.argv);

program
  .option('-u, --upload', 'Upload CSV');

program
  .option('-d, --download', 'Download CSV');
// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var boardId = program.args[0];
// YOUR CODE HERE
var boardId = program.args[0];
var csvFilename = program.args[1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(boardId, csvFilename) {
  var csvData = fs.readFileSync(csvFilename).toString();
  csv.parse(csvData, { columns: true}, function(err, data){
    console.log(data);
    // YOUR CODE HERE
    data.forEach(function(row) {

    })
    trello.addListToBoard(boardId, )
  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
uploadToTrello(null, 'sample.csv');
