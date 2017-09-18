// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.

var fs = require('fs'); //importing fs module
var log = fs.readFileSync('./log.txt', 'utf8'); //array of chars

if(process.argv[2] === '-s' || process.argv[2] === '--stats') { // if user called node main.js -s or --stats
  var numNewLines = 0;
  var i = 0
  while(log[i]) {
    if(log[i] === '\n') {
      numNewLines++; //counting the number of new line characters
    }
    i++;
  };
  console.log('This function has been called ' + (numNewLines) + " times.");

  //iterate forwards and concat until we find new line char
  i = 0;
  var firstTime = '';
  while(log[i] !== '\n') {
    firstTime += log[i];
    i++;
  }

  //iterate backwards (from the end) and prepend until we find new line char
  i = log.length - 2;
  var lastTime = '';
  while(log[i] !== '\n') {
    lastTime = log[i] + lastTime;
    i--;
  }
  console.log('The first call was at ' + firstTime + '.');
  console.log('The last call was at ' + lastTime + '.');
} else {
  fs.writeFileSync('./log.txt', log + new Date() + '\n', 'utf8');
}
