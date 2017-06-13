"use strict";
var _         = require('underscore'),
    fs        = require('fs'),
    readline  = require('readline'),
    csvjson   = require('csvjson');

// Example code for reading a file line by line and counting
// the lines in it.
function mostPopularPage(fileName) {
  var max = [];
  //var min = null;
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });

  rl.on('line', function(line) {
    var split = line.split(" ");
    if (!split[0].includes(".mw") && !split[1].includes("Special:")) {
      if (max.length < 10) {
        max.push({
          language: split[0],
          name: split[1],
          visits: parseInt(split[2]),
          bandwidth: split[3]
        });
      }
      var min = _.min(max, function (cur) { return cur.visits;});

      var currentVisits = parseInt(split[2]);

      if (currentVisits > min.visits) {
        min.visits = currentVisits;
        min.language = split[0];
        min.name = split[1];
        min.bandwidth = split[3];
      }

    }
  
  });


  rl.on('close', function() {
    // This is called when the file is done being read finished
    //console.log('There are %s lines in file %s', count, fileName);
    max = _.sortBy(max, function(cur) {return cur.visits});
    console.log("Max array: ", max);
  });
}

mostPopularPage("./day1.data");

