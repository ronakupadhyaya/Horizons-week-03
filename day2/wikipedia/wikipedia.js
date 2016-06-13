var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('asd2');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

var topResults = [];
var lastValueOfTop10=0;

rl.on('line', function(line) {
  var lineArray = line.split(" ");
  var obj= {
    name:lineArray[1],
    count:lineArray[2]
  }

  if (topResults.length<=10){
    topResults.push(obj)
  }else{
    if (obj.count>lastValueOfTop10){
      topResults.push(obj)
      topResults.sort(sort);
      topResults.splice(-1,1);
      lastValueOfTop10=topResults[topResults.length-1].count;
    }
  }
  //domain_code
  //page_title
  //count_views
  //total_response_size
});

rl.on('close', function() {
  // do something on finish here
    console.log(topResults)
});


var sort = function(a, b) {
    return parseInt(b.count) - parseInt(a.count);
};
