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
  var mPP;
  var mPPL;
  rl.on('line', function (line) {
    // This is called for each line in file
    count++;
    var temp = line.split(' ');
    var tempObj = {
      lang: temp[0],
      title: temp[1],
      visits: parseInt(temp[2]),
      band: parseInt(temp[3]),
    };
    if (tempObj.lang.includes('.mw') ||
      tempObj.title.includes('Special:')) {
      return;
    }
    data.push(tempObj);
  });

  rl.on('close', function () {

    //Build top languages and sites
    mPP = data.reduce(function (arr, page) {
      if (page.lang in mPL) {
        mPL[page.lang] += page.visits;
      } else {
        mPL[page.lang] = page.visits;
      }
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].visits < page.visits) {
          arr.splice(i, 0, page);
          if (arr.length > 10) {
            return arr.slice(0, 10);
          }
          return arr;
        }
      }
      if (arr.length < 10) {
        arr.push(page);
      }
      return arr;
    }, []);

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
