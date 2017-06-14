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

countLines(__filename);
// Ignore lines where the language contains the string .mw.
// Ignore lines where the page name contains the string Special
// sv Gelelektrofores 3 37032
// Part 1: Most popular pages:Calculate which pages received the most visits
// during the one hour starting June 6th 2016 1700 GMT-----------------



// Part 2: Most popular languages: Calculate which languages received the most
// visits during one hour starting June 6th 2016 1700 GMT-------------


// Part 3: Most popular pages for the three most popular languages:
// For the top 3 most popular languages from Part 2,
// calculate which pages written in that language received
// the most visits during one hour starting June 6th 2016 1700 GMT.




// (Bonus) Part 4: Wikipedia traffic trends: For some use cases it may be
// useful to know which topics are trending.
// In this part we will be calculating changes in traffic
// for the top 10 pages you found in Part 1. Calculate the total gain or loss
// in traffic compared to the same hour the next day, June 7th 2016 1700 GMT.
