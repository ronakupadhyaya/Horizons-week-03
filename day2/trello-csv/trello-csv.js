var TRELLO_KEY = '15d4cc8a314d5d76847eda9cbaa2b878';
var TRELLO_TOKEN = '9ca61e0018bca1f70af01082773b2a8e40d88e43c87d32ad6bddd41ff8c0aff5';
var boardID = "576073a2d88366dc581a952a";

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
	.option('-u, --upload', 'Upload CSV')
	.option('-d, --download', 'Download CSV')
	.parse(process.argv);

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id = program.args[0];
// YOUR CODE HERE
var board_id = program.args[0]
// program.args[0];
var csv_fname = program.args[1];


if (program.upload) uploadToTrello();
else if (program.download) downloadFromTrello();
// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.



function uploadToTrello() {
  var csvData = fs.readFileSync(csv_fname).toString();

  csv.parse(csvData, { columns: true}, function(err, data){
  	
    console.log(data);
    // YOUR CODE HERE

    var keys = _.keys(data[0]); // [ ]
 
    (function addList (keys, index) { // index here is the list index
    	var key = keys[index];
		
		if(index == keys.length){
			return
		} else {
			trello.addListToBoard(board_id, key, function (error, trelloList) {
				if (error) console.log("Error");
				else {
					
					(function addCard(cardIndex){
						if(cardIndex == data.length){
							return;
						}

						trello.addCard(data[cardIndex][key], "", trelloList.id, function(error, trelloCard) {
								if (error) console.log("Error");
								else {
									console.log("Success");
									addCard(++cardIndex);
								}
							});
						
					})(0);
			    	addList(keys, ++index);
				}
			});
		}
	})(keys, 0);

  });
};

// 3. download functionality - read trello data and output to csv
function downloadFromTrello(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
