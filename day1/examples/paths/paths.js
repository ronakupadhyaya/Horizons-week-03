var array = [];
array.push(require('./a/c/main.js'));
array.push(require('./b/one.js'));
array.push(require('./a/two.js'));
array.push(require('./b/three.js'));
array.push(require('./a/c/four.js'));

for (var i = 0; i < array.length; i++) {
  for (var key in array[i]) {
    array[k]();
  }
}
