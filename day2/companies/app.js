"use strict";
var fs = require('fs');
const csv=require('csvtojson')
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

 // TODO
 // Json report.

module.exports = {
  fileReader
}
