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
  /* var obj = {}; */
  var arr = [];
  rl.on('line', function(line) {
    // [language] [page name] [number of visits] [bandwidth usage in bytes]
    if (line.indexOf('.mw') > -1 || line.indexOf(':') > -1) {
      count++;

      var split = line.split(' ');
      var page = split[1];
      var visits = split[2];

      var lineObj = {name: page, visits: visits}; // why does parseInt up here not do what i want it to do?
      arr.push(lineObj);

    }

  });
  rl.on('close', function() {
    var sorted = _.sortBy(arr, 'visits').reverse();
    sorted = sorted.slice(0, 10);
    sorted.push({ name: 'Fichier:Kit_body_belg16h.png', visits: 7 });

    var sumArr = [];
    sorted.forEach(function(page) {

      /* sumArr.push(page); */
      var pos = sumArr.map(function(e) {
        return e.name;
      }).indexOf(page.name);
      /* console.log(pos); */

      if (pos === -1) {
        sumArr.push({name: page.name, visits: parseInt(page.visits)});
      } else {
        sumArr[pos] = {name: page.name, visits: sumArr[pos].visits + parseInt(page.visits)};
      }
    })

    console.log(sumArr);
  });
}

countLines('./sample.data');


/* [ { name: 'Special:MyLanguage/Commons:Threshold_of_originality', */                        
/*     visits: '3' }, */                          
/*   { name: 'Kategoria:Kierunki_w_malarstwie', visits: '3' }, */                             
/*   { name: 'Istimewa:Daftar_berkas/Wuekero', visits: '3' }, */                              
/*   { name: 'Talk:Fourteenth_Amendment_to_the_United_States_Constitution', */                
/*     visits: '3' }, */                          
/*   { name: 'Categoria:Tecnologia_per_lo_sport', visits: '4' }, */                           
/*   { name: 'User:JanSuchy', visits: '4' }, */   
/*   { name: 'File:BIThumbMap_SCO.png', visits: '5' }, */                                     
/*   { name: 'Category:Passer_domesticus', visits: '5' }, */                                  
/*   { name: 'File:MalateChurchjf0859_15.JPG', visits: '7' }, */                              
/*   { name: 'Fichier:Kit_body_belg16h.png', visits: '7' } ] */
