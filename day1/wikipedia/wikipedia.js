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
//     count++;
//   });
//   rl.on('close', function() {
//     // This is called when the file is done being read finished
//     console.log('There are %s lines in file %s', count, fileName);
//   });
// }
//
// countLines(__filename);

function isValid(line){
  return ! (line.match(/{.mw}/) || line.match(/{Special:}/) );
}

var map = {
  "language": 0,
  "page name": 1,
  "number of visits": 2,
  "bandwidth usage in bytes": 3
}

function createObject(fileName, selector) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var obj = {};
  rl.on('line', function(line){
    if(isValid(line)){
      var temp = line.split(" ");
      var key = temp[ map[selector] ];

      if(obj.hasOwnProperty(key)){
        // if(key === "ja"){
        //   console.log("JAPAN", obj[key]);
        // }
        if( _.isNaN( parseInt(temp[ map[selector] + 1]) ) ){
          obj[key] += 1;
        } else {
          obj[key] += parseInt(temp[ map[selector] + 1] );
        }

      } else {
        if( _.isNaN( parseInt(temp[ map[selector] + 1] ) ) ){
          obj[key] = 1;
        } else {
          obj[key] = parseInt(temp[map[selector] + 1]);
        }

      }
    }
  });
  rl.on('close', function(){
    var arr = [];

    for(var key in obj){
      // if(key === "ja"){
      //   console.log("JAPAN", obj[key]);
      // }
      if(obj.hasOwnProperty(key)){
        if(arr.length < 10){
          arr.push([key, obj[key]]);
          arr.sort(function(a,b){ return a[1] - b[1]; });
        }
        if(obj[key] > arr[0][1] && arr.length === 10){
          arr[0] = [key, obj[key]];
          arr.sort(function(a,b){ return a[1] - b[1];});
        }
      }
    }
    console.log(arr);
  });


}

createObject("./sample.data", "page name");
// createObject("./pagecounts-20160606-170000", "page name");














// Part 1


// var myPromise = new Promise( (resolve, reject) => {
//   rl.on('close', function(){
//     resolve(obj);
//   })
// });
//
// myPromise.then( (obj) => {
//   // write code here
//   console.log("RESULT");
//   // key, value pairs
//   var arr = [];
//
//   for(var key in obj){
//     if(obj.hasOwnProperty(key)){
//       if(arr.length < 10){
//         arr.push([key, obj[key]]);
//         arr.sort(function(a,b){ return a[1] - b[1]; });
//       }
//       if(obj[key] > arr[0][1] && arr.length === 10){
//         arr[0] = [key, obj[key]];
//         arr.sort(function(a,b){ return a[1] - b[1];});
//       }
//     }
//   }
//   console.log(arr);
// });
