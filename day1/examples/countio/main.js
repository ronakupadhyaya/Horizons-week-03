// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
var fs = require('fs');
if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
    var text = fs.readFileSync('./log.txt', 'utf8');
    var split = text.split('\n');
    console.log(split.length -1)
    console.log(split[0])
    console.log(split[split.length-2])
} else {
    console.log("ran at:" + new Date());
    fs.appendFileSync('./log.txt', new Date() + '\n', 'utf8');
}
