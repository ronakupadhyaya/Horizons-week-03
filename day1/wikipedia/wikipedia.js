"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

// Example code for reading a file line by line and counting
// the lines in it.
function readLines(fileName) {
  var input = fs.createReadStream(fileName);
  var cleanArr = [];
  var topTenWebArr = [0];
  var lanObj = {};
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  rl.on('line', function(line) {
    // This is called for each line in file
    if (cleanUp(line.split(" "))) {
      var web = line.split(" ");
      if (topTenWebArr.length > 10) {
        mostVisitWeb(topTenWebArr,web);
      } else {
        topTenWebArr.push(web);
      }
      if (lanObj[web[0]]) {
        lanObj[web[0]]++;
      } else {
        lanObj[web[0]] = 1;
      }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    // console.log(cleanArr)
    console.log("Top ten most popular websites are " + topTenWebArr);
    console.log("Top ten language are " + sortLan(lanObj));
  });
}

function sortLan(obj) {
  var lanArr = Object.keys(obj);
  var rawArr = [];
  lanArr.forEach(function(lan) {
    if (obj[lan] > 5000) {
      var lanObj = {};
      lanObj[lan] = obj[lan]
      rawArr.push(lanObj);
    }
  })
  return ._sortBy(rawArr, function(num) {
    return
  });
}

function cleanUp(rawLine) {
  if (rawLine[0].indexOf('.mw') === -1 &&
      rawLine[1].indexOf('Special') === -1
      ) {
    return true;
  }
  return false;
}


function mostVisitWeb(topTen,newline) {
  var webName;
  var visitNum = 0;
  var i = 10;
  while (i>0) {
    if (parseInt(newline[2]) > parseInt(topTen[i-1][2])) {
      i--;
    } else {
      break;
    }
  }
  if (i < 10) {
    topTen.splice(i,0,newline);
    topTen.pop();
  }
}

readLines("pagecounts-20160606-170000");

//pagecounts-20160606-170000
