var TRELLO_KEY = '5e2407568fc937f388b7a74b9829bbe2';
var TRELLO_TOKEN = 'bd9940a9dde8aaeb3371aa355906f2f2152c673902599dd2a398aa05ff5be0ad';

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

program.command('upload')
	.description("Upload")
	.action(uploadToTrello);

program.command('download')
	.description("Download")
	.action(downloadFromTrello);

program
	.option('-u, --upload', 'Upload CSV')
	.option('-d --download', 'Download CSV');

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
	csv.parse(csvData, {columns: true}, function(err, data){
		var listNames = _.keys(data[0]);
		_.map(listNames, function(name) {
			trello.addListToBoard(board_id, name, function(err, list){
				var listId = list.id;
				for (var j = 0; j < data.length; j ++){
					var cardName = data[j][name];
					if (cardName !== ""){
						trello.addCard(cardName, null, listId, function(err, data){
							console.log(data);
						})
					}
				}
			}); 
		})
	});
}

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {


<<<<<<< HEAD
	var input = [];
	trello.getListsOnBoard(boardId, function(err, lists){
=======
	// var input = [ [], [], [], [], [] ];
	var input = [];

	trello.getListsOnBoard(boardId, function(err, lists){
		// console.log(lists);
>>>>>>> origin/spark

		_.map(lists, function(list){
			var temp = [];
			temp.push(list['name']);
			var listId = list['id'];
			trello.getCardsOnList(listId, function(err, cards){
				_.map(cards, function(card){
					temp.push(card['name']);
				})
				input.push(temp);

				if (input.length === lists.length) {
					var toStringify = _.zip.apply(null, input);
					csv.stringify(toStringify, function(err, output) {
						fs.writeFileSync('file.csv', output);
					});
				}
			})
		})
	});
};

// This line is here for demo purposes, you should delete it
// when you get started!
// uploadToTrello(null, 'sample.csv');

// uploadToTrello("5760927e6c7f277045f70440", 'sample.csv');
// downloadFromTrello("5760927e6c7f277045f70440");
