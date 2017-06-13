"use strict";


var fs = require('fs');
var path = require('path');
var csvjson = require('csvjson');
// var _ = require('underscore');

// Write a function that takes the path of a CSV file, reads its contents and
// returns them as as an array of JavaScript objects.
//
// You will need to use:
//  - csvjson.toObject(): https://www.npmjs.com/package/csvjson
//  - fs.readFileSync(): https://nodejs.org/api/fs.html#fs_fs_readfilesync_file_options
//
// Note: you need to require('packageName') before the csvjson or fs packages.
//
// ex. fileReader('investments1.csv') ->
//   [ { id: '1',
//      investorId: '1',
//      company: '9',
//      originalInvestment: '1100000',
//      valueToday: '1000000' },
//    { id: '2',
//      investorId: '1',
//      company: '1',
//      originalInvestment: '200000',
//      valueToday: '190000' },
//    { id: '3',
//      investorId: '5',
//      company: '10',
//      originalInvestment: '234000',
//      valueToday: '300000' },
//      ...
//    ]

var options = {
  delimiter : ',' // optional
};
function fileReader(csvFilePath){
  // YOUR CODE HERE
  // console.log(csvFilePath);
  // console.log();
  var str = fs.readFileSync(csvFilePath, 'utf-8');
  var json = csvjson.toObject(str,options);
  // console.log(json);
  return json;
  // return str;
}

// fileReader('investments1.csv');


// Write a function that takes an array of investment objects and replaces
// the "originalInvestment", "valueToday" fields in each object with numbers
// instead of strings.
//
// You will need to use: parseInt()
// ex. parser([{id: '1', investorId: '1', company: '9',
//              originalInvestment: '1100000',
//              valueToday: '1000000' }]) ->
//   [{id: '1', investorId: '1', company: '9',
//     originalInvestment: 1100000, // Note conversion from string to number
//     valueToday: 1000000}] // Note conversion from string to number
function parser(arr){
  // YOUR CODE HERE

  arr.forEach(function(item){
    var orig = item["originalInvestment"];
    item["originalInvestment"] = parseInt(orig);
    var val = item["valueToday"];
    item["valueToday"] = parseInt(val);
  })

  return arr;
}

module.exports = {
  fileReader: fileReader,
  parser: parser
}
