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
