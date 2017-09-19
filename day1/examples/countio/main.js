// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
// var count = 0;
if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
    var fs = require('fs')
    var file = fs.readFileSync('./log.txt','utf8');
    var count = file.split('\n')
    console.log(`function ran ${count.length -1} times`);
    console.log(`first ran at ${count[0]}, last ran at ${count[count.length -2]}`)
} else {
    var time = new Date()
    console.log("ran at:" + new Date());
    count++;
    //good below
    var fs = require('fs')
    var file = fs.readFileSync('./log.txt','utf8');
    var newFile = fs.writeFileSync('./log.txt', file + new Date() + '\n');
}


// count.length
