var TRELLO_KEY = "2dc18a58ad55028b87b77fe7942e6ad2";
var TRELLO_TOKEN = "1dbda8ff8b8a63d9c1c7bcda29afc4b527ee7f34dde00d8d9a7dce52537522e8";

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
program.parse(process.argv);

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id = program.args[0];
var board_id = program.args[0];
var csv_fname = program.args[1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(board_id, csv_fname) {
  var csvData = fs.readFileSync(csv_fname).toString();
  csv.parse(csvData, { columns: true}, function(err, data){
  	//console.log(data);
    for(var key in data[0]){
    	//console.log(key);
    	debugger;
    	trello.addListToBoard(board_id, key, function(error, list){
    		if(error){
    			console.log(error);
    		} else{
    			var listId = list.id;
    			var name = list.name;
    			// //console.log(key);
    			// console.log(list.name);

    			
    			for(var i = 0; i < data.length; i++){
    				console.log(data[i][name]);
    				if(data[i][name] !== ""){
    					trello.addCard(data[i][name], "I'm a card", listId, function(error, card){
			    			if(error){
			    				console.log(error);
			    			} else {
			    				console.log("success");
			    			}
			    		});
    				}
		    	}
    		}
    	});
    }
  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {

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

if(program.upload){
	uploadToTrello(board_id, csv_fname);
}
if(program.download){
	downloadFromTrello(board_id);
}
