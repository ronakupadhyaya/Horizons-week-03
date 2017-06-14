"use strict";
// var _ = require('underscore')
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

function mostPopularPages(fileName) {
  var input = fs.createReadStream(fileName);
  var arr = [];
  var top_10 = [];
  var max_10 = 0;
  var rl = readline.createInterface({
    input: input
  });
  rl.on('line', function(line) {
    arr = line.split(' ');
    if (!arr[0].includes(".mw") && !arr[1].includes("Special:")) {
      if (parseInt(arr[2]) > max_10) {
        top_10.push([arr[0], arr[1], arr[2]]);
        top_10.sort(function(a, b) {
          return b[2] - a[2];
        })
        if (top_10.length > 10) {
          top_10.pop();
        }
        max_10 = top_10[top_10.length - 1][2];
      }
    }
  })
  rl.on('close', function () {
    console.log('top_10', top_10);
  })
}

// mostPopularPages(process.argv[2]);

function mostPopularLanguages(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  
  var top_10 = [];
  var max_10 = 0;
  var arr = [];
  var currLanguage = '';
  var currCount = 0;


  rl.on('line', function(line) {
    arr = line.split(' ');
    if (!arr[0].includes(".mw") && !arr[1].includes("Special:")) {
      if (arr[0] !== currLanguage) {
        currLanguage = arr[0];
        if (currCount > max_10) {
          top_10.push([currLanguage, currCount]);
          top_10.sort(function(a, b) {
            return b[1] - a[1];
          });
          if (top_10.length > 10) {
            top_10.pop();
          }
          max_10 = top_10[top_10.length - 1][1];
          if (top_10.length < 10) {
            max_10 = 0;
          }
          currCount = 0;
        }
      } else {
        currCount += parseInt(arr[2]);
      }
    }
  });
  rl.on('close', function() {
    console.log(top_10);
    return top_10;
  });
}
//mostPopularLanguages(process.argv[2]);

function mostPopularPagesForThreeMostPopularLanguages(fileName) {
  var top_10_languages = mostPopularLanguages(fileName);
  var top_30 = [];
  for (var i = 0; i < 3; i++) {
    var language = top_10_languages[i];
    var input = fs.createReadStream(fileName);
    var rl = readline.createInterface({
      input: input
    });

    var top_10 = [];
    var max_10 = 0;

    rl.on('line', function(line) {
      arr = line.split(' ');
      if (!arr[0].includes(".mw") && !arr[1].includes("Special:") && arr[0].includes(language)) {
        if (parseInt(arr[2]) > max_10) {
          top_10.push([arr[0], arr[1], arr[2]]);
          top_10.sort(function(a, b) {
            return b[2] - a[2];
          })
          if (top_10.length > 10) {
            top_10.pop();
          }
          max_10 = top_10[top_10.length - 1][2];
        }
      }
    });
    rl.on('close', function() {
    // This is called when the file is done being read finished
    top_30.push([top_10_languages[i], top_10]);
  });
  }
  console.log(top_30);
}

mostPopularPagesForThreeMostPopularLanguages(process.argv[2]);







