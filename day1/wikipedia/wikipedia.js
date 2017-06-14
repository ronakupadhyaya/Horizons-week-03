"use strict";
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


function main(fileName){
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var arr = [];
  var i = 0;
  var Page = function(arr){
    this.language = arr[0];
    this.name = arr[1];
    this.visits = arr[2];
    this.bandwidth = arr[3];
  }
  rl.on('line', function(line){
    if(line.indexOf('.mw')<0 || line.indexOf('Special:') <0){
      var temp = [];
      temp = line.split(" ");
      arr[i] = new Page(temp);
      i++;
    }
  });
  rl.on('close', function(){
    mostVisits(arr);
  })
}

function mostVisits(parsedData){
  var max = -1000;
  var rObj;
  parsedData.forEach(function(element, index){
    if(element.visits > max){
      max = element.visits;
      rObj = index;
    }
  })
  console.log(parsedData[rObj]);
  return parsedData[rObj];
}

main('sample.data');
