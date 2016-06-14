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

program.option('-u, --upload', 'Upload CSV')
  .option('-d, --download', 'Download CSV')
  .parse(process.argv);

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
    console.log(data);
    var lists = {};
    for (var l in data) {
      for (var i in data[l]) {
        console.log(data[l][i]);
        lists[i] = lists[i] || [];
        lists[i].push(data[l][i]);
      }
    }
    console.log(lists);

    // _.mapObject(lists, function(cards, listName) {
    //   trello.addListToBoard(board_id, listName, function(a, trelloList) {
    //
    //     cards.forEach(function(cardName) {
    //       trello.addCard(cardName, '', trelloList.id, function(a, cardData) {});
    //     });
    //   });
    // });

    trello.addListToBoard(board_id, l, function(err, trelloList) {
      cards.forEach(function(cardName) {
        trello.addCard(cardName, '', trelloList.id, function(err, cardData) {});
      });
    });

  });
};

// 3. download functionality - read trello data and output to csv
// var downloadFromTrello = function(boardId) {
//   trello.getListsOnBoard(bId, function(err, lists) {
//
//     var cardsByListName = {};
//     lists.forEach(function(list) {
//       trello.getCardsOnList(list.id).then(function(cards) {
//         cards = cards.map(function(card) {
//           return card.name;
//         });
//         cardsByListName[list.name] = cards;
//         if (_.keys(cardsByListName).length === lists.length) {
//
//           console.log(_.zip.apply(null, _.values(cardsByListName)));
//           // console.log(_.zip());
//           csv.stringify(_.zip.apply(null, _.values(cardsByListName)), {
//               header: true,
//               columns: _.keys(cardsByListName)
//             },
//             function(err, output) {
//               // save output to csv
//               console.log(output);
//               fs.writeFileSync(fName, output);
//             });
//         }
//
//       }, console.log);
//     });
//
//   });
// };

// This line is here for demo purposes, you should delete it
// when you get started!
// '575ac08e82af25b4cb577ae0'
uploadToTrello(null, 'sample.csv');
