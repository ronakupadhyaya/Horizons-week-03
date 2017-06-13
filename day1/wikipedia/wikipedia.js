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

//Function to calculate the most popular page
function mostPopPage(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  })
  var mostVisits = [];
  var names = [];
  var lastMostPop = 0;
  var i = 0;
  rl.on('line', function(line) {
    if (line.indexOf(".mw")<0 && line.indexOf("Special:")<0) {
      var newLine = line.split(' ');
      var visits = parseInt(newLine[2])

      if (i<5) {
        mostVisits.push(newLine);
        mostVisits.sort(compareLines);
        i++;
      } else if (visits >= lastMostPop) {
        mostVisits.pop();
        mostVisits.push(newLine);
        mostVisits = mostVisits.sort(compareLines);
        lastMostPop = parseInt(mostVisits[4][2]);
      }
    }
  })
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('The most popular are ', mostVisits);
    console.log(i);
  });
  return mostVisits[0];
}

function compareLines(a, b) {
  return parseInt(a[2]) > parseInt(b[2]) ? -1 : 1;
}


//Function to calculate the most popular lagnuages
function mostPopLang(fileName) {
  var input = fs.createReadStream(fileName);
  var median = null;
  var rl = readline.createInterface({
    input: input
  })

  var visits = {};
  var mostPop = null;
  var i = 0;
  var mostVisits = [];
  var langs = {};
  var arr = [];

  rl.on('line', function(line) {
    if (line.indexOf(".mw")<0 && line.indexOf("Special:")<0) {
      line = line.split(' ');
      var lang = line[0].substring(0, 2);
      var newVisits = parseInt(line[2]);

      if (i<5) {
        if (visits[lang]) {
          visits[lang] = [lang, 'temp', visits[lang] + newVisits];
        } else {
          visits[lang] = [lang, 'temp', newVisits];
          i++;
        }
      }


      // if (i<5) {
      //   mostVisits.push([line[0], 'temp', line[2]])
      //   mostVisits = mostVisits.sort(compareLines)
      //   i++
      // } else if (newVisits>parseInt(mostVisits[4][2])) {
      //   mostVisits.pop()
      //   mostVisits.push(line)
      //   mostVisits = mostVisits.sort(compareLines)
      // }

      //
      // if (newVisits > max) {
      //   max = newVisits;
      // } else if (newVisits < min) {
      //   min = newVisits;
      //   console.log(min)
      // }
    }
    // console.log(visits)
    // console.log('ARRRAY: ',Object.keys(visits))
    arr = Object.keys(visits);
    // console.log(arr);
    // arr = arr.sort(function(a, b) {
    //   return visits[b]-visits[a];
    // });
    // var ans = [];
    // var max = arr[0];
    // var min = arr[0];
    // arr.forEach(function(key) {
    //   var num = parseInt(visits[key])
    //   if (num < min)
    //     min = num
    //   else if (num > max) {
    //     max = num
    //   }
    // })
    // console.log(ans)
    // return arr;
    // mostPop = arr.reduce(function(max, curr) {
    //   return (visits[curr] > visits[max]) ? curr : max;
    // })

  })

  rl.on('close', function() {
    console.log('The most popular lang is ', arr);
    // console.log(arr)
    // median = (max-min) / 2;
    //
    // console.log("median: ",median);

  });
  return;

}

//call functions
// countLines('sample.data')
// mostPopPage('june-6.data');
mostPopLang('june-6.data');


// function findPlace(arr, val) {
//   arr.pop();
//   console.log('find place: ',arr)
//
//   for (var i=0; i<arr.length; i++) {
//     if (val > arr[i]) {
//       return arr.splice(i, 0, val);
//     }
//   }
//   arr.push(val);
//   console.log('find place: ',arr)
//   return arr;
// }
