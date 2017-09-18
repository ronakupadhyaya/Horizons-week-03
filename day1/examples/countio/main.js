// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.

var fs = require('fs');
var fileStr = fs.readFileSync('./log.txt', 'utf8') + "\n";

if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
  var fileSplit = fileStr.split("\n");
  var fileArr = fileSplit.slice(1, fileSplit.length - 1)
  console.log("The first run occured at: " + fileArr[0]);
  console.log("The last run occured at: " + fileArr[fileArr.length-1]);
  console.log("This process has been run a total of " + fileArr.length + " times.");
} else {
  fs.writeFileSync( './log.txt', fileStr + new Date() );
}
