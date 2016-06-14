var TRELLO_KEY = '0bcc95c82f5216eed9742694918ea858';
var TRELLO_TOKEN = 'd65dd77971eec1d66ad0da8dbe16ac9b93aae4fc666017df4bc370156e324013';
var boardId = "575b03e2c107d8252bc38af5";

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
  .option('-i, --id', 'Specify id of task');
program
  .option('-p, --priority', 'Specify task priority');


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
  console.log(csvData);
  csv.parse(csvData, { columns: true}, function(err, data){
    console.log(data);
    // YOUR CODE HERE
    trello.getListsOnBoard(board_id, function(error, response) {
    	console.log("list response: " + response);
    });
  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
uploadToTrello("575b03e2c107d8252bc38af5", 'sample.csv');
