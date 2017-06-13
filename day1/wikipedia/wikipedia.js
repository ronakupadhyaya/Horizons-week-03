"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

//USE AS A REFERENCE BUT COMMENT OUT AND DONT CALL IT WHEN DETERMINING ANSWERS
// Example code for reading a file line by line and counting
// the lines in it.
// function countLines(fileName) {
//   var input = fs.createReadStream(fileName);
//   var rl = readline.createInterface({
//     input: input
//   });
//   var count = 0;
//   rl.on('line', function(line) {
//     // This is called for each line in file
//     count++;
//   });
//   rl.on('close', function() {
//     // This is called when the file is done being read finished
//     console.log('There are %s lines in file %s', count, fileName);
//   });
// }
// countLines(__filename);
// // =========================



//filname signifies sample.data to start
//once that works you use pagecounts-20160606...etc...
function mostPopularSites(fileName){

  //object to put pagename: visits into
  var sortable = [];

  //data reading stuff
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });

  var count = 0;
  rl.on('line', function(line) {
    // This is called for each line in file

    if(line.indexOf('.mw') !== -1 || line.indexOf('Special:') !== -1){
      //ignore this line
    }else{
      var words = line.split(' ');
      var name = words[1];
      var visits = parseInt(words[2]);
      sortable.push([name, visits]);
    }

    count++;
  });

  rl.on('close', function() {

    sortable.sort(function(a,b){
      return b[1] - a[1];
    })

    //prnt the top ten
    for(var i = 0; i < 10; i++){
      console.log(`PAGE: ${sortable[i][0]} VISITS: ${sortable[i][1]}`);
    }

  });

}

//mostPopularSites('./pagecounts-20160606-170000');

function mostPopularLang(fileName){

  //object to put pagename: visits into
  var sortable = {};

  //data reading stuff
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });

  var count = 0;
  rl.on('line', function(line) {
    // This is called for each line in file

    if(line.indexOf('.mw') !== -1 || line.indexOf('Special:') !== -1){
      //ignore this line
    }else{
      var words = line.split(' ');
      var lang = words[0];
      var visits = parseInt(words[2]);

      if(sortable.hasOwnProperty(lang)){
        sortable[lang] += visits;
      }else{
        sortable[lang] = visits;
      }
      //now sortable should be a nice object with all the languages.

    }

    count++;
  });

  rl.on('close', function() {

    var sorted = _.pairs(sortable);

    sorted.sort(function(a,b){
      return b[1] - a[1];
    })


    //prnt the top ten
    for(var i = 0; i < 10; i++){
      console.log(`LANGUAGE: ${sorted[i][0]} VISITS: ${sorted[i][1]}`);
    }

  });

}

//mostPopularLang('./pagecounts-20160606-170000');





//PART 3 HERE

function mostPopularLang(fileName){

  //object to put pagename: visits into
  var sortable = {};

  //data reading stuff
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });

  var count = 0;
  rl.on('line', function(line) {
    // This is called for each line in file

    if(line.indexOf('.mw') !== -1 || line.indexOf('Special:') !== -1){
      //ignore this line
    }else{
      var words = line.split(' ');
      var lang = words[0];
      var visits = parseInt(words[2]);

      if(sortable.hasOwnProperty(lang)){
        sortable[lang] += visits;
      }else{
        sortable[lang] = visits;
      }
      //now sortable should be a nice object with all the languages.

    }

    count++;
  });

  rl.on('close', function() {

    var sorted = _.pairs(sortable);

    sorted.sort(function(a,b){
      return b[1] - a[1];
    })


    //prnt the top ten
    for(var i = 0; i < 10; i++){
      console.log(`LANGUAGE: ${sorted[i][0]} VISITS: ${sorted[i][1]}`);
    }

  });

}
