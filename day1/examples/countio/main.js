// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.

var fs = require('fs');
var fileArr = fs.readFileSync('./log.txt', 'utf8');
var countArr = fs.readFileSync('./counter.txt', 'utf8');
var counter = 0;
var firstCall = '';
var lastCall = '';

// var dateInitiator = function() {
//   return function(){
//     calls.push(new Date());
//   }
// }

if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
  console.log("stats requested");

  countArr = countArr.slice();
  console.log(countArr);
  countStr = countArr.toString();

  var counter = 0;
  for(var i = 0; i < countArr.length; i++){
    if(countArr[i] === '\n'){
      counter++;
    }
  }

  console.log("main.js has been called: " + counter + " times")
  console.log("First call made at: " + countStr.slice(0,40));
  console.log("Last call made at: " + countStr.slice(countStr.length - 40, countStr.length - 1))
} else {
  console.log("ran at:" + new Date());
  // addDate();

  fs.writeFileSync('./counter.txt', countArr + new Date() + '\n');
  fs.writeFileSync('./log.txt', fileArr + "\n" + process.argv[2]);

}
