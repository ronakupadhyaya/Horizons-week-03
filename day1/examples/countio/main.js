// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
var fs = require('fs');
if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
  // console.log("stats requested");
  var fileArr = fs.readFileSync('./log.txt', 'utf8');
  var splitArr = fileArr.split("\n").length
  console.log(splitArr);

} else {
    // console.log("ran at:" + new Date());
  var fileArr = fs.readFileSync('./log.txt', 'utf8');
  var newFileArr = fs.writeFileSync('./log.txt', fileArr + '\n' + "ran at:" + new Date());
}
console.log(fileArr);
