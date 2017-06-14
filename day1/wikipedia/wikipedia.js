"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');
var wordArr;
var arr = [];
var arr_l = [];
var obj;
var count = 0;
// Example code for reading a file line by line and counting
// the lines in it.
function countLines(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var max_views = 0;
  var max_page = 0;
  var lang_dic = {};
  rl.on('line', function(line) {
    count ++;
    if(line.indexOf('.mw') === -1 && (line.indexOf('Special')) === -1){
        //does not contain .mw or special
        //find the max 10
      wordArr = line.split(" ");
      obj = {
        page: wordArr[1],
        views: parseInt(wordArr[2])
      }
      if (wordArr[0] in lang_dic) {
        lang_dic[wordArr[0]] += parseInt(wordArr[2])
      } else {
        lang_dic[wordArr[0]] = parseInt(wordArr[2])
      }

      arr.push(obj);
      if(arr.length > 10){
        arr = _.sortBy(arr, 'views');
        arr.splice(0,1);
      }

      if(parseInt(wordArr[2]) > max_views){
        max_views = parseInt(wordArr[2]);
        max_page = wordArr[1];
      }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    Object.keys(lang_dic).forEach(function(element) {
      arr_l.push({lang: element,
                  views: lang_dic[element]})
    })
    arr_l = _.sortBy(arr_l, 'views');
    arr_l.splice(11);
    console.log(arr_l)

  });
}

countLines("./sample.data");
