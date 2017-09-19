"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

// Example code for reading a file line by line and counting
// the lines in it.
function countLines(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  var mostVisits = 0;
  var mostVisitedPage = "";

  var languages = {};

  var topPages = [];

  rl.on('line', function(line) {
	  if(!line.includes('.mw') && !line.includes(':')){
		  var res = line.split(' ');
		  if(res[2] > mostVisits){
			  mostVisits = parseInt(res[2]);
			  mostVisitedPage = res[1];
		  }

		  if(!languages.hasOwnProperty(res[0])){
			  languages[res[0]] = 0;
		  }

		  languages[res[0]]++;

		  var lang = res[0];
		  var name = res[1];
		  var visits = res[2];
		  var bytes = res[3];
		  var obj = {
		  "name": name,
		  "lang": lang,
		  "visits": visits,
		  "bytes": bytes
		  };

		  if(topPages.length < 10){
			  topPages.push(obj);
			  topPages.sort();
		  }

		  else if(obj["visits"] > topPages[9]["visits"]){
			  topPages[9] = obj;
		  }
	  }
    // This is called for each line in file
    count++;
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
	var highestLang = 0;
	var lang = "";

	var secondHighestLang = 0;
	var secondLang = "";

	var thirdHighestLang = 0;
	var thirdLang = "";

	_.mapObject(languages, function(val, key){
		if(val > highestLang){
			highestLang = val;
			lang = key;
		}

		else if(val > secondHighestLang){
			thirdHighestLang = secondHighestLang;
			thirdLang = secondLang;
			secondHighestLang = val;
			secondLang = key;
		}

		else if(val > thirdHighestLang){
			thirdHighestLang = val;
			thirdLang = key;
		}
	})
	console.log("The most highly read pages are ");
	for(var i = 0; i < 10; i++){
		console.log(topPages[i]["name"]);

	}
	console.log("The most widely used language is " + lang);
	console.log("The second most widely used language is " + secondLang);
	console.log("The third most widley used language is " + thirdLang);
    console.log('There are %s lines in file %s', count, fileName);
  });




}

countLines('./sample.data');
