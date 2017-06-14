"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');
var self = this;

// Example code for reading a file line by line and counting
// the lines in it.
// function countLines(fileName) {
//   var input = fs.createReadStream(fileName);
//   var rl = readline.createInterface({
//     input: input
//   });
//   var count = 0;
//   rl.on('line', function(line) {
//     // This is called for each line in file
//     count++;
//   });
//   rl.on('close', function() {
//     // This is called when the file is done being read finished
//     console.log('There are %s lines in file %s', count, fileName);
//   });
// }
//
// countLines(__filename);


function parseData(fileName){
  var data = [];
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  rl.on('line', function(line) {
    // This is called for each line in file
    var lineArr = line.split(' ')
    var firstStr = lineArr[0];
    var secondStr = lineArr[1];
    if( (firstStr.length == 2) && (!secondStr.includes("Special:")) && (lineArr.length === 4) ){
      data.push({language: firstStr, pageName: secondStr, numVisits: parseInt(lineArr[2]), usage: parseInt(lineArr[3])});
    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    // console.log(data);
    popularPage(data);
    popularLan(data);
    part3(data);
  });
}

function popularPage(data){
  var grouped = _.groupBy(data,function(item){return item.pageName});
  var ans = [];
  _.keys(grouped).forEach(function(item){
    var objArr = grouped[item];
    var total = _.reduce(_.map(objArr,function(item){return item.numVisits}),function(a,b){return a+b});
    ans.push({page: item, visits: total});
  })
  ans = _.sortBy(ans,'visits').slice(ans.length-3,ans.length);
  return ans;
}

function popularLan(data){
  var grouped = _.groupBy(data,function(item){return item.language});
  var ans = [];
  _.keys(grouped).forEach(function(item){
    var objArr = grouped[item];
    var total = _.reduce(_.map(objArr,function(item){return item.numVisits}),function(a,b){return a+b});
    ans.push({'language code': item, visits: total});
  })
  ans = _.sortBy(ans,'visits').slice(ans.length-3,ans.length)
  // console.log('The most popular languages:\n',ans);
  return ans;
}

function part3(data){
  popularLan(data).forEach(function(item){
    var lan = item['language code'];
    var newdat = _.filter(data,function(row){return row.language===lan});
    console.log("The most popular languages in "+lan+" are:\n",popularPage(newdat))
  })
}

parseData('sample.data');
