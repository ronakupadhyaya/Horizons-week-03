// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.

var fs = require('fs');
var fileArr = fs.readFileSync('./log.txt', 'utf8');

if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
  console.log("stats requested");
  var count = 1;
  for (var i = 0; i < fileArr.length; i++) {
    if (fileArr[i] === '\n') count++;
  }
  var timestamp = new Date();

  console.log("ran for the first time at:" + timestamp);
  console.log("ran at:" + timestamp);
  var newFileArr = fs.writeFileSync('./log.txt', fileArr + '\n' + timestamp)
  console.log('main has been run ' + count + ' times');

}
else {
  var timestamp = new Date();
  console.log("ran at:" + timestamp);
  var newFileArr = fs.writeFileSync('./log.txt', fileArr + '\n' + timestamp)
}
