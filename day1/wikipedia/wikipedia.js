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
    count++;
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('There are %s lines in file %s', count, fileName);
  });
}

function checkLine(lineArray){
  if(lineArray[0].indexOf('.mw')>=0){
    return false;
  }
  if(lineArray[1].indexOf(':')>=0){
    return false;
  }
  return true;
}

function mostPopularPage(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var pages = [];
  var visitCounts = 0;
  rl.on('line', function(line) {
    line = line.split(' ');
    line[2] = parseInt(line[2]);
    if(checkLine(line)){
      if(line[2]>visitCounts){
        pages = [line[1]];
        visitCounts = line[2];
      }
      else if(line[2]=visitCounts[0]){
        pages.push(line[1]);
      }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log(`Max visits: ${visitCounts}\nPages: ${pages}`);
  });
}

function mostPopularLanguage(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var languages = {};
  rl.on('line', function(line) {
    line = line.split(' ');
    line[2] = parseInt(line[2]);
    if(checkLine(line)){
        if(languages.hasOwnProperty(line[0])){
          languages[line[0]]+=line[2];
        }
        else{
          languages[line[0]]=line[2];
        }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    var highestLanguage = '';
    var visits = 0;
    for(var language in languages){
      if(languages.hasOwnProperty(language)&&languages[language]>visits){
        highestLanguage=language;
        visits = languages[language];
      }
    }
    console.log(`Most popular language is ${highestLanguage} with ${visits} visits.`);
  });
}

function mostPopularLanguages(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var languages = {};
  rl.on('line', function(line) {
    line = line.split(' ');
    line[2] = parseInt(line[2]);
    if(checkLine(line)){
        var point = line[0].indexOf('.');
        if(point>=0){
          line[0]=line[0].slice(0,point);
        }
        var dash = line[0].indexOf('-');
        if(dash>=0){
          line[0]=line[0].slice(0,dash);
        }
        if(languages.hasOwnProperty(line[0])){
          languages[line[0]]+=line[2];
        }
        else{
          languages[line[0]]=line[2];
        }
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    var sortFunction = function(a,b){
      return b[1]-a[1];
    }
    var minCutOff = 0;
    var highestLanguages = [];
    var counter = 0
    for(var language in languages){
      if(languages.hasOwnProperty(language)){
        if(counter<10){
          counter++;
          highestLanguages.push([language,languages[language]]);
          if(counter===10){
            highestLanguages.sort(sortFunction);
            minCutOff = highestLanguages[9][1];
          }
        }
        else{
          if(languages[language]>minCutOff){
            highestLanguages.pop();
            highestLanguages.push([language,languages[language]]);
            highestLanguages.sort(sortFunction);
            minCutOff = highestLanguages[9][1];
          }
        }
      }
    }
    var result = `Most Popular Languages:`;
    highestLanguages.forEach(function(item,index){
      result+=`\n${index}. ${item[0]}: ${item[1]}`;
    });
    console.log(result);
  });
}

console.log(mostPopularLanguages('./pagecounts-20160606-170000'));
