// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.



var fs = require('fs');
var fileArr = fs.readFileSync("./log.txt", 'utf8');

if (process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
  //running main.js -s or main.js --stats returns the total number of times the main.js program
  //has been run along with the first and last time it was run.
    var fileArrLines = fileArr.split("\n")
    console.log("This file has been run: ", fileArrLines.length - 1, " times");
    console.log("It was run first on: ", fileArrLines[0]);
    console.log("It was last run on: ", fileArrLines[fileArrLines.length-2]);
    //Note: running with -s or --stats flag should not add a timestamp or increment any counters.

} else {
  // add a line to the log.txt file with a timestamp for the current time.
  var newFileArr = fs.writeFileSync("./log.txt", fileArr + new Date() + "\n");
}
