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
    count++;
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('There are %s lines in file %s', count, fileName);
  });
}

function mostPopularPage(fileName, cb){
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var finalArray = [];
  function compareFunction(a, b){
    //descending order biggest first.
    return parseInt(b[2]) - parseInt(a[2]) ;
  }
  rl.on('line', function(line) {
    // This is called for each line in file
    var lineArr = line.split(' ');
    if(lineArr[0].indexOf('mw') === -1 && lineArr[1].indexOf(':') === -1){
      if(finalArray.length < 10){
        finalArray.push(lineArr);
      } else{
        // array is full start comparing.
        // sort ten elements;
        finalArray.sort(compareFunction);
        // console.log("SORTED", finalArray.length);
        //Starting from largest, we compare and replace
        for(var i =0; i < finalArray.length; i++){

          if(parseInt(lineArr[2]) > parseInt(finalArray[i][2])){
            //get latest
            finalArray.splice(i, 0, lineArr);
            finalArray.pop();
            break;
          }
        }
      }

    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    // console.log(finalArray);
    cb(finalArray);
  });
}

function mostPopularLang(fileName, cb){
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var hashObj = {}
  rl.on('line', function(line) {
    // This is called for each line in file
    var lineArr = line.split(' ');
    if(lineArr[0].indexOf('mw') === -1 && lineArr[1].indexOf(':') === -1){
      var language = lineArr[0];
      var visits = lineArr[2];
      if(hashObj[language]){
        hashObj[language] = hashObj[language] + parseInt(lineArr[2]);
      } else{
        hashObj[language] = parseInt(lineArr[2]);
      }
    }

  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    function compareFunction(a, b){
      //descending order biggest first.
      return parseInt(b[1]) - parseInt(a[1]) ;
    }


    var newArr = [];
    for(var key in hashObj){
      newArr.push([key, hashObj[key]]);
    }
    newArr.sort(compareFunction);
    cb(fileName, newArr.slice(0,10));
  });
}

function mostPopularPageForThreeLang(fileName, threeMostPopularLangArr){
  function compareFunction(a, b){
    //descending order biggest first.
    return parseInt(b[2]) - parseInt(a[2]) ;
  }

  function returnArray(finalArray, lineArr){
    if(finalArray.length < 10){
      finalArray.push(lineArr);
    } else{
      // array is full start comparing.
      // sort ten elements;
      finalArray.sort(compareFunction);
      // console.log("SORTED", finalArray.length);
      //Starting from largest, we compare and replace
      for(var i =0; i < finalArray.length; i++){

        if(parseInt(lineArr[2]) > parseInt(finalArray[i][2])){
          //get latest
          finalArray.splice(i, 0, lineArr);
          finalArray.pop();
          break;
        }
      }

    }
  }
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });

  var lang1 = threeMostPopularLangArr[0][0];
  var lang2 = threeMostPopularLangArr[1][0];
  var lang3 = threeMostPopularLangArr[2][0];
  var lang1Arr = [];
  var lang2Arr = [];
  var lang3Arr = [];

  rl.on('line', function(line) {
    // This is called for each line in file
    var lineArr = line.split(' ');
    var lang = lineArr[0];
    if(lineArr[0].indexOf('mw') === -1 && lineArr[1].indexOf(':') === -1){
      if(lang === lang1){
        if(lang1Arr.length < 10){
          lang1Arr.push(lineArr);
        } else{
          // array is full start comparing.
          // sort ten elements;
          lang1Arr.sort(compareFunction);
          // console.log("SORTED", finalArray.length);
          //Starting from largest, we compare and replace
          for(var i =0; i < lang1Arr.length; i++){

            if(parseInt(lineArr[2]) > parseInt(lang1Arr[i][2])){
              //get latest
              lang1Arr.splice(i, 0, lineArr);
              lang1Arr.pop();
              break;
            }
          }

        }
      }
      if(lang === lang2){
        if(lang2Arr.length < 10){
          lang2Arr.push(lineArr);
        } else{
          // array is full start comparing.
          // sort ten elements;
          lang2Arr.sort(compareFunction);
          // console.log("SORTED", finalArray.length);
          //Starting from largest, we compare and replace
          for(var i =0; i < lang2Arr.length; i++){

            if(parseInt(lineArr[2]) > parseInt(lang2Arr[i][2])){
              //get latest
              lang2Arr.splice(i, 0, lineArr);
              lang2Arr.pop();
              break;
            }
          }

        }
      }
      if(lang===lang3){
        if(lang3Arr.length < 10){
          lang3Arr.push(lineArr);
        } else{
          // array is full start comparing.
          // sort ten elements;
          lang3Arr.sort(compareFunction);
          // console.log("SORTED", finalArray.length);
          //Starting from largest, we compare and replace
          for(var i =0; i < lang3Arr.length; i++){

            if(parseInt(lineArr[2]) > parseInt(lang3Arr[i][2])){
              //get latest
              lang3Arr.splice(i, 0, lineArr);
              lang3Arr.pop();
              break;
            }
          }

        }
      }
    }


  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log(lang1Arr);
    console.log(lang2Arr);
    console.log(lang3Arr);
  });
}

function calculateTrafficTrends(topTenArr){
  var input = fs.createReadStream('pagecounts-20160607-170000');
  var rl = readline.createInterface({
    input: input
  });
  // console.log(topTenArr);
  for(var i =0; i < topTenArr.length; i++){
    topTenArr[i][3] = 0;
  }
  var globalArray = [];
  function compareSubArray(topArr, lineArr){

    for(var i =0; i < topArr.length; i++){
      if(String(lineArr[0]) === String(topArr[i][0]) && String(lineArr[1]) === String(topArr[i][1])){
        return i;
      }
      // else if(lineArr[1] === topArr[i][1]){
      //
      // }
      // else if(lineArr[0] === 'en'){
      //   globalArray.push(lineArr);
      // }
    }
    // return globalArray;
  }
  rl.on('line', function(line) {
    // This is called for each line in file
    var lineArr = line.split(' ');
    if(compareSubArray(topTenArr, lineArr)){
      var index = compareSubArray(topTenArr, lineArr);
      console.log(lineArr);
      // console.log(lineArr[2], index);
      topTenArr[index][3] = lineArr[2];
    }

  });
  rl.on('close', function() {
    // This is called when the file is done being read finished

    console.log("CHANGED", topTenArr);
  });
}

// countLines(__filename);
// countLines('sample.data')
mostPopularPage('pagecounts-20160606-170000', calculateTrafficTrends);
// mostPopularLang('pagecounts-20160606-170000', mostPopularPageForThreeLang);

// mostPopularPageForThreeLang('pagecounts-20160606-170000');
