var fs = require('fs');
var readLine = require('readline');

module.exports = {
  initialize: function(fileName) {
    var input = fs.createReadStream(fileName);
    return rl = readLine.createInterface({
      input: input
    });
  },

  parseLine: function(line) {
    var arr = line.split(" ");
    return {
      lang: arr[0],
      name: arr[1],
      visits: arr[2],
      bandwidth: arr[3]
    }
  },

  ignore: function(page) {
    return page.lang.match("\\.mw$") || page.name.match("^Special:");
  },

  countLines: function(fileName) {
    var rl = this.initialize(fileName);
    var count = 0;
    rl.on('line', function(line) {
      count++;
    });
    rl.on('close', function() {
      console.log('There are %s lines in file %s', count, fileName);
    });
  },

  mostPopularPages: function(fileName) {
    var rl = this.initialize(fileName);
    var pages = {};
    rl.on('line', function(line) {
      var obs = parseLine(line);
      if (!ignore(obs)) {
        // do something
      }
    });
  }



}
