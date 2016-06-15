var TRELLO_KEY = 'f3ef30bf02b3c046e2ffc5ee918f31a9';
var TRELLO_TOKEN = '44697fade08e7c9aa6ae3414f3d2dc4b8531bd2195ae86315207e49960fe13ba';

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
  .option('-u, --upload <n>', 'Uploading');
program
  .option('-d, --download <n>', 'Downloading');

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
  var lists;
  csv.parse(csvData, { columns: true}, function(err, data){
    console.log(data);
    data.forEach(function(list) {
      lists = _.keys(list);

    })
  lists.forEach(function(listName) {
    debugger;
    trello.addListToBoard(board_id, listName, function(err, response) {
      var listId = response.id;
      data.forEach(function(list) {
        var cardName = list[listName];
        trello.addCard(cardName, '', listId, function(err, response) {
          console.log(response);
        })
        });
      })

    })
  })
}

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
  var list = [];
  var data = [];
  // var data = [{'List1':'card1', 'List 2': 'card2', 'List 3': 'card3', 'Empty list': ''}]
  trello.getListsOnBoard(boardId, function(err, response) {
    // console.log(response);
    response.forEach(function(li) {
      var listName = li.name;
      list.push(listName);
      data.push(listName);
      var listId = li.id;
      trello.getCardsOnList(listId, function(err, response) {
        // console.log(response);
        response.forEach(function(re) {
          var cardName = re.name;
          // var listName = li.name;

          data.push(cardName)
        })
      })
    })
  })
  console.log(data);
  fs.writeFileSync(data.toString());
}
//     response.forEach(function(li) {
//       var listId = li.id;
//       list.forEach(function(l) {
//         if (li.name === l) {
//           trello.getCardsOnList(listId, callback) {
//             getCard(boardId, cardId, function(err, response) {
//             console.log(response);
//           })
//         }
//       })
//     })
//   })
// // Trello.prototype.getCard = function (boardId, cardId, callback) {
// };

// This line is here for demo purposes, you should delete it

// when you get started!
// uploadToTrello("55c0d91c813b3e918f6a418e", 'sample.csv');
downloadFromTrello("55c0d91c813b3e918f6a418e");
if (program.upload) {
  uploadToTrello("55c0d91c813b3e918f6a418e", 'sample.csv');
}
if (program.download) {
  downloadFromTrello("55c0d91c813b3e918f6a418e");
}
