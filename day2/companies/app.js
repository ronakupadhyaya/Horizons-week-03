"use strict";
var fs = require('fs');
var csvjson = require('csvjson');
var path = require("path");

function fileReader(csvFilePath){
  var data = fs.readFileSync(path.join(__dirname, csvFilePath), { encoding : 'utf8'});
  var options = {
    delimiter : ',',
    quote: '"'
  };
  return csvjson.toObject(data, options);
}

// You will get an array of investment objects, iterate over them parsing the
// originalInvestment and valueToday of each one to Numbers, return an array.
// Fields to be parsed: "originalInvestment", "valueToday"
function parser(arr){
  // YOUR CODE HERE
}

module.exports = {
  fileReader: fileReader,
  parser: parser
}
