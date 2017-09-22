// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
var fs = require('fs');
var fileContents = fs.readFileSync('./log.txt', 'utf8')
var timestampLength = 40;
var sentenceLength = 7;

if (process.argv[2] === '-s' || process.argv[2] === '--stats') {
  // console.log('This program has been run', fileContents.length, 'times.');
  console.log('The first run was at', fileContents.substring(sentenceLength + 1, sentenceLength + timestampLength))
  if (fileContents.length > 1) {
    console.log('The  last run was at', fileContents.substring(fileContents.length - timestampLength + 1))
  }
} else {
  var newLine = ''
  if (fileContents.length > 1)
    newLine = '\n'
  fs.writeFileSync('./log.txt', fileContents + newLine + 'ran at: ' + new Date())
}
