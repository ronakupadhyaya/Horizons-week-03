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


//CONVERT TO ARRAY AND FILTER
function searchLines(fileName) {
  var arrayOfData = []
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  rl.on('line', function(line) {
if((line.indexOf("Special:") < 0 ) && (line.indexOf(" ") < 3)) {
  arrayOfData.push(line)
}
  });
  rl.on('close', function() {
    // 1 This is called when the file is done being read finished

// console.log(arrayOfData.length)



    // CONVERT TO ARRAY OF OBJECTS
    var arrayOfObjects = []

    //LOOP THROUGH EACH LINE
    for (var i=0; i<arrayOfData.length; i++) {

    var lineObject = {}

    //ARRAY OF CONTENT
    var content = arrayOfData[i].split(" ")

    //KEY LANG
    lineObject.language = content[0]
    lineObject.pageName = content[1]
    lineObject.numberOfVisits = ~~+(content[2])
    lineObject.bandwidth = ~~+(content[3])

    arrayOfObjects.push(lineObject)
    }












//1Done dealing with the array
  });

}

searchLines("sample.data")
