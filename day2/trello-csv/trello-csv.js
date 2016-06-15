var TRELLO_KEY = '424ce43d091e80906469887476418f5b';
var TRELLO_TOKEN = 'd65ed174b1eb67ce67c2f2b865c5c1b76a068a49e72e764d8e587b4408485e23';

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
// YOUR CODE HERE
var board_id = program.args[0];
var csv_fname = program.args[1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(board_id, csv_fname) {
  var csvData = fs.readFileSync(csv_fname).toString();

  csv.parse(csvData, { columns: true}, function(err, data){
    console.log(data);
    var array = [];
    for (var i=0; i<data.length; i++){
	    _.forEach(data[i], function(value, key) {
	    	var tempArray = [key,value];
	    	array.push(tempArray);
	    });
	    console.log(array);
	  };
		// var sorted = array.sort();
		// console.log(sorted);
	var finalSort = _.groupBy(array, function(arr){
			return arr[i];
	  });
		console.log(finalSort);
	});
}

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
uploadToTrello(null, 'sample.csv');
