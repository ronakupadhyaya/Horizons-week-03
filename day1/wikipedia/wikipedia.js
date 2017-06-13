"use strict";
var _ = require('underscore')
var fs = require('fs');
var readline = require('readline');

// Example code for reading a file line by line and counting
// the lines in it.
// function countLines(fileName) {
//   var input = fs.createReadStream(fileName);
//   var rl = readline.createInterface({
//     input: input
//   });
//   var count = 0;
//   rl.on('line', function(line) {
//     // This is called for each line in file
//     count++;
//   });
//   rl.on('close', function() {
//     // This is called when the file is done being read finished
//     console.log('There are %s lines in file %s', count, fileName);
//   });
// }
//
// countLines(__filename);

// function maxVisits(fileName){
//   var input = fs.createReadStream(fileName);
//   var rl = readline.createInterface({
//     input: input
//   });
//   var count = 0;
//   var max=0;
//   var result=[];
//
//   rl.on('line', function(line) {
//     // This is called for each line in file
//
//     if(line.indexOf('.mw')!==-1 || line.indexOf('Special')!==-1){}
//     else{
//       count++;
//       var data=line.split(' ');
//       var visits=parseInt(data[2]);
//
//       if(count<10){
//         result.push(visits);
//         result=_.sortBy(result,function(num){return num});
//       }
//       if(count>10){
//         if(visits>result[0]){
//           result.splice(0,1);
//           result.push(visits);
//           result=_.sortBy(result,function(num){return num});
//         }
//       }
//     }
//
//
//   });
//   rl.on('close', function() {
//     // This is called when the file is done being read finished
//     console.log('There are %s lines in file %s', count, fileName);
//     console.log(result);
//   });
// }
//
// maxVisits('./pagecounts-20160606-170000')

// function maxVisitsbyLang(fileName){
//   var input = fs.createReadStream(fileName);
//   var rl = readline.createInterface({
//     input: input
//   });
//   var count = 0;
//   var max=0;
//   var result={};
//
//   rl.on('line', function(line) {
//     // This is called for each line in file
//
//     if(line.indexOf('.mw')!==-1 || line.indexOf('Special')!==-1){}
//     else{
//       count++;
//       var data=line.split(' ');
//       var visits=parseInt(data[2]);
//       var lang=data[0];
//       if(result.hasOwnProperty(lang)){
//         result[lang]=result[lang]+visits;
//       }
//       else result[lang]=visits;
//      }
//
//
//   });
//   rl.on('close', function() {
//     // This is called when the file is done being read finished
//     console.log('There are %s lines in file %s', count, fileName);
//     result=_.pairs(result)
//     result.sort(function(item1,item2){
//       return item1[1]-item2[1];
//     })
//     console.log(result.slice(result.length-10));
//   });
// }
// maxVisitsbyLang('./pagecounts-20160606-170000')

function maxVisitsLang(fileName){
  var input = fs.createReadStream(fileName);
  var rl = readline.createInterface({
    input: input
  });
  var count = 0;
  var max=0;
  var result={};
  result['en']={};
  result['es']={};
  result['ru']={};

  rl.on('line', function(line) {
    // This is called for each line in file

    if(line.indexOf('.mw')!==-1 || line.indexOf('Special')!==-1){}
    else{
      //count++;
      var data=line.split(' ');
      var visit=parseInt(data[2]);
      var lang=data[0];
      var page_name=data[1];
      if(result.hasOwnProperty(lang)){

        if(result[lang].hasOwnProperty(page_name)){
          result[lang][page_name]=result[lang][page_name]+visit;
        }
        else{
          result[lang][page_name]=visit;
        }
      }
     }

  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
  //  console.log(result);
    for(var i in result){
      // console.log(i);
      var obj=result[i];
      var temp=_.pairs(obj);
      temp.sort(function(item1,item2){
        // console.log(item1);
        return item1[1]-item2[1];
      });
      console.log(temp.slice(temp.length-10));
    }
  });
}
maxVisitsLang('./pagecounts-20160606-170000');
