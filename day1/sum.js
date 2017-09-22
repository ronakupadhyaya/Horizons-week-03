var total = 0;

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
if(process.argv.slice(2).length < 2){
	rl.question("Enter first number", function(num1){
		rl.question("Enter Seoncd number", function(num2){
			console.log(parseInt(num1) + parseInt(num2));
			rl.close();
		})
	})
}

else{
	for(var i =0; i < process.argv.slice(2).length; i++){
		total += parseInt(process.argv.slice(2)[i]);

	}

	console.log(total);
	rl.close();
}
