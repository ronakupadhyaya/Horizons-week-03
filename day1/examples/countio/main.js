// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
var fs = require('fs');
var fileArray = fs.readFileSync('./log.txt', 'utf8');
var newFileArr = fs.writeFileSync('./log.txt', fileArray + '\n' + new Date());
console.log(fileArray);
if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
  console.log("stats requested");
  var firstUseArr = [];
  var lastUseArr = [];
  var numberOfTimesCalled = fileArray.split('\n');
  numberOfTimesCalled.shift();
  numberOfTimesCalled.shift();
  var timesCalled = numberOfTimesCalled.length
  for (var i = 6; i <= 45; i++) {
    firstUseArr.push(fileArray[i]);
  }
  for (var i= fileArray.length - 39; i <= fileArray.length; i++) {
    lastUseArr.push(fileArray[i]);
  }
  if (fileArray.length > 5){
    console.log('here is the first time this was used ' + firstUseArr.join(''));
    console.log('here is the last time this was used ' + lastUseArr.join(''));
  } else {
    console.log('this is the first time this was used.');
    console.log('Coincidentally, this was also the last time this was used.');
  }
  if (timesCalled === 0){
    timesCalled = 1;
    console.log('here is the number of times this was used INCLUDING right now ' + timesCalled);
  }else{
    console.log('here is the number of times this was used (not including right now )' + timesCalled);
  }
} else {
  console.log("ran at:" + new Date());
}
