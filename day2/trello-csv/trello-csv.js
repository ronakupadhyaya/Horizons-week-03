"use strict";

var TRELLO_KEY = '8f9c14b5b955f7f5a883f9f43b3ae569';
var TRELLO_TOKEN = 'b43b2eecd330e6e24fda61f33a6ef06c28d14deecf68e73f6b2e91e90204d6fa';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello("8f9c14b5b955f7f5a883f9f43b3ae569", "b43b2eecd330e6e24fda61f33a6ef06c28d14deecf68e73f6b2e91e90204d6fa");

var program = require('commander');

var axios = require('axios');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true
program.option('-u, --upload', 'Upload CSV');
program.option('-d, --download', 'Download CSV');

program.parse(process.argv);

// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var boardId = program.args[0];
// YOUR CODE HERE
var boardId = "5940b418a8a2fd4a2d8e9875";
var csvFilename = "sample.csv";

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(boardId, csvFilename) {
  var csvData = fs.readFileSync(csvFilename).toString();

  csv.parse(csvData, {columns: true}, function(err, data){
    for (var key in data[0]) {
      axios.post('https://api.trello.com/1/lists',
        {
            key : TRELLO_KEY,
            token : TRELLO_TOKEN,
            idBoard : boardId,
            name : key,
            pos : "bottom"
        }).then(function(resp) {
          console.log("it worked");
        }).catch(function(err){
          console.log(err)
        })
    }
  });
};


  // trello.addCard('Clean car', 'Wax on, wax off', myListId,
  //     function (error, trelloCard) {
  //         if (error) {
  //             console.log('Could not add card:', error);
  //         }
  //         else {
  //             console.log('Added card:', trelloCard);
  //         }
  //     });

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  axios.get('https://api.trello.com/1/boards/' + boardId,
    {
      params : {
        key : TRELLO_KEY,
        token : TRELLO_TOKEN,
        lists : 'all',
        cards : 'all'
      }
    }).then(function(resp) {
      var lists = resp.data.lists;
      var listsObj = {};
      lists.forEach(function(list) {
        listsObj[list.id] = [list.name];
      })
      var cards = resp.data.cards;
      cards.forEach(function(card) {
        listsObj[card.idList].push(card.name);
      })
      console.log(listsObj);
      var longestList = 0;
      for (var key in listsObj) {
        if (listsObj[key].length > longestList) {
          longestList = listsObj[key].length;
        }
      }
      var string = "";
      for (var i = 0; i < longestList; i++) {
        for (var key in listsObj) {
          if (listsObj[key][i]) {
            string += listsObj[key][i] + ",";
          }
        }
        string += "\n"
      }
      console.log(string);
    }).catch(function(err){
      console.log(err)
    })
};

// This line is here for demo purposes, you should delete it
// when you get started!
uploadToTrello(boardId, csvFilename);
//downloadFromTrello(boardId);
