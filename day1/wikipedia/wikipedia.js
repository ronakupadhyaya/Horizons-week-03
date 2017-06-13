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
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('There are %s lines in file %s', count, fileName);
  });
}

function mostPopularPages(fileName) {
  var input = fs.createReadStream(fileName);
  var formattedFile = [];
  var rl = readline.createInterface({
    input: input
  });

  rl.on('line', function(line) {
    // This is called for each line in file
    if(line.indexOf(".mw") === -1 && line.indexOf("Special:") === -1) {
      var subArr = line.split(" ");
      formattedFile.push({"language": subArr[0], "page_name": subArr[1], "num_visits": parseInt(subArr[2])});
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log("Finished reading");
    createArrByPage(formattedFile);
  });
}

function createArrByPage(fileArr) {
  var topTen = [];
  for (var i = 0; i < 10; i++) {
    var highestObj = {"num_visits": 0};
    var index = 0;
    fileArr.forEach(function(obj, ind) {
      if (obj.num_visits > highestObj.num_visits) {
        highestObj = obj;
        index = ind;
      }
    });
    topTen.push(highestObj);
    fileArr.splice(index, 1);
  }

  console.log(topTen);
}

function mostPopularLangs(fileName) {
  var input = fs.createReadStream(fileName);
  var formattedFile = {};
  var rl = readline.createInterface({
    input: input
  });

  rl.on('line', function(line) {
    // This is called for each line in file
    if(line.indexOf(".mw") === -1 && line.indexOf("Special:") === -1) {
      var subArr = line.split(" ");
      if(formattedFile.hasOwnProperty(subArr[0])) {
        formattedFile[subArr[0]] += parseInt(subArr[2]);
      } else {
        formattedFile[subArr[0]] = parseInt(subArr[2]);
      }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log("Finished reading");
    console.log("commons", formattedFile["commons.m"]);
    console.log("zh", formattedFile["zh"]);
    getTopLang(formattedFile);
  });
}
function getTopLang(fileObj) {
  var topTen = [];
  for (var i = 0; i < 10; i++) {
    var max = 0;
    var lang = "";
    Object.keys(fileObj).forEach(function(key) {
      if (fileObj[key] > max) {
        max = fileObj[key];
        lang = key;
      }
    });
    topTen.push(lang);
    fileObj[lang] = undefined;
  }
  console.log(topTen);
}

//mostPopularPages(process.argv[2]);
mostPopularLangs(process.argv[2]);
