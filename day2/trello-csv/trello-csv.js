var TRELLO_KEY = 'YOUR TRELLO KEY HERE';
var TRELLO_TOKEN = 'YOUR TRELLO KEY HERE';

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
console.log(program)

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id = program.args[0];
// YOUR CODE HERE
var board_id=program.args[0];
var csv_fname=program.args[1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(board_id, csv_fname) {
	var csvData = fs.readFileSync(csv_fname).toString();

	csv.parse(csvData, { columns: true}, function(err, data){
    //console.log(data);
    // YOUR CODE HERE
   var returnArr=[];
   for(var i =0; i<data.length; i++){
   	var arrTemp=[];
   	_.forEach(data[i],function(value, key){
   		var arrTemp=[key,value]
   		returnArr.push(arrTemp)
   	});
   }
   var y = _.groupBy(returnArr,function(name){
   	return name[0];
   })
   console.log(y)

});
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
uploadToTrello(null, 'sample.csv');
