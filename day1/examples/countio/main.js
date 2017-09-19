// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.

var fs = require('fs');
var fileArr = fs.readFileSync('./log.txt','utf8');
var firstArr = fileArr.split('\n')

if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
    console.log("stats requested");
    console.log(firstArr.length);
    // var firstTime = fs.readFileSync('./log.txt', 'utf8');
    console.log(firstArr[0]);
    console.log(firstArr[firstArr.length-1]);

} else {
    console.log("ran at:" + new Date());
    var newFile = fs.writeFileSync('./log.txt', fileArr + "run at:" + new Date() + '\n');
}
