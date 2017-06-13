"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

// Example code for reading a file line by line and counting
// the lines in it.
var arr = [];

function countLines(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  rl.on('line', function(line) {
    // This is called for each line in file
    count++;
    var parts = line.split(' ');
    if(parts[0].indexOf('.mw') === -1 && parts[1].indexOf('Special:') === -1 &&
    parts.length===4) {
        var obj = {};
        obj["language"] = parts[0];
        obj["page"] = parts[1];
        obj["visits"] = parseInt(parts[2]);
        arr.push(obj);
        if(arr.length>10){
          arr.sort(function(a,b){
            return b.visits - a.visits;
          });
          arr.pop();
        }
      }
    });


  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('There are %s lines in file %s', count, fileName);
   console.log(arr);
   console.log(_.groupBy(arr, function(num){
     num.language;
   }));


  });
}

countLines("/Users/未命名文件夹/horizons/week03/day1/wikipedia/pagecounts-20160606-170000");
