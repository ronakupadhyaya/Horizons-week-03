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
  var data = [];
  var mPL = {};
  var mPP = [];
  var mPPL;
  rl.on('line', function (line) {
    // This is called for each line in file
    count++;
    var temp = line.split(' ');
    //Build temp page object
    var page = {
      lang: temp[0],
      title: temp[1],
      visits: parseInt(temp[2]),
      band: parseInt(temp[3]),
    };
    //Check for restricted strings
    if (page.lang.includes('.mw') ||
      page.title.includes('Special:')) {
      return;
    }
    //Add visits to languages
    if (page.lang in mPL) {
      mPL[page.lang] += page.visits;
    } else {
      mPL[page.lang] = page.visits;
    }

    //Check if it is a top 10 most popular page
    for (var i = 0; i < mPP.length; i++) {
      if (mPP[i].visits < page.visits) {
        mPP.splice(i, 0, page);
        if (mPP.length > 10) {
          return mPP = mPP.slice(0, 10);
        }
      }
    }
    if (mPP.length < 10) {
      mPP.push(page);
    }
  });

  rl.on('close', function () {

    //Find top Languages
    mPL = _.pairs(mPL);
    mPL.sort(function (a, b) {
      return b[1] - a[1];
    });
    mPL = mPL.slice(0, 10);

    //Find most popular pages for 3 top languages
    mPPL = mPP.reduce(function (arr, page) {
      if (page.lang === mPL[0][0] || page.lang === mPL[1][0] || page.lang === mPL[2][0])
        arr.push(page);
      return arr;
    }, [])

    console.log('\nThere are %s lines in file %s', count, fileName);
    console.log("\n<-----Top Sites----->");
    mPP.forEach(function (element, idx) {
      console.log(idx + 1 + '. ' + element.title);
    }, this);
    console.log("\n<-----Top Languages----->");
    mPL.forEach(function (element, idx) {
      console.log(idx + 1 + '. ' + element[0]);
    }, this);
    console.log("\n<-----Top Pages for Top 3 Languages----->");
    mPPL.forEach(function (element, idx) {
      console.log(idx + 1 + '. ' + element.title);
    }, this);
  });
}

countLines(process.argv[2]);
