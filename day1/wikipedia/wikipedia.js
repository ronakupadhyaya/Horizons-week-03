"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

function countLines(fileName) {
  var object = []
  var array = []
  var key;
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  rl.on('line', function(line) {
    if(!(line.includes(":") || line.includes(".mw"))) {
        array = line.split(" ");
        key = array.splice(1,1);
        if (!(key[0] in object)) {
            object.push({'page_name': key[0],
            'language': array[0],
            'visits': parseInt(array[1]),
        })
        }
        count++;
    }
  });

  rl.on('close', function() {
      var sortVisit = _.sortBy(object, function(item){
          return item.visits
      });
      var sortLang = _.sortBy(object, function(item){
          return item.language
      });
      var topVisits = _.last(sortVisit, 10);
      var topLang = _.last(sortLang, 10);
      topVisits = _.map(topVisits, function(visit) {
          return visit.page_name
      })
      topLang = _.map(topLang, function(visit) {
          return visit.page_name
      })
      var filterLang = _.filter(sortLang, function(item) {
          return item in topLang
      })
    console.log('There are %s lines in file %s', count, fileName);
  });
}

countLines('sample.data');
