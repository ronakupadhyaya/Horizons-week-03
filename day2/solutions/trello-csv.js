var parseArgs = require('minimist');
var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');
var Trello = require('trello');
var trello = new Trello("11d4c310a21b6f41026961f896401dde", "981a0c7de01ca019aef350df85ee2db70e094fdb0fca5d08a926f07d710531bf");

var bId = "575f32662e1339b789d9f676";

// instantiate key objects
var args = parseArgs(process.argv.slice(2));

// 1. parse cmdline args
var board_id = args.upload || args.u || args.download || args.d;
var csv_fname = args._[0];
var opFlag = (args.upload !== undefined || args.u !== undefined) ? 'u' : 'd';

if (board_id === undefined || csv_fname === undefined) {
  console.log("Usage: node trello-csv.js [-u/--upload/ || -d/--download] [board id] [csv file]");
  process.exit();
}

// console.log(opFlag);

// 1. upload functionality - read csv and upload to trello
var uploadToTrello = function(board_id) {
  var csvData = fs.readFileSync(csv_fname).toString();
  
  csv.parse(csvData, { columns: true}, function(err, data){
    // console.log(data);
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
    // console.log(cardsInList);
    _.mapObject(cardsInList, function(cards, listName) {
      trello.addListToBoard(board_id, listName, function(err, trelloList) {
        // console.log(trelloList);
        cards.forEach(function(cardName) {
          trello.addCard(cardName, '', trelloList.id, function(err, cardData) {
            
          });
        });
      });
    });
  });
};

// 1. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // console.log(boardId);
  
  // write list names to file
  trello.getListsOnBoard(boardId, function(err, lists) {
    // console.log(lists);
    
    var cardsByListId = {};
    lists.forEach(function(list) {
      trello.getCardsOnList(list.id, function(err, cards) {
        // console.log(cards);
        cardsByListId[list.id] = cards;
        console.log(cardsByListId);
      });
    });
    
    // lists.forEach(function(listData) {
    //   var listName = listData.name;
    //   trello.getCardsForList(listData.id, function(err, cards) {
    //     console.log(cards);
    //   });
    // });
  });
  
  // group cards by listid,
  
};

return {
  'u': uploadToTrello,
  'd': downloadFromTrello
}[opFlag](board_id, csv_fname);
