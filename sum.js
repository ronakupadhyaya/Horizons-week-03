sum = 0;
if (process.argv[2] === null && process.argv[3] === null) {
	var input1 = prompt('Enter first number?');
	var input2 = prompt('Enter second number?');
	process.argv.push(input1, input2)
}
	for (var i=2; i<process.argv.length; i++) {
	sum += parseInt(process.argv[i]);
	}
}
console.log(sum)