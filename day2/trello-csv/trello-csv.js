var TRELLO_KEY = 'e5570a30f25b744fd4af4518a74633d7';
var TRELLO_TOKEN = '9301d19a80fe7ca8cdb8f703432ddd9ffcf78736af2f2bb1751bcd3320a3b97a';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander');


program.command('upload')
.description("Upload to Trello")
.action(uploadToTrello);

program.command('download')
.description("Download from Trello")
.action(downloadFromTrello);

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
    var listObjects;
    csv.parse(csvData, { columns: true}, function(err, data){
        console.log(data);
        var listNames = data[0];
        console.log("listNames", listNames);
        for (var k = 0; k < Object.keys(listNames).length; k++) {
            console.log("for loop enter");
            console.log(listNames["List " + (k + 1)]);
            trello.addListToBoard(board_id, listNames["List " + (k + 1)], function(err, success) {
                console.log(success);
                // for (var i = 1; i < data.length; i++) {
                //     var currentList = "List " + i;
                //     trello.addCard(data[i][currentList], "Trello Card", listId);
                // }
            });
        };
    });
};


// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
    // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
 uploadToTrello("5755991f55c75c04338940ef", 'sample.csv');
