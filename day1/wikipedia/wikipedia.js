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
  var allPages = [];
  var languages = {};
  var languageArr = [];
  rl.on('line', function(line) {
    // This is called for each line in file
    var parsedLine = line.split(' ');
    var language = parsedLine[0];
    var pageName = parsedLine[1];
    var numVisits = parseInt(parsedLine[2]);
    var bandWidth = parseInt(parsedLine[3]);
    if (language.indexOf('.mw') === -1 && pageName.indexOf(':') === -1) {
      allPages.push({
        language: language,
        pageName: pageName,
        numVisits: numVisits
      });
    }

    if (languages.hasOwnProperty(language) && language.indexOf('.mw') === -1) {
      languages[language] += numVisits;
    } else if (!languages.hasOwnProperty(language) && language.indexOf('.mw') === -1) {
      languages[language] = numVisits;
      languageArr.push(language);
    }

  });
  rl.on('close', function() {
    console.log("Top 10 most popular pages: ");
    allPages.sort(function(a, b) {
      return a['numVisits'] - b['numVisits'];
    });
    for (var i = 0; i < 10; i++) {
      console.log(allPages[allPages.length - 1 - i]['language'], allPages[allPages.length - 1 - i]['pageName'], allPages[allPages.length - 1 - i]['numVisits'])
    }
    console.log("\nTop 10 most popular languages: ");
    languageArr.sort(function(a, b) {
      return languages[a] - languages[b];
    });
    for (var i = 0; i < 10; i++) {
      console.log(languageArr[languageArr.length - 1 - i]);
    }
    var top3 = [languageArr[languageArr.length - 1], languageArr[languageArr.length - 2], languageArr[languageArr.length - 3]];
    var top3Arr = [[], [], []];

    while (top3Arr[0].length !== 10 || top3Arr[1].length !== 10 || top3Arr[2].length !== 10)
    for (var i = allPages.length - 1; i >= 0; i--) {
      for (var j = 0; j < top3.length; j++) {
        if (allPages[i]['language'] === top3[j]) {
          top3Arr[j].push(allPages[i]);
          break;
        }
      }
    }

    for (var i = 0; i < top3.length; i++) {
      console.log("Top 10 most popular pages for " + top3[i] + ":");
      for (var j = 0; j < 10; j++) {
        console.log(top3Arr[i][j]);
      }
      console.log();
    }
  });
}

countLines("./wikipedia_june6");
