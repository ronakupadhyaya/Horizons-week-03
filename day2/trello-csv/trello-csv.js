"use strict";
var TRELLO_KEY = '918ffd0fb17b0eb4f1ea9b3aca401cb6';
var TRELLO_TOKEN = '0935dab413f586ab0c8e9a9ff25f9d1aed1b6a49b2ed355ccadceb08cf0eaf0c';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true
program.option('-u, --upload','Upload CSV')
program.option('-d, --download','Download CSV')
program.parse(process.argv);


// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var boardId = program.args[0];
// YOUR CODE HERE
var boardId = program.args[0];
var csvFilename = program.args[1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(boardId, csvFilename) {
  var csvData = fs.readFileSync(csvFilename).toString();
  csv.parse(csvData, {columns: true}, function(err, data){
    var allLists = [];
    var listNum = Object.keys(data[0]).length;
    for (var a=0;a<listNum;a++) {
      allLists.push([]);
    }
    for (var i=0;i<listNum;i++) {
      for (var j=0;j<data.length;j++) {
        var currentKey = Object.keys(data[i])[i]
        if (data[j][currentKey] !== "") {
          allLists[i][j] = data[j][currentKey];
        }
      }
    }
    // YOUR CODE HERE
    // console.log(allLists)
    // for (var i=0;i<allLists.length;i++) {
    //   trello.addListToBoard(boardId,"list ${i}",function() {
    //     console.log("added")
    //   })
    // }
      var listId = [];
      trello.getListsOnBoard(boardId).then(function(list) {
        var lists = list.slice(0,allLists.length);
        lists.forEach(function(list) {
          listId.push(list.id);
        })
        for (var i=0;i<listId.length;i++) {
          for (var j=0;j<allLists[i].length;j++) {
            trello.addCard(allLists[i][j],"",listId[i])
          }
        }
      });
      //   console.log(listId)
      //   for (var i=0;i<listId.length;i++) {
      //     for (var j=0;j<allLists[0].length;j++) {
      //       trello.getCardsOnList(listId[i]).then(function(cards) {
      //         for (var j=0;j<cards.length;j++) {
      //           trello.deleteCard(cards[j].id)
      //         }
      //       })
      //   for (var i=0;i<listId.length;i++) {
      //     for (var j=0;j<allLists[i].length;j++) {
      //       trello.addCard(allLists[i][j],"",listId[i])
      //     }
      //   }
      // });
      // for (var i=0;i<listId.length;i++) {
        // for (var j=0;j<allLists[0].length;j++) {
          // trello.getCardsOnList(listId[i]).then(function(cards) {
          //   for (var j=0;j<cards.length;j++) {
          //     trello.deleteCard(cards[j].id)
          //   }
          // })
      //     for (var j=0;j<allLists[0].length;j++) {
      //       trello.addCards(allLists[i][j],"",listId[i])
      //     }
      // }

  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
  var board = trello.getBoards(boardId);
  var listId = [];
  trello.getListsOnBoard(boardId).then(function(list) {
    var lists = list.slice(0,allLists.length);
    lists.forEach(function(list) {
      listId.push(list.id);
    });
  });
  console.log(csvData);
};

// This line is here for demo purposes, you should delete it
// when you get started!
if (program.upload) {
  uploadToTrello(boardId,"sample.csv");
}
if (program.download) {
  downloadFromTrello(boardId);
}
