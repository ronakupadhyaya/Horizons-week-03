var fs = require('fs');
// console.log(__filename); // -> /Users/moreyes/Documents/Horizons/week03/nodetest/file_printer.js
// console.log(__dirname); // -> /Users/moreyes/Documents/Horizons/week03/nodetest
// __filename is the way to get the path to the file when you're inside a file
// __dirname gives the directory name

function printMe() {
    console.log(fs.readFileSync(__filename, 'utf8'));
}

// readFileSync - read the file and, until you're done, don't go to the next one until you're done
// reads the file synchronously; reads file itself
// utf8 is the encoding 

printMe();
