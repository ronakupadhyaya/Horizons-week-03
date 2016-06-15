var TRELLO_KEY = 'e34966f53e55adb205250c55bc74c59b';
var TRELLO_TOKEN = ' a67189d865bdf0001473a7ab3a6b3d1c8f5665dc2553537e287fec57cca2fd6d';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true

program.parse(process.argv); // 

program
	.option('-u, --upload <n>', 'Upload CSV') // we aren't changing to Nos. so why 
program
	.option('-d, --download <n>','Download CSV')


// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id =  ;
// YOUR CODE HERE

var board_id = program.args[0];
var csv_fname = program.args[1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(board_id, csv_fname) {
  var csvData = fs.readFileSync(csv_fname).toString();

  csv.parse(csvData, { columns: true}, function(err, data){
    console.log(data); // csvdata take the file and puts it into a string 
    // YOUR CODE HERE
    // trello client does AJAX under the hood for us --> trello.addCard w/ list id 
    // posts 
    for (var i = 0; i < data.length; i++) {
    	for(var key in data[i]){
    		console.log(key + data[i][key])
    	} //map each of the lists on here onto our board 
    		//mapobject(); keys are the list names, 
    			//look at _reduce
    				// function with reduce loops through all the key value pairs 
    				//and matches up the ones with the same key => the keys here are the lists 
				// for any time the key is = list 1, put into an array => create array forEach key 
    }





  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
uploadToTrello(null, 'sample.csv');
