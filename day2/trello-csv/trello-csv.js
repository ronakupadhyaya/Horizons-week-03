var TRELLO_KEY = 'ab3e895cad67a947ad0fcc93d33fc689';
var TRELLO_TOKEN = '3f8ac1459d8885b64edf0259a2af87b4eb6f964599cd19143a378479dd2796d5';

var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);

var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true

program.option('-u, --upload', 'Upload CSV');
program.option('-d, --download', 'Download CSV');
program.parse(process.argv);
var board_id = program.args[0];
var csv_fname = program.args[1];


console.log(program.upload, program.download);


// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var board_id = program.args[0];
// YOUR CODE HERE
//var board_id = program.args[0];
//var csv_fname = program.args[1];

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(board_id, csv_fname) {
    console.log("holy")
    console.log(board_id, csv_fname);
  var csvData = fs.readFileSync(csv_fname).toString();

  csv.parse(csvData, { columns: true}, function(err, data){
      console.log(data);
      for (var key in data[0]){
          console.log(key);
        trello.addListToBoard(board_id, key, 
        function(error, list){
        if (error){
            console.log('error')
        }
        else {
            console.log(list, "Success");
            var listId = list.id;
            var name = list.name;
            
                for (var i = 0; i <data.length; i++){
                    if(data[i][name] !== ""){
                        trello.addCard(data[i][name], "I'm a card", listId, function(error, card){
                            if (error){
                                console.log(error);
                            } else {
                                console.log("success");
                            }
                        });
                    }
                }
        }
    });
    }
  });
};


// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
    
    
    trello.getListsOnBoard(boardId, function(error, result){
        if (error){
            console.log(error);
        } else {
            var obj = {};
            var y;
        
            for (var i =0; i < result.length; i++){
                 trello.getCardsOnList(result[i]["id"], function(error, job){
                   y = job; 
                    console.log(job);
                })
                 obj[result[i]["name"]] = y;
            }
            
//            console.log(obj);
        }
    })
    
};

if(program.upload){
    uploadToTrello(board_id, csv_fname);
}
if (program.download){
    downloadFromTrello(board_id);
}

// This line is here for demo purposes, you should delete it
// when you get started!