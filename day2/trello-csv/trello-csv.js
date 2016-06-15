var TRELLO_KEY = '63aa587ffd2bc71922dbbbdf72958ded';
var TRELLO_TOKEN = 'a347b3f17d5ca9479ee565757c0e5a80661b163dd7e2e67aaa7af535e4cd73f7';

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
    // YOUR CODE HERE
    var returnArr = [];
    for (var i = 0; i < data.length; i++) {
    	_.forEach(data[i], function(value, key) {
    		returnArr.push([key, value]);
    	})
    }

    var newObj = _.groupBy(returnArr,, function(array) {
    	return array[0];
    })
    _.forEach(newObj, function(value, key) {
    	var listName = key;
    	var cardNames = [];
    	for (var i = 0; i < value.length; i++) {
    		cardNames.push(value[i][1]);
    		}

    	
    	}
    })

  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// // when you get started!
 uploadToTrello(null, 'sample.csv');

 var newArr = [["b", 2],["a", 1],["c", 3], ["b", 3], ["b",9]];
 var newObj = _.groupBy(newArr,function(array) {
 	return array[0];
 });
 console.log(newObj);


