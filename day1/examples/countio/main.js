// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.

if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
  console.log("stats requested");
  var fs = require('fs');
  var fileArr = fs.readFileSync('./log.txt', 'utf8');
  var numTimesRun = fileArr.length;
  console.log(fileArr);
  console.log(fileArr[0]);
  console.log(numTimesRun);
  console.log(fileArr[numTimesRun-1]);

} else {
  console.log("ran at:" + new Date());
  var newDate = "ran at:" + new Date();
  var fs = require('fs');
  var fileArr = fs.readFileSync('./log.txt', 'utf8');
  var fileArr = fs.writeFileSync('./log.txt', fileArr + '\n'+ newDate);
}
