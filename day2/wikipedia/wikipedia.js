
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
  
  var lineArray = [];
  var langArray = [];
  var count = 0;
  rl.on('line', function(line) {
    // This is called for each line in file
    lineArray = line.split(' ');
    langArray.push(lineArray);
    count++;
  });


  rl.on('close', function() {
    // This is called when the file is done being read finished
    langArray = langArray.sort(function(a,b) {
      if ([a][0] > [b][0]) {
        return -1;
      }
      else {
        return 1;
      }
      });
    //debugger;
   // console.log(langArray);
   var currentArray = [langArray[0]];
   for (var i = 0; i < langArray.length; i++) {
    
    if (langArray[i][0] === langArray[i + 1][0]) {
      langArray[i][3] += langArray[i+1][3];
      langArray.splice(i+1, 1);
      i+=1;
      }
      else {
        i+=1;
      }
   }

      // if (currentArray[i][0] === langArray[i+1][0]) {
      //   currentArray[i][3] += langArray[i+1][3];

      // }


   console.log(langArray);
    console.log('There are %s lines in file %s', count, fileName);
  });
}

countLines('sample.data');
