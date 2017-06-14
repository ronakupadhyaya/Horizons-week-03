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
  var max = 0;
  var maxPage;
  var result = {};
  rl.on('line', function(line) {
    // //most visited page
    // if(line.indexOf('.mw')===-1){
    //   if(line.indexOf('Special:')===-1){
    //     var words = line.split(' ');
    //     var temp = parseInt(words[2]);
    //     if(temp>max){
    //       max = temp;
    //       maxPage = words[1];
    //     }
    //   }
    // }

    //most visited languages
    if(line.indexOf('.mw')===-1){
      if(line.indexOf('Special:')===-1){
        var words = line.split(' ');
        var language = words[0];
        if(result.hasOwnProperty(language)){
          result[language] += parseInt(words[2]);
        }
        else{
          result[language] = parseInt(words[2]);
        }
      }
    }

    count++;
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    // console.log("The page with max visits is: ", maxPage, " with ", max, " visits.");
    // console.log('There are %s lines in file %s', count, fileName);
    var max = 0;
    var lang;
    for(var prop in result){
      if(result[prop]>max){
        max = result[prop];
        lang = prop;
      }
    }
    console.log("The language with the most visits is: ", lang, " with ", max, " views.");
  });
}

countLines(process.argv[2]);
