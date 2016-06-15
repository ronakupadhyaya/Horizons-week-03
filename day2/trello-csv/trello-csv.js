var TRELLO_KEY = '2c835df60c347ec5fb715ae71c0c64b2';
var TRELLO_TOKEN = '25d1094f759b4df2659014357c6f4bfa1a65c88d959afa6c0023692c49fbaa2a';

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

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id = program.args[0];
// YOUR CODE HERE DONE

var board_id = program.args[0];
var csv_fname = program.args[1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(board_id, csv_fname) {
  var csvData = fs.readFileSync(csv_fname).toString();
  // console.log(csvData);
  
  csv.parse(csvData, { columns: true}, function(err, data){
  	console.log(data);

    var listOne = [];
    var listTwo = [];
    var listThree = [];

    for (var i=0; i<data.length; i++){
    	if(data[i]['List 1']!="") {
    		listOne.push(data[i]['List 1']);
    	}
	}
	for (var i=0; i<data.length; i++){
    	if(data[i]['List 2']!="") {
    		listTwo.push(data[i]['List 2']);
    	}
	}
	for (var i=0; i<data.length; i++){
    	if(data[i]['List 3']!="") {
    		listThree.push(data[i]['List 3']);
    	}
	}

	console.log(listOne);
	console.log(listTwo);
	console.log(listThree);
    // YOUR CODE HERE
  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
// program.command("test")
// 	.description ("test")
// 	.action(test);

// var test = function() {
	uploadToTrello('575afeb5e5f9a6bfbedd6202', 'sample.csv');
// }
