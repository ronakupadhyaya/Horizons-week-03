var script = require('./script.js')

console.log(script);

function sayGreeting() {
	console.log(script.getGreeting())
}

sayGreeting();





var fs require ('fs');
var path = require('path');


function check(file) {
	console.log('path', file);
	console.log('Absolute path', path.resolve);
	console.log('Exists' fs.existsSync(file));
}


// Relative paths, use dot
// refer to current folder: 
check('.')
// refer to one folder up:
check('..')
// this starts at the root:
check('/empty_file')
// this one start at the root and does exist
check('/network')
// this one starts at the current folder
check('empty_file')


/absolute
var fs = require('fs');
var path = require('path');
function check(file) {
  console.log('Path: %s\nExists: %s\nAbsolute path: %s', file, fs.existsSync(file), path.resolve(file));
}
check('.')
check('..')
check('dir')
check('dir/file')
check('/dir')
check('/file')
check('../file')