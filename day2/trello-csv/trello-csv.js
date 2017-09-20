"use strict";

var TRELLO_KEY = 'c465ffaa9afd9e2c58c651c88e54d950';
var TRELLO_TOKEN = "af1c68f51fcf931f3aa094b438102f8576b6972674371525d257cd5086784a1e";
var async = require('async');
var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');
var axios = require('axios');
var Trello = require('trello');
var trello = new Trello(TRELLO_KEY, TRELLO_TOKEN);
var stringify = require('csv-stringify');
var program = require('commander');

// 1. parse cmdline args
// Use commander to parse the --upload -u, --download -d flags
// ex. program.option('-u, --upload', 'Upload CSV'); -> program.upload = true

program
  .option('-u, --upload', 'Upload CSV')
  .option('-d --download', 'Download CSV')
  .parse(process.argv);


// Remaining arguments after flags are stored in program.args
// - The first argument should be board id
// - The second argument should be the csv file
// ex. var boardId = program.args[0];
// YOUR CODE HERE
var boardId;
var csvFilename;

// 2. upload functionality - read csv and upload to Trello.
// Here's some example code for reading CSV files.
function createList(listName, boardId, keyObj, cb) {
  // YOUR CODE HERE
  console.log(listName);
  axios({
    url: 'https://api.Trello.com/1/lists',
    method: 'post',
    data: {
      key: TRELLO_KEY,
      token: TRELLO_TOKEN,
      idBoard: boardId,
      name: listName
    }
  }).then(function(resp){
    keyObj[listName] = resp.data.id;
    cb(null, keyObj);
  }).catch(function(error){
    console.log(error);
  })
}

function createCard(name, listId) {
  // YOUR CODE HERE
  axios.post("https://api.Trello.com/1/cards", {
    key: TRELLO_KEY,
    token: TRELLO_TOKEN,
    idList: listId,
    name: name
  })

}

function addCards(data, keyObj){
  async.each(data, function(csvObj){
    async.forEachOf(csvObj, function(listElement, key){
      if(listElement !== ''){
        createCard(listElement, keyObj[key]);
      }
    })
  })
}
var uploadToTrello = function(boardId, csvFilename) {
  console.log(boardId);

  var csvData = fs.readFileSync(csvFilename).toString();

  csv.parse(csvData, { columns: true}, function(err, data){
    // console.log(data);
    // YOUR CODE HERE
    //create a list
    var keyObj = {};
    var name = csvFilename.split('.')[0];

    async.forEachOf(data[0], function(firstElem, key, callback){
      createList(key, boardId, keyObj, callback);
    }, function(err, something){
      addCards(data, keyObj);
    });

  });
};

// 3. download functionality - read trello data and output to csv
var downloadFromTrello = function(boardId) {
  // YOUR CODE HERE
  axios.get('https://api.Trello.com/1/boards/' + boardId + '/lists', {
    params: {
      key: TRELLO_KEY,
      token: TRELLO_TOKEN
    }
  }).then(function(resp){

    var csvData = fs.readFileSync('./sample.csv').toString();
    // csv.parse(csvData,{columns: true}, function(err, data){
    //   console.log(data);
    // })
    var lists = resp.data;
    var listObj = {};
    for(var i =0; i < lists.length;i++){
      listObj[lists[i].name] = lists[i].id;
    }
    axios.get('https://api.Trello.com/1/boards/' + boardId + '/cards/all', {
      params: {
        key: TRELLO_KEY,
        token: TRELLO_TOKEN
      }
    }).then(function(resp){
      var cards = resp.data;
      var cardObj = {};
      for(var i =0; i < cards.length;i++){
        cardObj[cards[i].name] = cards[i].idList;
      }
      var listArrayObj = {}
      for(var list in listObj){
        var newArray = [];
        for(var card in cardObj){
          if(listObj[list] === cardObj[card]){
            newArray.push(card);
          }
        }
        listArrayObj[list] = newArray;
      }
      // console.log(listArrayObj);
      var max = -Infinity;
      var maxKey;
      for(var key in listArrayObj){
        if(listArrayObj[key].length > max){
          max = listArrayObj[key].length
        }
      }
      // console.log(max);
      // for()
      var returnArray = [];
      for(var i = 0; i < max;i++){
        var newListObj = {};
        for(var key in listArrayObj){
          if(listArrayObj[key][i]){
            newListObj[key] = listArrayObj[key][i];
          } else{
            newListObj[key] = '';
          }

        }
        returnArray.push(newListObj);
      }
      console.log(Object.keys(returnArray[0]).join(','));
      stringify(returnArray,function(err, output){
        console.log(Object.keys(returnArray[0]).join(',') + '\n' +output);
        fs.writeFileSync('board.csv', Object.keys(returnArray[0]).join(',') + '\n' +output);
      })
    })
  })
};

// This line is here for demo purposes, you should delete it
// when you get started!
// uploadToTrello(null, 'sample.csv');
if(program.upload){
  uploadToTrello(process.argv[3], process.argv[4]);
}
if(program.download){
  downloadFromTrello(process.argv[3]);
}
