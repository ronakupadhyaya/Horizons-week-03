var fs = require('fs');
function printMe() {
  console.log(fs.readFileSync(__filename, 'utf8'));
}
printMe();