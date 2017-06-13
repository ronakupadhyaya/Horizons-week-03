"use strict";

var TRELLO_KEY = '4b98ac3bc537d0fe61f87f2d1132d2bc';
var TRELLO_TOKEN = '28081629dee22f691f22ded54c3f6b3498622757880affd09dbabcbe10277f0e';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags


program.option('-u, --upload', 'Upload CSV');
program.option('-d, --download', 'Download CSV');


program.parse(process.argv);

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file



// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(boardId, csvFilename) {
  trello.getListsOnBoard(boardId, function(error, lists) {
          console.log(lists);
  })    
  var csvData = fs.readFileSync(csvFilename).toString();

  csv.parse(csvData, { columns: true}, function(err, data){
    console.log(data);
    // YOUR CODE HEREp
    // data.forEach(function(row) {
    //   _.each(row, function(value, key) {
    //     console.log("key:" + key + " Value: " + value);
    //     //trello.addListToBoard(boardId,);
        
    //   })

    // })
  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
//uploadToTrello(null, 'sample.csv');
//
if (program.upload) {
  var boardId = program.args[0];
  var csvFilename = program.args[1];
  uploadToTrello(boardId, csvFilename);
} else if (program.download) {
  var boardId = program.args[0];
  downloadFromTrello(boardId)
}
