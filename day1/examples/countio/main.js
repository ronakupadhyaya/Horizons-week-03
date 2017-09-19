// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
    var fs = require('fs');
    var fileStr = fs.readFileSync('./log.txt', 'utf8');
    var newFileStr = fileStr.split('\n');
  	console.log('Ran: ' + newFileStr.length + ' times');
    console.log(newFileStr[0], newFileStr[newFileStr.length - 1]);
} else {
    console.log("ran at:" + new Date());
    var fs = require('fs');
	var fileStr = fs.readFileSync('./log.txt', 'utf8');
	var newFileStr = fs.writeFileSync('./log.txt', fileStr + '\n' + new Date());
}
    