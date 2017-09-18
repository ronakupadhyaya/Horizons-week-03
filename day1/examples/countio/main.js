// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
var fs = require('fs');
if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
    var fileBuffer= fs.readFileSync('./log.txt');
    var to_string = fileBuffer.toString();
    var split_lines = to_string.split("\n");
    console.log(split_lines.length -1);
} else {
    console.log("ran at:" + new Date());
    var fileBuffer = fs.readFileSync('./log.txt');
    fs.writeFileSync('./log.txt', fileBuffer + "ran at:" + new Date() + "\n")
}
