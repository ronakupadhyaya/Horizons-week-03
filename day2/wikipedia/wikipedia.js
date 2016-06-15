var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');
var program = require('commander');

// Example code for reading a file line by line and counting
// the lines in it.
function countLines(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  rl.on('line', function(line) {
    // This is called for each line in file
    count++;
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    console.log('There are %s lines in file %s', count, fileName);
  });
}

// countLines(__filename);



program.command('toplangs')
	.description("Top Languages")
	.action(topLangs);

program
	.option('-l, --langs', 'topLangs');


function topLangs(fileName) {
	
	var input = fs.createReadStream(fileName);
	var rl = readline.createInterface({
		input: input
	});

	var langs = [];
	rl.on('line', function(line) {
		var newLine = line.split(' ');
		console.log("TESTING", newLine[0]);
		if (newLine.length == 4 &&
			newLine[0] !== 'mw') {
			temp = {}
			var keys = [];
			var language = newLine[0];
			for (var i = 0; i<langs.length; i ++){
				// console.log(Object.keys(langs[i]));
				var arr = Object.keys(langs[i]);
				var key = arr[0];
				keys.push(key);
			}

			if (keys.indexOf(language) === -1) {
				temp[language] = 1;
				langs.push(temp);
			}

			else {
				for (var i = 0; i < langs.length; i++) {
					// console.log("KEY",Object.keys(langs[i]));
					// console.log("LANG", language);
					if ((Object.keys(langs[i]))[0] === language) {
						langs[i][language] ++;
					}
				}
			}
			// console.log(langs);
		}
	});
	rl.on('close', function() {
		// console.log("LANGGGSSSSS",langs);
    	var sorted = _.sortBy(langs, function(language) {
    		return langs[language];
    	});

    	var top10 = [];
    	for (var i = 0; i < 10; i++) {
    		// console.log("TESTING", sorted);

    		top10.push((Object.keys(sorted[i]))[0]);
    	}
    	console.log(top10);
	});
}

//topLangs('pagecounts-20160606-170000');







