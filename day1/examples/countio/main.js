// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
var fs = require('fs');
var reader = fs.readFileSync('./log.txt', 'utf8');
if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
  console.log("times run: " + reader.split('\n').length);
} else {
  var writer = fs.writeFileSync('./log.txt', reader + '\n' + new Date());
  console.log("ran at:" + new Date());
}
