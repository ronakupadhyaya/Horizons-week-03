"use strict";

var TRELLO_KEY = '53f805b9774bf278550c14793c55b30d';
var TRELLO_TOKEN = '641c5ac70fff182bbb5aef3552e1c1b953f0f6e844b1f42bb089bd7cb9f35495';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true
program.option("-u, --upload", "Upload a trello board as CSV")
program.option("-d, --download", "Download a trello board as CSV")

program.parse(process.argv);

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var boardId = program.args[0];
// YOUR CODE HERE
var boardId = "5939c22c803d672eddfbc7d6";
var csvFilename = process.argv[process.argv.length-1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(boardId, csvFilename) {
  var csvData = fs.readFileSync(csvFilename).toString();

  csv.parse(csvData, { columns: true}, function(err, data){
    console.log(data);
    // YOUR CODE HERE
  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
	trello.makeRequest("GET", "/1/boards/" + boardId, { webhooks: true }, function(err, data) {
		console.log(err, data);
		dataToCsv(data)
	});
};

// This line is here for demo purposes, you should delete it
// when you get started!

if (program.upload) {
  uploadToTrello(boardId, csvFilename);
} else if (program.download){
	console.log(trello)
	console.log(Trello)
  downloadFromTrello(boardId);
} else {
  console.log("Please supply an upload or download flag");
  process.exit();
}

function dataToCsv(data) {
	console.log(data);

}