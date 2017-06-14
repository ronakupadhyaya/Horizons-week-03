"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

// Example code for reading a file line by line and counting
// the lines in it.

function mostPopular(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var visits = []
  rl.on('line', function(line) {
    if((line.indexOf("Special:") < 0 ) && (line.indexOf(" ") < 3)) {
      var content = line.split(" ")
//MAKE A ARRAY OF FIRST 10 VISITS
      if(visits.length<10) {
      visits.push(~~+content[2])
      //SORT THE ARRAY
      visits.sort(function compareNumbers(a, b) {
        return a - b; })
      }

// ONCE DONE TAKE A VALUE AND COMPARE TO ARRAY
    if(visits.length === 10) {
      for (var i=0; i<10; i++) {
        //IF ITS GREATER THAN REPLACE THE NUMBER WITH THIS VALUE

        if(~~+content[2]>visits[i]) {
          visits.splice(i,1,~~+content[2])

          visits.sort(function compareNumbers(a, b) {
              return a - b;
                })
          break;
        }

      }
    }
  }

  });
  rl.on('close', function() {
    console.log(visits)
  });
}

mostPopular("sample.data")
