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


//Initial Function for all testing
//Parse data then passes into each test
function parseRaw(fileName, funcs) {
  //create data event and stream
  var rl = readline.createInterface({
    input: fs.createReadStream(fileName)
  });
  // Data structure is array of arrays, from line string
  var a = []
  //Event of new line triggers each data conversion
  rl.on('line', function(line) {
    //Test that language is two-char code
    if (line[2] === " ") {
      //check that page is useful page
      if(line.indexOf(":")===-1) {
        //create array from string and parse the integers
        var curr = line.split(" ")
        curr[2] = parseInt(curr[2])
        curr[3] = parseInt(curr[2])
        a.push(curr)
      }
    }
  })
  // Event close triggers parse completion and analysis calls
  rl.on("close", function() {
    // Find three most popular sites
    var func = funcs.splice(0,1)
    func[0](a)
    if(funcs.length > 0) {
      parseRaw(fileName, funcs)
    }
  })
}

function mostPopular(c) {
  c.sort(function(a,b){
    return b[2] - a[2]
  })
  c.splice(3);
  console.log();
  console.log("Top Three Most Popular: ");
  console.log("#1: ", c[0][1].substring(0,10), c[0][2]);
  console.log("#2: ", c[1][1].substring(0,10), c[1][2]);
  console.log("#3: ", c[2][1].substring(0,10), c[2][2]);
  console.log();
}



// Three most popular languages
function mostPopularLanguage(c) {
  // dictionary for accumulating totals
  var d = {}
  // performance optimized loop for building dictionary
  var i
  while( i = c.pop() ) {
    d[i[0]] = (d[i[0]] || 0) + i[2]
  }
  // organize into sortable array
  var e = []
  for(var key in d) {
    if(d.hasOwnProperty(key)) {
      e.push([key, d[key]])
    }
  }
  //sort array
  e.sort(function(a,b){
    return b[1] - a[1]
  })
  // keep top 3 language
  e.splice(3);
  console.log();
  console.log("Three Most Popular Languages");
  console.log("#1: ", e[0][0], e[0][1]);
  console.log("#2: ", e[1][0], e[1][1]);
  console.log("#3: ", e[2][0], e[2][1]);
  console.log();
}



//Call on data
parseRaw("data2.data", [mostPopular, mostPopularLanguage])
