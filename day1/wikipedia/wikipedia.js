"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

// Example code for reading a file line by line and counting
// the lines in it.
function countLines(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  rl.on('line', function(line) {
    // This is called for each line in file
    count++;
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('There are %s lines in file %s', count, fileName);
  });
}

function mostpopular(fileName){
  var input = fs.createReadStream(fileName);

  var max_visits = 0;
  var page = "";

  var rl = readline.createInterface({
    input: input
  });
  rl.on('line', function(line) {
    // This is called for each line in file
    var new_line = line.split(' ');

    if (isValid(new_line)){
      if (Number(new_line[2]) > max_visits){
        max_visits = Number(new_line[2]);
        page = new_line[1]
      }
    }

  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    // console.log('There are %s lines in file %s', count, fileName);
    console.log(page)
  });
}

function mostpopular_language(fileName){
  var input = fs.createReadStream(fileName);

  var max_visits = 0;
  var language = "";

  var rl = readline.createInterface({
    input: input
  });
  rl.on('line', function(line) {
    // This is called for each line in file
    var new_line = line.split(' ');

    if (isValid(new_line)){
      if (Number(new_line[2]) > max_visits){
        max_visits = Number(new_line[2]);
        language = new_line[0]
      }
    }

  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    // console.log('There are %s lines in file %s', count, fileName);
    console.log(language);
  });
}

function mostpopular_language_post(fileName){
  var input = fs.createReadStream(fileName);

  var max_visits = 0;
  var language = "en";
  var page = "";

  var rl = readline.createInterface({
    input: input
  });
  rl.on('line', function(line) {
    // This is called for each line in file
    var new_line = line.split(' ');

    if (isValid(new_line)){
      if (Number(new_line[2]) > max_visits && new_line[0] == language){
        max_visits = Number(new_line[2]);
        page = new_line[1];
      }
    }

  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    // console.log('There are %s lines in file %s', count, fileName);
    console.log(page);
  });
}

function isValid(arr){
  if (arr[0].indexOf(".mw") === -1 && arr[1].indexOf(":") === -1){
    return true;
  }else{
    return false
  }
}

mostpopular_language_post('./pagecounts-20160606-170000')
