var TRELLO_KEY = 'fcdb956dcea2df90bc262a6da6060841';
var TRELLO_TOKEN = 'bd8e6dcce884986f8f2d9492a41f7a6084513a1c26f27e28166bae455a07be28';

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
program.option('-d, --download', 'Download CSV');

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id = program.args[0];
// YOUR CODE HERE
program.parse(process.argv);
var board_id = program.args[0];
var csv_fname =  program.args[1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(board_id, csv_fname) {
  var csvData = fs.readFileSync(csv_fname).toString();

  csv.parse(csvData, { columns: true}, function(err, data){
    // YOUR CODE HERE
    //console.log(data);
    for (var key in data[0]) {
    	trello.addListToBoard(board_id, key, function(err, list) {
    		if (err) {
    			console.log(err)
    		} else {
    			var listId = list.id;
    			var name = list.name;
    			for (var i = 0; i < data.length; i++) {
    				if (data[i][name] !== "") {
		    		trello.addCard(data[i][name], "Description", listId, function(err, card) {
		    			if (err) {
		    				console.log(err);
		    			} else {
		    				console.log("success");
		    			}
		    		})
		    		}
		    	}
    		}
    	});
     }
   });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
  var input = [];
 	trello.getListsOnBoard(boardId, function(error, result){
	  	if(error){
	  		console.log(error);
	  	} else{
	  		_.map(result, function(list){
	  			var temp = [];
		  		temp.push(list.name);
		  		var listId = list.id;
		  		trello.getCardsOnList(listId, function(err, cards){
		  			_.map(cards, function(card){
		  				console.log(card.name);
		  				temp.push(card.name);
		  			});
		  			input.push(temp);
		  			if(input.length === result.length){
				  		console.log(input);
				  		var stringified = _.zip.apply(null, input);
				  		csv.stringify(stringified, function(err, output){
				  			//console.log(output);
			  			fs.writeFileSync('file.csv', output);
			  			});
	  				}
		  		});
	  		});
	  		
	  	}
	  	
	  });
};

// This line is here for demo purposes, you should delete it
// when you get started!
if (program.upload) {
	uploadToTrello(board_id, csv_fname);
}
if (program.download) {
	console.log('download');
	downloadFromTrello(board_id);
}
