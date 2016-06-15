var TRELLO_KEY = '021d5093185ea965dd6a50153429b08c';
var TRELLO_TOKEN = '236f8c457bf453bb55b34aa02c815cf106c3ca57b5ceeecb7678bc6eb495fc3d';
var boardId = '575b005c5ce11385a7385e72';
var listID	= '575b005c5ce11385a7385e73';


var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello("021d5093185ea965dd6a50153429b08c", "236f8c457bf453bb55b34aa02c815cf106c3ca57b5ceeecb7678bc6eb495fc3d");

var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true


// var program = require('commander');
 
// program
//   .version('0.0.1')
//   .command('rmdir <dir> [otherDirs...]')
//   .action(function (dir, otherDirs) {
//     console.log('rmdir %s', dir);
//     if (otherDirs) {
//       otherDirs.forEach(function (oDir) {
//         console.log('rmdir %s', oDir);
//       });
//     }
//   });




program.parse(process.argv);

// program.command('download' [board_id] [csv_fname])
//   .description("Download cards")
//   .action(downloadFromTrello);


// program.command('upload' [board_id] [csv_fname])
//   .description("upload cards")
//   .action(uploadToTrello);


program
  .option('-u, --upload', 'upload trello card');
  .option('-d, --download', 'download trello card');
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
  csv.parse(csvData, { columns: true}, function(err, data){
  	for(var i = 0; i < data[0].length; i++) {
  		trello.addListToBoard(board_id, data[0][i], function (list) {
  		for(var j = 1; j < data.length; j++) {
  			trello.addCard(data[j][i], "", list.id, function(card)) {

  			});
  			}
  		}
  	})
}
}




// 3. download functionality - read trello data and output to csv
var listIdArray= [];
var downloadFromTrello = function(boardId) {


}

if (program.upload) {
	uploadToTrello(board_id, csv_fname);
}
else if (program.download) {
	downloadFromTrello(board_id);
}

// This line is here for demo purposes, you should delete it
// when you get started!
downloadFromTrello(boardId);
