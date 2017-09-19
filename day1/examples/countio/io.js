var fs = require('fs');
var fileArr = fs.readFileSync('./text.txt','utf8');
// console.log(fileArr);
// console.log(fileArr[0]);
// console.log(fileArr[1]);
// console.log(fileArr[2]);
// console.log(fileArr[3]);
// console.log(fileArr[4]);
// console.log(fileArr[5]);
// var i = 0;
// while(i < fileArr.length){
//   console.log(fileArr[i]);
//   i++;
// }

var newFile = fs.writeFileSync('./text.txt', fileArr + '\n' + '10 11 12\n');
