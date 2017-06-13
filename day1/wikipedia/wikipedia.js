"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

// Example code for reading a file line by line and counting
// the lines in it.
function countLines(fileName) {
  
 
  var rl = readline.createInterface({
    input: input
  });



  var maxVisitors = {all: [], en: [], es: [], ru: []};
  var maxVisitorsKeys = _.keys(maxVisitors);
  var languages = {};
  rl.on('line', function(line) {
    var parts = line.split(' ');
    if(parts.length === 4 && parts[0].indexOf('.mw') === -1 && parts[1].indexOf('Special:') === -1){
      var visitors = parseInt(parts[2]);
      parts[2] = visitors;
      for( var i = 0 ; i < maxVisitorsKeys.length ; i++){
        var curr = maxVisitorsKeys[i]
        if(curr === 'all' || curr=== parts[0]){
          var currMax = maxVisitors[curr]
          currMax.push(parts);
          if(currMax.length > 10){
            currMax.sort(function(a,b){
              return b[2] - a[2];
              })
              currMax.pop()
            }
          }
        }
        var lang = parts[0];
        if(!_.has(languages, lang)){
          languages[lang] = 0;
        }
        languages[lang] += visitors;
      }

    });

  // var input = fs.createReadStream(fileName);



  reader.on('close', function() {
    console.log(maxVisitors);
    console.log(_.chain(languages).pairs().sortBy(x => -x[1]).first(10).value());

    var topPagesDay1 = {};
    maxVisitors.all.forEach(function(page) {
      topPagesDay1[page.slice(0, 2).join(' ')] = [page[2]];
    });

    var day2Reader = readline.createInterface({
      input: fs.createReadStream(process.argv[2])
    });
    day2Reader.on('line', function(line) {
      line = line.split(' ');
      if (_.has(topPagesDay1, line.slice(0, 2).join(' '))) {
        topPagesDay1[line.slice(0, 2).join(' ')].push(parseInt(line[2]));
      }
    });
    day2Reader.on('close', function() {
      console.log(topPagesDay1);
    });
  });
}
