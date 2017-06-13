"use strict";
var _ = require('underscore');
var fs = require('fs');
var readline = require('readline');

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
//
// countLines(__filename);

function checkSpecial(string){
  if(string.slice(0,8) === 'Special'){
    return true;
  }
  return false;
}

function mostVisits(filePath){
  var visits = -Infinity;
  var page = 'default';
  var top = [];
  var langObj = {};

  var input = fs.createReadStream(filePath);
  var rl = readline.createInterface({
    input: input
  });

  rl.on('line', function(line) {
    // do something with the line of text
    var arr = line.split(" ");
    if(arr[0].length === 2 && !checkSpecial(arr[1])){
      if(parseInt(arr[2]) > visits){
        visits = parseInt(arr[2]);
        page = arr[1];
        if(top.length < 10){
          top.push(page);
        } else{
          top.pop();
          top.push(page);
        }
      }

      if(!langObj[arr[0]]){
        langObj[arr[0]] = parseInt(arr[2]);
      }
      else{
        langObj[arr[0]] = langObj[arr[0]] + parseInt(arr[2]);
      }
    }


  })
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log("Most visited: " + top);
    //console.log(langObj);
    var mostLang = 'default';
    var visits = 0;
    for(var key in langObj){
      if(langObj[key] > visits){
        mostLang = key;
        visits = langObj[key];
      }
    }
    console.log(mostLang + " " + visits);
  });

}

mostVisits('pagecounts-20160606-170000');








//
