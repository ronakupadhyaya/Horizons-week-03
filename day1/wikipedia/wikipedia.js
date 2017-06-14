"use strict";
var _ = require('underscore')
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
//     console.log(line);
//     count++;
//   });
//   rl.on('close', function() {
//     // This is called when the file is done being read finished
//     console.log('There are %s lines in file %s', count, fileName);
//   });
// }
// var numLines = countLines('sample.data');


//most popular pages
function mostPopularPages(data) {
  var pagesArr =[];
  var input = fs.createReadStream(data);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  rl.on('line', function(line) {
    if(line.indexOf('.mw')===-1&&line.indexOf(' Special:')===-1){
      count++;
      var lineArr = line.split(' ');
      // var obj = {};
      // obj[lineArr[1]] = parseInt(lineArr[2]);
      if(count < 11){
        pagesArr.push([lineArr[0],lineArr[1],parseInt(lineArr[2])]);
        pagesArr.sort(function(a,b){
          return b[2]-a[2];
        })
      } else {
        var item = [lineArr[0],lineArr[1],parseInt(lineArr[2])];
        var index = 0;
        pagesArr.forEach(function(a){
          if(a[2]>parseInt(lineArr[2])){index++}
        })
        if(index < 10){
          pagesArr.splice(index,0,item);
          pagesArr.pop();
        }
      }

    }
  });
    rl.on('close', function() {
      console.log(pagesArr);
    });
}

function mostPopularLanguages(data) {
  var langArr =[];
  var input = fs.createReadStream(data);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  rl.on('line', function(line) {
    // if(line.indexOf('.mw')===-1&&line.indexOf(' Special:')===-1){
    //   count++;
    //   var lineArr = line.split(' ');
    //
    //   if(count < 11){
    //     pagesArr.push([lineArr[0],lineArr[1],parseInt(lineArr[2])]);
    //     pagesArr.sort(function(a,b){
    //       return b[2]-a[2];
    //     })
    //   } else {
    //     var item = [lineArr[0],lineArr[1],parseInt(lineArr[2])];
    //     var index = 0;
    //     pagesArr.forEach(function(a){
    //       if(a[2]>parseInt(lineArr[2])){index++}
    //     })
    //     if(index < 10){
    //       pagesArr.splice(index,0,item);
    //       pagesArr.pop();
    //     }
    //   }
    //
    // }
  });
    rl.on('close', function() {
      console.log(langArr);
    });
}
// mostPopularPages('pagecounts-20160606-170000')
mostPopularLanguages('sample.data')
