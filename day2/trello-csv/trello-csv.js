var TRELLO_KEY = '500e3fcc61ba21f4f80c21e0d623b1e9';
var TRELLO_TOKEN = 'b1c4f6b88497aa98d82df92561e4ea853e19d76beb8c3e1164c4f11887af02d8';

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

program
	.option('-u, --upload',"Upload CSV",true);

program
	.option('-d, --download', "Download CSV",true);

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
    data.split('\n');
    for(var i=0;i<data.length;i++){
    	data[i].split(',');
    }
    var arr = arrayFlip(data);

    console.log(arr)


  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE

  var lists = trello.getListsOnBoard(boardId,listDownload(lists));
  for(var i=0;i<lists[0].length;i++){
  	lists[i].join(',');
  }
  lists.join('\n');
  return lists;

  
  

  function listDownload(lists){
  	var listArr = [];
  	for(var i=0;i<lists.length;i++){
  		var cards = trello.getCardsOnList(lists[i].listId,cardDownload(cards,[lists[i].listId]) 
  		listArr.push(cards);
  		listArr=arrayFlip(listArr);
  	}
  	return listArr;
  }

  function cardDownload(cards,listArr){
  	for(var i=0;i<cards.length;i++){
  		listArr.push(cards[i].name)
  	}
  	return listArr;
  }

  function arrayFlip(arr){
  	var big = [];
  	for(var i=0;i<arr.length;i++){
  		var little=[];
  		for(var n=0;n<arr[0].length;n++){
  			if(!arr[i][n]){ push('');}
  			little.push(arr[i][n]);
  		}
  		big.push(little);
  	}
  	return big;
  }


};

// This line is here for demo purposes, you should delete it
// when you get started!
//uploadToTrello(null, 'sample.csv');
