"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

// top 10 most popular pages.
function popPage(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  var max = 0;
  var lang;
  var page;
  var top10 = [];
  rl.on('line', function(line) {
    var newVals = line.split(' ');
    var val = parseInt(newVals[2]);
    if (!newVals[0].includes('.mw') && !newVals[1].includes('Special:')){
      if (top10.length < 11){
        top10.push(newVals);
        top10.sort(sortFunction)
      }else if (top10.length > 9){
        top10.sort(sortFunction);

      }
      if(val>max){
        console.log(newVals);
        max = val;
        lang = newVals[0];
        page = newVals[1];
      }
      if (parseInt(top10[top10.length-1][2])<val && count > 10){
        top10.pop()
        top10.push(newVals);
        top10.sort(sortFunction);
      }
      count++;
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('There most popular page is ' + page +' with ' + max + ' visits');
    console.log('There most language is ' + lang);
    console.log(top10);
    return top10;
  });
}
function sortFunction(a, b) {
    if (parseInt(a[2]) === parseInt(b[2])) {
        return 0;
    }
    else {
        return (parseInt(a[2]) > parseInt(b[2])) ? -1 : 1;
    }
}





//Top 10 most popular languages
function popLang(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var max = 0;
  var lang = {};
  var top10 = [];
  rl.on('line', function(line) {
    var newVals = line.split(' ');
    var val = parseInt(newVals[2]);
    if (!newVals[0].includes('.mw') && !newVals[1].includes('Special:')){
      if (lang[newVals[0]]){
        lang[newVals[0]]+= parseInt(newVals[2]);
      }else{
        lang[newVals[0]]= parseInt(newVals[2]);
      }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    var sortable = [];
    for (var language in lang) {
        sortable.push([language, lang[language]]);
    }
    sortable.sort(function(a, b) {
    return b[1] - a[1];
    });
    var final = sortable.slice(0,10)
    console.log(final);
    return final;
  });
}
function sortFunction(a, b) {
    if (parseInt(a[2]) === parseInt(b[2])) {
        return 0;
    }
    else {
        return (parseInt(a[2]) > parseInt(b[2])) ? -1 : 1;
    }
}



//Top 10 websites for specific language
function popSpecLang(fileName, lang) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  var max = 0;
  var lang;
  var page;
  var top10 = [];
  rl.on('line', function(line) {
    var newVals = line.split(' ');
    var val = parseInt(newVals[2]);
    if (!newVals[0].includes('.mw') && !newVals[1].includes('Special:') && newVals[0]===lang){
      if (top10.length < 11){
        top10.push(newVals);
        top10.sort(sortFunction)
      }else if (top10.length > 9){
        top10.sort(sortFunction);

      }
      if(val>max){
        console.log(newVals);
        max = val;
        lang = newVals[0];
        page = newVals[1];
      }
      if (parseInt(top10[top10.length-1][2])<val && count > 10){
        top10.pop()
        top10.push(newVals);
        top10.sort(sortFunction);
      }
      count++;
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log(top10);
    return top10;
  });
}





//console.log(popPage('june6.data'));
//console.log(popLang('june6.data'));
//console.log(popSpecLang('june6.data', 'en'));
//console.log(popSpecLang('june6.data', 'es'));
//console.log(popSpecLang('june6.data','ru'));
