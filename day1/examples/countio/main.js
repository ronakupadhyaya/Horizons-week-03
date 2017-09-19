// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.

fs = require('fs');
var text = fs.readFileSync('./log.txt','utf8').split(/\n/);
if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
    console.log('Number of times called: ' + parseInt(text.length-1));
} else {
  fs.writeFileSync('./log.txt',text + new Date() + '\n');
}
