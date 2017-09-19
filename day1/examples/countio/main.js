// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
var fs = require('fs');
var fileStr = fs.readFileSync('./log.txt', 'utf8');
var fileArr = fileStr.split('\n');

if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
    console.log("stats requested");

	var timesCalled = fileArr.length - 1;
	var first = fileArr[0];
	var last = fileArr[fileArr.length - 2];
	console.log("Function has been called " + timesCalled + " times.");
	console.log("Function was first called " + first);
	console.log("Function was last called " + last);
} else {
	var newFileStr = fs.writeFileSync('./log.txt', fileStr + new Date() + '\n');
}
