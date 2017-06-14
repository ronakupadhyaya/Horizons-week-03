"use strict";

var TRELLO_KEY = 'b7fc51a8b60bd1d01c9d23d434211634';
var TRELLO_TOKEN = '011499f7d5dc33683dac38427ca1fe9716a10b50ba925de20a28860c15cc1466';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');

var program = require('commander');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true

program
  .option('-u, --upload', 'Upload CSV')
  .option('-d, --download', 'Download Board')
  .parse(process.argv);


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

    var keys = Object.keys(data[0]);
    var counter = keys.length;
    var arrayListPromises = Promise.resolve();

    for (var a = keys.length; a >= 0; a--) {
      var cardListPromises = Promise.resolve();
      console.log("hello")
      var counter2 = data.length;
      if (a === 0) {
        arrayListPromises = arrayListPromises.then(function (list) {
          console.log(list);
          if (list !== undefined) {
            for (var b = data.length; b > 0; b--) {
              counter2--;
              console.log(counter2)
              console.log(a)
              if (data[counter2][list.name] !== "") {
                cardListPromises = cardListPromises.then(function(card) {
                  return trello.addCard(data[counter2][list.name], "N/A", list.id);
                })
              } else {
                break;
              }
            }
          }
        });
      } else {
        arrayListPromises = arrayListPromises.then(function (list) {
          console.log(list);
          counter--;
          if (list !== undefined) {
            for (var b = data.length; b > 0; b--) {
              counter2--;
              console.log(counter2)
              if (data[counter2][list.name] !== "") {
                cardListPromises = cardListPromises.then(function(card) {
                  return trello.addCard(data[counter2][list.name], "N/A", list.id);
                })
              } else {
                break;
              }
            }
          }
          return trello.addListToBoard(boardId,keys[counter]);
        });
      }
    }
    console.log("Finished!");
  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
uploadToTrello('5939becbba3de9b0274f527d', 'sample.csv');
