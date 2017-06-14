"use strict";

var TRELLO_KEY = '43f0075fe9030b2389fe1fd4f4109899';
var TRELLO_TOKEN = 'c171cfec1c6c80343fc87f21e678dd9e60a8aae7c0835a785343a0382fe90f7d';

var fs = require('fs');
var csv = require('csv');
var generate = require('csv-generate');
var _ = require('underscore');

var csvjson = require('csvjson');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var csv = require('csv');

var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true


program
  .option('-u, --upload', 'Upload CSV')
  .option('-d,--download', 'download file')

program.parse(process.argv);



// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var boardId = program.args[0];
// YOUR CODE HERE
var boardId = "59407794a57ad72d0ca52b58";
var csvFilename;
//var listObj = {};

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.

var uploadToTrello = function (boardId, csvFilename) {

  var csvData = fs.readFileSync(csvFilename).toString();

  csv.parse(csvData, {
    columns: true
  }, function (err, data) {
    var listNames = Object.keys(data[0]);

    // Add lists
    listNames.forEach(function (list_name) {
      trello.addListToBoard(boardId, list_name, function (err, new_list) {
        var list_id = new_list.id;

        // Add all cards into the list
        data.forEach(function (row) {
          if (row[list_name] !== "") {
            trello.addCard(row[list_name], "", list_id);
          }
        });

      });
    });

  });

};

//////////////*************//////////////////////
// var count = 0;
// var uploadToTrello = function (boardId, csvFilename) {
//   var csvData = fs.readFileSync(csvFilename).toString();
//
//   csv.parse(csvData, {
//     columns: true
//   }, function (err, data) {
//     console.log(data);
//     // console.log(trello);
//     // trello.addCard("benjamin1", "none", "5940790b5ad0a5353bc969e6", function (error, card) {
//     //   console.log(card);
//     // });
//     data.forEach(function (obj) {
//       trello.addListToBoard("59407794a57ad72d0ca52b58", obj[prop1], function (error, list) {
//           trello.addListToBoard("59407794a57ad72d0ca52b58", prop, function (error, list) {
//
//
//       for (var prop in obj) {
//         if (listObj.hasOwnProperty(prop)) {
//           // TODO: add card to the id
//
//           //trello.addCard("benjamin1", "none", "5940790b5ad0a5353bc969e6", function (error, card) {
//           //   console.log(card);
//           // });
//         } else {
//             trello.addListToBoard("59407794a57ad72d0ca52b58", prop, function (error, list) {
//             if (error) {
//               console.log('asdas')
//             return;
//             }
//
//             listObj[prop] = list.id;
//             //console.log(listObj[prop]);
//             console.log(listObj)
// count++;
//             checkList(listObj)
//             if (listObj.hasOwnProperty(prop)) {
//               console.log("I have the property")
//
//
//             }
//           });
//
//
//           // trello.addCard(obj[prop], " ", listObj[prop], function (error, card) {
//           //   console.log(card);
//           // });
//         }
//       }
//
//     });
//
// function(a){
// function (b)
// }
// function checkList(fulllist) {
//   if (fullllist.length === count) {
//
//   }
// }

// //////////////*************//////////////////////
//
//     // trello.addListToBoard(boardId, "krit", function (error, list) {
//     //   console.log(list);
//     // });
//
//   });
// };

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function (boardId) {
  // YOUR CODE HERE
};





// This line is here for demo purposes, you should delete it
// when you get started!
if (program.upload === true) {
  //uploadToTrello(boardId, 'sample.csv');
}
if (program.download) {

  var csvData = fs.readFileSync("sample.csv").toString();
  csv.parse(csvData, {
    columns: true
  }, function (err, data) {
    console.log(data);

    csv.stringify(data, {
        header: true,
        columns: Object.keys(data[0])
      },
      function (err, data1) {
        console.log(data1);

      })

  });

}
