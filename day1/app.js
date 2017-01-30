"use strict";
// console.log(process.argv); //first element is the node path, 2nd is the file you're running
var nums = process.argv.slice(3);
// console.log(nums);

if (process.argv[2] === "--product") {
	var product = nums.reduce(function(a, b) {
		return a * b;
	});
	console.log(product);
} else if (process.argv[2] === "--sum") {
	var sum = nums.reduce(function(a, b) {
		return parseInt(a) + parseInt(b);
	});
	console.log(sum);
} else {
	throw Error("no flag was given");
}