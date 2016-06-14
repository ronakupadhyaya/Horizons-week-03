var board_id = '575ac89d19234734f14f8a28'

var TRELLO_KEY = '7b4448e785fa10aa56b731990b873c49';
var TRELLO_TOKEN = 'bd3d9596b944d3944231ce0e7ac19e6bdb481ef3a83dac32402303a322975bc6';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander');


program.command('')
  .description("Download from Trello")
  .action(downloadFromTrello);


// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true

program.option('-u, --upload', 'Upload CSV');
program.option('-d, --download', 'Download CSV');

program.parse(process.argv);

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id = program.args[0];
// YOUR CODE HERE
var board_id;
var csv_fname;

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(board_id, csv_fname) {
  var csvData = fs.readFileSync(csv_fname).toString();

  csv.parse(csvData, { columns: true}, function(err, data){
    // console.log(data);
    data.forEach(function(e) {
    	console.log(e);
    })
    
  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE

  trello.getListsOnBoard(boardId ,function(err, lists) {
  	csv.stringify(lists, function(err, str) {
  		console.log(str);
  	});
  	printLists(lists);
  });

};

// downloadFromTrello(board_id);

uploadToTrello(board_id, 'sample.csv');


var printLists = function(lists) {
	var listsArr = [];
	console.log('\nlists from board ======================================');
  	lists.forEach(function(list) {
  		console.log('        list id: ' + list.id);
  		listsArr.push(list);
  	});

  	console.log('\ncards from board ======================================');
  	listsArr.forEach(function(list) {
  		
  		trello.getCardsOnList(list.id ,function(err, cards) {
			cards.forEach(function(card) {
		  		console.log('        cardId: ' + card.id);
		  	});
		});
  	});
};

