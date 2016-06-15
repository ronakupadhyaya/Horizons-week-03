var TRELLO_KEY = "bd9cc6447063de7a24630d388840631d";
var TRELLO_TOKEN = "918dc72c847dfe8343d0df54344ccab24ffcfe3904c9247b5c6ca8ac94e9dd43";
var boar_did = "575b5729ef78e129edc4dc01" 
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
  .option('-u, --upload', 'uploading');
program
  .option('-u, --download', 'downloading');
program.parse(process.argv);

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id = program.args[0];
// YOUR CODE HERE
var board_id = program.arg[0];
var csv_fname = program.arg[1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(board_id, csv_fname) {
  var csvData = fs.readFileSync(csv_fname).toString();

  csv.parse(csvData, { columns: true}, function(err, data){
    console.log(data);
    var cards = [];
    data.forEach(function(element) {
    	for(var key in element) {
    		cards[key].push(element[key]);
    	}
    });
    debugger;
    for(var key in cards) {
    	trello.addListToBoard(board_id, cards[key].idList, function(err, sendList) {
    	});
    	trello.addCard(allCards[key].name, '', cards[key].idList, function(err, sendCard) {
    	});
    }

  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
  trello.getListsOnBoard(boardId ,function(err, lists) {
  	csv.stringify(lists, function(err, str) {
  		console.log(str);
  		function(err, csvData) {
              fs.writeFileSync(fileSave, csvData);
         }
  	});
  	printLists(lists);
  });
​
};
};

// This line is here for demo purposes, you should delete it
// when you get started!
//uploadToTrello(null, 'sample.csv');
if (program.upload) {
	uploaToTorello();
}
if (program.download) {
	downloadFromTrello();
}