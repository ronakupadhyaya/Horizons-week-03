// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
var fs = require("fs");

if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
    console.log("stats requested");
    var readFile = fs.readFileSync("./log.txt", "utf8")
    console.log(readFile)

} else {
var readFile = fs.readFileSync("./log.txt", "utf8")
fs.writeFileSync("./log.txt", readFile + "\r\n" + Date.now())
}
