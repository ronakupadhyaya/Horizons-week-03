// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
var fs = require('fs');
var counter;
var fileArr = fs.readFileSync('./log.txt', 'utf8');
var counterArr = fs.readFileSync('./counter.txt', 'utf8');
if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
    console.log("stats requested");
    var newCounterArr = fs.writeFileSync('./counter.txt', counterArr + 0);
    counter = counterArr.length;
    console.log(counter);
} else {
    console.log("ran at:" + new Date());
    var date = new Date;
    var newFileArr = fs.writeFileSync('./log.txt', fileArr + date);
    var newCounterArr = fs.writeFileSync('./counter.txt', counterArr + 0);
    counter = counterArr.length;
}
