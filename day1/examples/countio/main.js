// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.

if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
  console.log("stats requested");
  var fs = require('fs');
  var fileContent=fs.readFileSync('./log.txt', 'utf8');
  var newFileContent =fs.writeFileSync('./log.txt', fileContent + '\n' + new Date());
} else {
  console.log("ran at:" + new Date());
}
