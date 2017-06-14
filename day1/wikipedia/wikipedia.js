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
  // var result=[];
  // var count = 0;
  var max=0;
  var str;
  var obj={};

  rl.on('line', function(line) {
    var arr=line.split(' ');
    // This is called for each line in file
    // obj['language']=arr[0];
    // obj['page name']=arr[1];
    // obj['number of visits']=arr[2];
    // obj['bandwidth']=arr[3];
    // result.push(obj);
    if (arr[0].length<=2 && arr[1].indexOf('Special:')<0){

      if (arr[2]>max){
        max=+arr[2];
        str=arr[1];
        //console.log(str,max);
      }

      if (!obj.hasOwnProperty(arr[0])){
          obj[arr[0]]= +arr[2];
      }

      if (obj.hasOwnProperty(arr[0])){
          obj[arr[0]]+= +arr[2]
      }


    }
  });
  rl.on('close', function() {
    // This is called when the file is done being read finished
    // console.log(str,max);
    var max_lan = 0;
    var lan;
    for (var key in obj){
      if (obj[key]>max_lan){
        max_lan=obj[key];
        lan=key;
      }
    }
    console.log(lan,max_lan);;
  });
}
countLines('sample.data')
