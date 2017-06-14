"use strict";

var TRELLO_KEY = 'b214ba1e82e82f390da816e3f47ace83';
var TRELLO_TOKEN = '854a7e63ba51225c4a0d80c2fe12b56a47515a919449eb7f67950399edeca04b';

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
program.option('-u, --upload', 'Upload CSV');
program.option('-d, --download', 'Download CSV');
// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var boardId = program.args[0];
// YOUR CODE HERE
var boardId=program.args[0];
var csvFilename=program.args[1];


//5939c7be23d7fcdc3f79ff9e

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
var uploadToTrello = function(boardId, csvFilename) {
  var csvData = fs.readFileSync(csvFilename).toString();

  csv.parse(csvData, { columns: true}, function(err, data){
    console.log(data);
    // YOUR CODE HERE

    var result={}
    for(var i in data[0]){
      result[i]=[];
    }

    console.log(result);

    for(var i=0;i<data.length;i++){
      for(var j in result){
        result[j].push(data[i][j])
      }
    }
    console.log(result);

    var listid_array=[];
    for(var i in result){
      var trellolist=trello.addListToBoard('5939c7be23d7fcdc3f79ff9e',i);
      trellolist.then((list)=>{
        console.log('here', list.id,list.name);
        listid_array.push(list);
        //trello.addCard(res)
      })
      console.log(i);
    }
    //console.log(listid_array);


  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
};

// This line is here for demo purposes, you should delete it
// when you get started!
uploadToTrello(null, 'sample.csv');
