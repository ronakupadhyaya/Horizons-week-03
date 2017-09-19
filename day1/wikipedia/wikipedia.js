"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

var __filename = process.argv[2]
var bank = []

function sorter(fileName) {
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });

  rl.on('line', function(line) {
    var pieces = line.split(' ');
    if (pieces[0].indexOf('.') !== -1 || pieces[1].indexOf(':') !== -1) {
      return
    }
    var lineobj = {
      "language": pieces[0],
      "pageName": pieces[1],
      "hits": pieces[2]
    };
    bank.push(lineobj);
  });
  rl.on('close', function() {
    bank.sort(function(a, b) {
      return b.hits - a.hits
    })
    // console.log(languageGrouper(bank));
    var mappedobj = _.mapObject(languageGrouper(bank), function(value, key) {
      // console.log(value);
      return value.reduce(function(sum, test) {
        return sum + parseInt(test.hits)
      }, 0)
    });
    var top3 = _.pairs(mappedobj).sort(function(a, b) {
      return b[1] - a[1]
    }).slice(0, 3).map(function(element) {
      return element[0]
    });
    var hopewearedone = languageGrouper(bank);
    console.log(top3);
    var final = {}
    for (var i = 0; i < top3.length; i++) {
      final[top3[i]] = hopewearedone[top3[i]].slice(0, 10);
    }
    console.log(final);
  });
}

function languageGrouper(objarray) {
  var obj = _.groupBy(objarray, function(element) {
    return element.language
  })
  return obj
}


// countLines(__filename);
sorter(__filename)
