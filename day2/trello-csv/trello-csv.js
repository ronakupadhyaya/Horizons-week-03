var TRELLO_KEY = '6ab6f057e91968d9dfef7321e8f09151';
var TRELLO_TOKEN = '14608edf5397438c6518870a014a9b8276bf857e63475a9a8f9f0ab057104cff';

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
  .option('-u, --upload' , 'uploading CSV');
program
  .option('-d, --download' , 'downloading from Trello');

program.parse(process.argv);

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id = program.args[0];
// YOUR CODE HERE
var board_id = program.args[0];
var csv_fname= program.args[1];


// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(board_id, csv_fname) {
  var csvData = fs.readFileSync(csv_fname).toString();

  csv.parse(csvData, {}, function(err, data){
    // YOUR CODE HERE
    	if(err) console.error(err)
		for (var i = 0 ; i < data[0].length; i++){
			addList(i);
		}
	});
};

var addList = function(i, data) {
 			trello.addListToBoard(board_id, data[0][i], function(err, list){
 				if(err) console.error(err)
// 			list.id => the ID of the list we got back after adding	
			for (var j = 1 ; j < data.length ; j++){
				if(data[j][i]){
				trello.addCard(data[j][i], "", list.id, function(card){
//		We don't really  need anything in this callback
 				});
			}
 		}
	});
  }
console.log(program);

// 3. download functionality - read trello data and output to csv

  // YOUR CODE HERE
  // var obj = new Object();
  // function getCard(keyCard, id, length, i){
		// trello.getCardsOnList(id, function(err, cardData){
  //     		if (err) console.log("error")
  //     			else {
  //     				for (var j = 0 ; j < cardData.length; j++)
  //     				obj[key].push(cardData[j].name);
  //     			}
  //     			if ( i=== length -1 && j === cardData.length - 1){
		// 			var listName = _.keys(obj);
		// 			var array = [];
		// 			array.push(listName);

		// 			var array = []
		// 			for(var keyCard in obj) {
		// 			array.push(obj[key]);
		// 			}
		// 			var newArr = _.zip.apply(null, array);
		// 			for ( var k = 0 ; k < newArr.length ; k++){
		// 			}
		// 			cvs.stringify(array)
		// 			fs.writeFileSync();
  //     			}
		// 	})
//   // }
//   var downloadFromTrello = function(boardId) {

// // 		trello.getListsOnBoard(boardId, function(error,data){
// // 			if (error) {
// // 	 		 } else {

// // 			for (var i = 0 ; i < data.length; i++){

// // 			var key = data[i].name;
// // 			obj[key] = [];
// // 			getCard(key, data[i].id, data.length, i);	      	
// //       	}
// // 	  }
// // 	})

// }

// downloadFromTrello();
var firstRow = [];
var ids = [];
var cards = {};

var downloadFromTrello = function(boardId) {

	var returnArray = [];
	trello.getListsOnBoard(boardId, function(err, lists){
		
		console.log(lists);
		for (var i = 0; i < lists.length ; i++){
			firstRow.push(lists[i].name);
			ids.push(lists[i].id)
			addCard(i, lists, cardsObj);
		
		}
	});
};


var addCard = function(i, cardsObj) {
	trello.getCardsOnList(lists[i].id , function(err, cards) {
			cards[lists[i].id] = [];
			for (var j = 0 ; j < cards.length; j++){
				cardsObj[lists[i].id].push(cards[j].name);
			}

			//this means that we have filles the cards
		if(_.keys(cardObj).length === lists.length){
			returnArray.push(firstRow);

		var max = _.max(_.values(cardsObj), function(v) {
			return v.length
		}).length;

		for(var x = 0 ; x < max ; x++){
			returnArray[x + 1] = [];
		}

			// looping accross each column:
			for(var k = 0 ; k < ids.length ; k++){
				var max = _.max(_.values(cardsObj), function(v) {return v.length}).length;
				for (var x = 0 ; x < max ; x++){
		returnArray[x+ 1] = [];
		}
		for (var k = 0 ; k < ids.length ; k++)
			returnArray[k+1] = returnArray[k + 1] || [];
			// looping accross each row:
			for (var l = 0 ; l < _.max(_.value(cardsObj[ids[k]].length; l++){
				returnArray[l+ 1][k].push(cardsObj[ids[k]][l])
			}
			//this represents the card by an ID
			cardsObj[ids[k]]
			}
		}
	});	
}
			




// This line is here for demo purposes, you should delete it
// when you get started!
// uploadToTrello(null, 'sample.csv');
if (program.upload){
	uploadToTrello(board_id, csv_fname); 
}
if (program.download){
	downloadFromTrello(boardId);
}
