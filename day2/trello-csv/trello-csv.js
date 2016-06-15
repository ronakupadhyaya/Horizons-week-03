var TRELLO_KEY = 'e102e4440518b10d390f8a4fcb3ab1a7';
var TRELLO_TOKEN = '647d5832b164367f98f43661ba491ecec4683cc6f0be5f107fed834b869286bd';
var boardId = '5609baaf54db7cf94f9c947c';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true
program.option('-u, --upload', 'Upload CSV');
program.option('-d, --download', 'Download from Trello');
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

  csv.parse(csvData, {}, function(err, data){
	if (err) console.log(err);
  	for(var i = 0; i< data[0].length; i++) {
  		addList(i, data);
	}
  });
};

var addList = function(i, data) {
	console.log(i)
	trello.addListToBoard(board_id, data[0][i], function(err, list) {
		if (err) console.log(err);
		for(var j = 1; j < data.length; j++) {
			if (data[j][i]) {
  				trello.addCard(data[j][i], "", list.id, function(card) {

  				});
			}
  		}
	});
}

		//debugger;
// 3. download functionality - read trello data and output to csv
// var downloadFromTrello = function(boardId) {
// 	// trello.addBoard("name", "description",null,function(error,response));

// 	trello.getListsOnBoard(boardId, function(error,response){
// 		if (error) {
// 			//console.log('Could not get lists:', error);
// 		} else {
// 			var listNames = [];
// 			var listIDS = [];
// 			var cardNames = [];
// 			var counter = 0;
// 			var iresponse = response.length;
// 			console.log(response.length);
// 			for (var i = 0; i < response.length; i++) {

// 				listNames.push(response[i].name);
// 				listIDS.push(response[i].id);
// 				}

// 			for (var i = 0; i < listIDS.length; i++) {
// 				//console.log(listIDS[i]);
// 				//var newArray = [];
// 				trello.getCardsForList(listIDS[i], null, function(error, response) {
// 					counter++;
// 					if(error) {
// 						console.log('Could not get cards:', error);
// 					} else {
// 						//console.log("hello");
// 						var newArray = [];
// 						for (var j = 0; j < response.length; j++) {
// 							console.log(response.length);
// 							// console.log("here");
// 							// console.log(response);
// 							newArray.push(response[j].name);
// 							//console.log(cardNames);	
// 						}
// 						cardNames.push(newArray);
// 						//console.log("i = " + counter + ", iresponse= " + iresponse);
// 						//console.log(iresponse);
// 						if (i === iresponse) {
// 							//console.log("do not print me");
// 							//console.log(cardNames);
// 						}
// 					} 
// 					//console.log(cardNames);//-functional
// 				})
// 				//console.log(cardNames); - empty arrays
// 			}
// 			//console.log(cardNames);	
// 		} 
// 	})



//   // trello.getCardsOnList(listId, callback);
// };

//downloadFromTrello(boardId);
var firstRow = [];
var ids = [];
var cardsObj = {};


var downloadFromTrello = function (boardId) {
	var returnArray = []''
	trello.getListsOnBoard(boardId, function(err, lists) {
		for (var i =0; i < lists.length; i++) {
			firstRow.push(lists[i].name);
			addCard(i, lists, cards);
		}
	})
}
var addCard = function(i, lists, cardsObj) {
	trello.getCardsOnList(lists[id], function(err, cards) {
		cardsObj[lists[i].id] = [];
		for (var j = 0; j < cards.length; j++) {
			cardsObj[lists[i].id].push(cards[j].name);
		}

		if (_.keys(caardsObj).length === lists.length) {
			returnArray.push(firstRow);
			for(var k = 0; k < ids.length; k++) {
				returnArray[k+1] = returnArray[k+1] || [];
				for(var l = 0; l < cardsObj[ids[k]].length; l++) {
					returnArray[l+1][k].push(cardsObj[ids[k]][l]);
				}
			}
		}
	});
}

if (program.upload) {
	uploadToTrello(board_id, csv_fname);
} else  if (program.download) {
	downloadFromTrello(board_id);
}