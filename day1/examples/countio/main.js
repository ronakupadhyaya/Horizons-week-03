// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.

var fs = require('fs');
var fileArr = fs.readFileSync('./log.txt', 'utf8')
var date = new Date();

var newfileArr = fs.writeFileSync('./log.txt', fileArr + '\n' + date+ '\n')

var splitAtt = fileArr.split(/\n/);

var newArr = [];
for (var i = 0; i < splitAtt.length; i++){
  if (splitAtt[i] !== ''){
    newArr.push(splitAtt[i])
  }
}

var first_time = 0;

for (var i = 0; i < newArr.length; i++){
  if (newArr[i].length === 39){
    var first_time = newArr[i];
  }
}

var last_time = 0;

for (var i = newArr.length - 1; i >= 0; i--){
  if (newArr[i].length === 39){
    var last_time = newArr[i];
  }
}

var count = 0;
var index = 0;

while(index < newArr.length){
  if (newArr[index].length === 39){
    count++;
  }
  index++;
}
console.log('first time:', first_time)
console.log('last time:', last_time)
console.log('times run:', count)
