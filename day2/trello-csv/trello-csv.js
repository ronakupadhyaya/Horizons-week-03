"use strict";

var TRELLO_KEY = 'f2495df5708dfba77356ac0bbc733091';
var TRELLO_TOKEN = '71d9359410942f5c0d36beff83201402c6f525f4a766596f7e8f915f2474fb01';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true
program.option('-u, --upload', "Upload CSV")
       .option('-d, --download', "Download CSV");

program.parse(process.argv);

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
    var listNames = Object.keys(data[0]);

    // Add lists
    listNames.forEach(function(list_name) {
      trello.addListToBoard(boardId, list_name, function(err, new_list) {
        var list_id = new_list.id;

        // Add all cards into the list
        data.forEach(function(row) {
          if (row[list_name] !== "") {
              trello.addCard(row[list_name], "", list_id);
          }
        });

      });
    });

  });

};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  var board_array = [];
  trello.getListsOnBoard(boardId, function(err, lists) {
    // Create headers
    var list_names = [];
    lists.forEach(function(list) {
      list_names.push(list.name);
    });
    board_array.push(list_names);

console.log("max", max_number_of_cards);
    // Add cards
    lists.forEach(function(list) {
      var row = 0;
      trello.getCardsOnList(list.id, function(err, card) {
        if (board_array[row]) {
          board_array[row++].push(card.name); // Add card into the array if the array exists
        } else {
          // I give up
        }

      });
    });

  });
};

// This line is here for demo purposes, you should delete it
// when you get started!
// uploadToTrello(null, 'sample.csv');
if (program.upload) {
  uploadToTrello(boardId, csvFilename);
} else if (program.download) {
  downloadFromTrello(boardId);
}
