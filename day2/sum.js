
// var numb = 0;
// var sum = function(n) {
// 	numb += n
// }
// sum(processArgv);
// return numb;

// var readline = require('readline');

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question("Hi! What's your name? ", function(name) {
//   console.log('Nice to meet you', name);
//   rl.close();
// });
var count = 0;
var nums = [];
var x = process.argv;
x.forEach(function(item) {
	if(!isNaN(item)) {
		var y = parseInt(item);
		nums.push(y)
	}
})
nums.forEach(function(item) {
	count += item;
})
console.log(count)
