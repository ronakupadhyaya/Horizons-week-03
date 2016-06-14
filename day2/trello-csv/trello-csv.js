"use strict";

var TRELLO_KEY = 'edfce61a35ee148376aa1da3f87d4bc7';
var TRELLO_TOKEN = '532eb78c623cedb55b742a112e93f15b4104792879d1d1e34b8b7af6e9dc72e7';

var program = require('commander');
var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var bId = '5022f7272547168f2d183e16';

var boardId;
var csvName;
var collect = function(val) {
  boardId = val;
};

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true
program
  .usage("node trello-csv.js [-u || --upload || -d || --download]  [board id] [csv file]")
  .option('-u, --upload [value]', 'Upload a csv as a trello board', collect)
  .option('-d, --download [value]', 'Download a trello board as a csv', collect) 
  .parse(process.argv);

var opFlag;

if (program.upload) {
	opFlag = 'u';
} 

else if (program.download){
	opFlag = 'd';
} 

else {
	console.log("Please supply an upload or download flag");
	process.exit();
}

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id = program.args[0];
// YOUR CODE HERE
csvName = process.argv[process.argv.length - 1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(bId, fName) {
  var csvData = fs.readFileSync(fName).toString();
  
  csv.parse(csvData, { columns: true}, function(err, data){
    // build obj = { 'listName': [ 'card1 Name', ...], ...}
    var cardsInList = _.reduce(data, function(prev, currItem) {
      for (var key in currItem) {
        if (!prev[key]) {
          prev[key] = [];
        } 
        prev[key].push(currItem[key]);
      }
      return prev;
    }, {});
    _.mapObject(cardsInList, function(cards, listName) {
      trello.addListToBoard(bId, listName, function(err, trelloList) {

        cards.forEach(function(cardName) {
          trello.addCard(cardName, '', trelloList.id, function(err, cardData) {
            
          });
        });
      });
    });
  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(bId, fName) {
  trello.getListsOnBoard(bId, function(err, lists) {
    
    var cardsByListName = {};
    console.log(boardId);
    lists.forEach(function(list) {
      trello.getCardsOnList(list.id).then(function(cards) {
        cards = cards.map(function(card) {
          return card.name;
        });
        cardsByListName[list.name] = cards;
        if (_.keys(cardsByListName).length === lists.length) {
          
          console.log(_.zip.apply(null, _.values(cardsByListName)));
          // console.log(_.zip());
          csv.stringify(_.zip.apply(null, _.values(cardsByListName)), {
              header: true,
              columns: _.keys(cardsByListName)
            },
            function(err, output) {
              // save output to csv
              console.log(output);
              fs.writeFileSync(fName, output);
          });
        }
        
      }, console.log);
    });

  });
};

// This line is here for demo purposes, you should delete it
// when you get started!
return {
  'u': uploadToTrello,
  'd': downloadFromTrello
}[opFlag](boardId, csvName);
