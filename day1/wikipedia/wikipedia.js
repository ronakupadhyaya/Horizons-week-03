"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');
var fileName = "./sample.data";

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

// countLines(__filename);

// Part 1 most popular pages
// Part 2 most popular language DONE
// Part 3 most popular pages for 3 languages en es ru
var languages = {};
var mostPopularPages = [];

var input= fs.createReadStream(fileName);
var reader = readline.createInterface({
  input: input
});
var data = []
var i = 0
reader.on("line", function(line) {
  line = line.split(" ");
  if (line.length === 4 &&
      line[0].indexOf(".mw") === -1 &&
      line[1].indexOf("Special:") === -1) {
    var lan = line[0];
    var pg_name = line[1];
    var nb_visits = parseInt(line[2]);
    var bandwith = parseInt(line[3]);

    // record trafic for ea lan
    if (!languages.hasOwnProperty(lan)) {
      languages[lan] = nb_visits;
      // console.log(languages)
    } else {
      languages[lan] += nb_visits;
    };

    // record
    if (mostPopularPages.length < 10) {
      mostPopularPages.push([pg_name, nb_visits]);
    } else {

    }
    mostPopularPages = _.sortBy(mostPopularPages, function(pg) {
      return pg[1];
    });

  };

})

reader.on("close", function() {
  var mostPopularLanguages = _.sortBy(_.pairs(languages), function(lan) {
    return -lan[1];
  });


  console.log(mostPopularPages);
})