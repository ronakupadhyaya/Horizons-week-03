var TRELLO_KEY = 'e213007139f06618298c70be64a76a72';
var TRELLO_TOKEN = '7a7bb19ce44cc1f12bea5e050cd98637f4afb084dfc201e31b8a8d5877f779d6';


// Q What is the point of the require statements? 
// Q npm install vs npm --save install
var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander');
//Commander provides a new instance of something one can parse arguments with. Program is the instance
//of this thing which you can now parse command line arguments with. 
var board_id = "55f606a440c3474d1187a4d8";

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true
program
    .usage("node trello-csv.js [-u || --upload || -d || --download]  [board id] [csv file]")
    .option('-u, --upload', 'Upload CSV')
    .option('-d, --download', 'Download CSV')
    .parse(process.argv);


// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id = program.args[0];
// YOUR CODE HERE
var board_id = program.args[0]

var csv_fname = program.args[1]
console.log(csv_fname)

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(board_id, csv_fname) {
    var csvData = fs.readFileSync(csv_fname).toString(); // CSV data as a string

    csv.parse(csvData, {}, function(err, data) {
        if (err) console.error(err);

        for (var i = 0; i < data[0].length; i++) { //data[0].length is the columns
            addList(i, data);
        }
    });
}

var addList = function(i, data) {
    trello.addListToBoard(board_id, data[0][i], function(err, list) {
        if (err) console.error(err);
        //list.id => id of the list we get back after adding
        console.log(i);
        for (var j = 1; j < data.length; j++) { // data is the array, j is the row, i is the column
            if (data[j][i]) {
                trello.addCard(data[j][i], "", list.id, function(err, card) {});
            }
        }
    });
};



// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(board_id) {
    trello.getListsOnBoard(board_id, function(error, lists) {
        var cardsByList = {};
        lists.forEach(function(list) {
            trello.getCardsForList(list.id).then(function(cards) {
                cards = cards.map(function(card) {
                    return card.name;
                });
                cardsByList[list.name] = cards;
                if (_.keys(cardsByList).length === lists.length) {
                    csv.stringify(_.zip.apply(null, _.values(cardsByList)), {
                            header: true,
                            columns: _.keys(cardsByList)
                        },
                        function(err, data) {
                            console.log(data)
                        });
                }
            });
        });
    });
};


if (program.upload) {
    uploadToTrello(board_id, csv_fname)
} else if (program.download) {
    downloadFromTrello(board_id)
} else {
    console.log("Please specify whether to upload or download.")
    process.exit();
    // Q What is the point of process.exit() ?
}
