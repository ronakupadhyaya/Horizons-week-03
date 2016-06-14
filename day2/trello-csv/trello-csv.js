var TRELLO_KEY = '1d49837dac7b60d4962aa0f70ac778d2';
var TRELLO_TOKEN = '03380b974135f4f2e4289714d854f08f670f81598af4ad01fd249112bcf3ac81';

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
  .option('-u, --upload', 'Upload CSV');
program
  .option('-d, --download', 'Download CSV');


program.parse(process.argv);

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id = program.args[0];
// YOUR CODE HERE
var board_id = program.args[0];
var csv_fname = program.args[1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(board_id, csv_fname) {
  var csvData = fs.readFileSync(csv_fname).toString();
  csv.parse(csvData, { columns: true}, function(err, data){
    console.log(data);
    // YOUR CODE HERE
    // trello.getListsOnBoard("575b0aa92e8a4e923fa2fde3", function(error, response){
    // 	console.log(response);
    // })
  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
uploadToTrello("575b0aa92e8a4e923fa2fde3", 'sample.csv');
