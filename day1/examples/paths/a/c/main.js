// Modify only this file

// The code below runs the functions exported by five.js
// five.js sits in the same directory so './five.js' is
// my relative path from main.js (current file)

// var five = require('./five.js')
// five.logger(five.value);

var array = [];
array.push(require('../../b/one.js'));
array.push(require('../two.js'));
array.push(require('../../b/three.js'));
array.push(require('./four.js'));

for (var i = 0; i < array.length - 1; i++) {
  for (var key in array[i]) {
    if (i === array.length - 2)
      array[i][key](array[i + 1].horizons)
    else
      array[i][key]()
  }
}


// Output should look like
//     *
//    *
//   *
//  *
