"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');
var csvjson = require('csvjson');


function collectLines(fileName, cb) {
  var toReturn = [];
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var options = {
    headers : "language pageName numberOfVisits bandwidthUsageInBytes",
    delimiter : " "
  };
  rl.on('line', function(line) {
    // This is called for each line in file
    var newObj = csvjson.toObject(line, options);
    if (newObj[0].language.length === 2 && newObj[0].pageName.indexOf("Special:") === -1) {
      toReturn.push(newObj[0]);
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    //console.log(toReturn);
    cb(toReturn);
  });
}

collectLines(__dirname + "/test-data.txt", mostPopPages);

function mostVisits(data) {
  var max = data[0];
  data.forEach(function(entry) {
    if (parseInt(entry.numberOfVisits) > parseInt(max.numberOfVisits)) {
      max = entry;
    }
  })
  console.log(max);
}

function mostPopLang(data) {
  var langs = {};
  data.forEach(function(entry) {
    if (langs.hasOwnProperty(entry.language)) {
      langs[entry.language] += parseInt(entry.numberOfVisits);
    } else {
      langs[entry.language] = parseInt(entry.numberOfVisits);
    }
  })
  var keys = Object.keys(langs);
  keys.sort(function(a,b) {
    return langs[b] - langs[a];
  })
  console.log(keys[0], langs[keys[0]]);
  console.log(keys[1], langs[keys[1]]);
  console.log(keys[2], langs[keys[2]]);
  console.log(keys[3], langs[keys[3]]);
}

function mostPopPages(data) {
  var langs = {};
  data.forEach(function(entry) {
    if (langs.hasOwnProperty(entry.language)) {
      langs[entry.language] += parseInt(entry.numberOfVisits);
    } else {
      langs[entry.language] = parseInt(entry.numberOfVisits);
    }
  })
  var keys = Object.keys(langs);
  keys = keys.sort(function(a,b) {
    return langs[b] - langs[a];
  })
  var pop1 = keys[0];
  var pop2 = keys[1];
  var pop3 = keys[2];
  var filtered1 = data.filter(function(entry) {
    return entry.language === pop1;
  })
  mostVisits(filtered1);
  var filtered2 = data.filter(function(entry) {
    return entry.language === pop2;
  })
  mostVisits(filtered2);
  var filtered3 = data.filter(function(entry) {
    return entry.language === pop3;
  })
  mostVisits(filtered3);
}
