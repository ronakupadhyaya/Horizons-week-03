// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
var fs = require('fs'); 
var fileArr = fs.readFileSync('./log.txt', 'utf8');
var newFileArr = fs.writeFileSync('./log.txt', fileArr + '\n' + new Date());


if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
    console.log("stats requested");
} else {
    console.log("ran at:" + new Date());
}

console.log(process.argv.slice[2]); 





var mongoose = require('mongoose');
mongoose.connect("mongodb://ingridzippe:dirgni1!!A@ds141524.mlab.com:41524/ingridzippe")


console.log('MONGO DB URI IS', process.env.MONGODV_URI);
    