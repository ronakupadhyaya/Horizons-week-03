"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

// Example code for reading a file line by line and counting
// the lines in it.
function maxVisits(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var top_ten_visits = 0;
  var arr_title_final = [];
  rl.on('line', function(line) {
    // This is called for each line in file
    var arr_temp = line.split(' ');
    if ((arr_temp[0].indexOf('.mw')===-1) && (arr_temp[1].indexOf('Special:')===-1)) {
      if (parseInt(arr_temp[2]) > top_ten_visits) {
        if (arr_title_final.length === 10) {
          arr_title_final[arr_title_final.length-1] = arr_temp;
          arr_title_final.sort(function(a,b) {
            return b[2]-a[2];
          })
          top_ten_visits = parseInt(arr_title_final[arr_title_final.length-1][2]);
        }else {
          arr_title_final.push(arr_temp);
        }
      }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log(arr_title_final);
  });
}
maxVisits('June-6-data');


function maxLanguageVisits(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var max_visits = 0;
  var final_obj = {};
  rl.on('line', function(line) {
    var arr_temp = line.split(' ');
    if ((arr_temp[0].indexOf('.mw')===-1) && (arr_temp[1].indexOf('Special:')===-1)) {
      if (final_obj.hasOwnProperty(arr_temp[0])) {
        final_obj[arr_temp[0]] += parseInt(arr_temp[2]);
      } else {
        final_obj[arr_temp[0]] = parseInt(arr_temp[2]);
      }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished]
    var keys = Object.keys(final_obj);
    var pairs = []
    keys.forEach(function(lang) {
      var temp = [];
      temp.push(lang);
      temp.push(final_obj[lang]);
      pairs.push(temp);
    })
    pairs.sort(function(a,b) {
      return b[1]-a[1];
    })
    console.log(pairs[0]);
  });
}

// maxLanguageVisits('June-6-data')
