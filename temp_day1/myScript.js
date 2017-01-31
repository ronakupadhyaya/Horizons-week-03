console.log("hey");
console.log(process.argv); //argument list
//console.log(process);

console.log(__filename); //file name
console.log(__dirname); //directory name

var fs = require('fs');
function printMe() {
  console.log(fs.readFileSync(__filename, 'utf8'));
  // console.log(fs.readFileSync('text.txt', 'utf8'));
}
printMe(); //print out itself
