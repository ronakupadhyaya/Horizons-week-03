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
  var counter = {};
  var max = 0;
  var leader;
  //rl.on('line', function(line) {
    /*if(line.indexOf('.mw') === -1){
      if(line.indexOf('Special:') === -1){
        var data = line.split(' ');
        //console.log(data);
        if(counter.hasOwnProperty(data[1])){
          counter[data[1]] += parseInt(data[2]);
        }
        else{
          counter[data[1]] = parseInt(data[2]);
        }
      }
    }*/

  //});
  rl.on('close', function() {
    var top = new Array(10);
    console.log(top);
    /*Object.keys(counter).forEach(function(a){
      while(){

      }
    });*/
  });
}

countLines('./pagecounts-6th');
