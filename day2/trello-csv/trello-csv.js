var TRELLO_KEY = '4426aaac3e3ddf941ff93930255038d8';
var TRELLO_TOKEN = '2a9829c4a7de4076e6c22b25237f356586253597b6760047cdddc0225923eaae';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander'); /// allows for flags to be read

///npm install: installs things
//on the terminal: using tab will finish the expression 
//package.json : important for packaging csv files... porperty within= 
//dependencies: things need to get for package to work
//meta-data: data within/about data

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true

//////////////need flags
program.option('-u','--upload','Upload CSV') //short form, long form, description
program.option('-d','--download','Download CSV')
program.parse(process.argv);


// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id = program.args[0];
// YOUR CODE HERE
var board_id=program.args[0];  //program.args: everything AFTER the flag... 
//commander grabs remaining arguments and put them in this array
//each spaced out string parsd out into array (?)
var csv_fname=program.args[1]; ///know csv filing second because was specified in upper lines

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(board_id, csv_fname) {
	var csvData = fs.readFileSync(csv_fname).toString();
////EVERY NODE IS ASYNCHRONOUS UNLESS OTHERWISE STATED//////////

	csv.parse(csvData, {}, function(err, data){ //columns: true sets into array of objects which makes messier
	//Ethan's solution will NOT use columns.... without get array of arrays! 
	//first row accross is lists, rows down are cards within each list
	if(err) console.log(err); //shorthand for if, only works for one-liners
	for (var i=0; i<data.length; i++){
		addList(i,data); ///call only after success so that i values correspond with proper places in the list/cards
	}
});
};

var addList = function(i,data){
				///want i NOW not what it will be... call add card NOW with current value of i
		trello.addListToBoard(board_id,data[0][i],function(err,list){/// array of lists; list in function
			//refers to trello response for list.id
			if(err) console.log(err);
			for(j=1; j<data.length; j++){ //iterate down each column across the rows (all cards in list then move left)
				if(data[j][i]){ //only print card if exists (not an mpty string)
				trello.addCard(data[j][i], "", list.id, function(err,card){
					console.log(card)
				})
			}
			}

		})
}

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
  if(program.upload){
  	uploadToTrello(board_id,csv_frame);
  }
  else if (porgram.download){
  	downloadFromTrello(board_id);
  }
};

// This line is here for demo purposes, you should delete it
// when you get started!
uploadToTrello(null, 'sample.csv');

