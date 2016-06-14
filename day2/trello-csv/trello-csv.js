var TRELLO_KEY = '6c915bc521da8eb763cafb14ce684631';
var TRELLO_TOKEN = 'da7d7cbf46ff30f72bff69f7a0973481b08f2bd6ce49ea2362db4f8355cbd97e';

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

  csv.parse(csvData, {
    columns: true
  }, function(err, data) {

    var lists = {};
    for (var l in data) {
      for (var i in data[l]) {
        lists[i] = lists[i] || [];
        lists[i].push(data[l][i]);
      }
    }

    for (var i in lists) {
      trello.addListToBoard(board_id, i, function(trelloList) {
        for (var card in lists[i]) {
          trello.addCard(lists[i][card], '', trelloList.id, function() {

          });
        }
      });
    }
  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  var lists = trello.getListOnBoard(boardId, cb);
};

// This line is here for demo purposes, you should delete it
// when you get started!
uploadToTrello(null, 'sample.csv');
