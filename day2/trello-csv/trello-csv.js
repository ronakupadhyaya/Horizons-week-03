"use strict";

var TRELLO_KEY = '062af8f1e0932c8c66abc921587b7338';
var TRELLO_TOKEN = '477e0c955183d0ef8aa927dbaf3bb85e783f49c91897a797a304b1fb99ba554d';

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
	.option('-d, --download', 'Download Trello Board to CSV file');

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
    console.log(data);

    var start = 1;
    data.forEach(function(item) {
    	_.forEach(function(list, card) {
    		if (start === 1) {
    			trello.addListToBoard(boardId, list, );
    		}
    		trello.addCard(card, 'no description', )
    	});
    });
  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
uploadToTrello(null,"sample.csv");
