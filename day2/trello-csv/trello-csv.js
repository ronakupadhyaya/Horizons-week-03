var TRELLO_KEY = '8aa42f134ca8a6caeee22d86021ff209';
var TRELLO_TOKEN = '315f3998dee8268a7c268c06729abe01b357aa594aac81f8949d7ae450e20942';
var boardId = '553443e75bd17d64777d5b4c';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true
program.option('-u, --upload', 'Upload CSV'); //the <n> tells it to expect a variable after
program.option('-d, --download', 'Download CSV');
program.parse(process.argv); //string of the original thing we had

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
  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
	// trello.addBoard("name", "description",null,function(error,response));

	trello.getListsOnBoard(boardId, function(error,response){
		if (error) {
			console.log('Could not get lists:', error);
		} else {
			var listNames = [];
			var listIDS = [];
			var cardNames = [];
			console.log(response.length);
			for (var i = 0; i < response.length; i++) {

				listNames.push(response[i].name);
				listIDS.push(response[i].id);
				}

			for (var i = 0; i < listIDS.length; i++) {
				console.log(listIDS[i]);
				var newArray = [];
				trello.getCardsForList(listIDS[i], null, function(error, response) {
					if(error) {
						console.log('Could not get cards:', error);
					} else {
						for (var j = 0; j < response.length; j++) {
							// console.log("here");
							// console.log(response);
							newArray.push(response[j].name);
							//console.log(cardNames);	
						}
						cardNames.push(newArray);
						//console.log(cardNames);
					} 
					//console.log(cardNames); -functional
				})
				//console.log(cardNames);
			}
			//console.log(cardNames);	
		} 
	})



  // trello.getCardsOnList(listId, callback);
};

downloadFromTrello(boardId);

//NOTES:
//


