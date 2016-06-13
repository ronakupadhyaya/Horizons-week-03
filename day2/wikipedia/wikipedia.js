//var _ = require("../lib/underscore")
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var instream = fs.createReadStream('asd2');
var outstream = new stream;

function getTopArticles(lang){

  var topResults = [];
  var lastValueOfTop10=0;
  var rl = readline.createInterface(instream, outstream);
  rl.on('line', function(line) {
    var obj=parseLine(line)
    if(!lang ||( lang && lang === obj.domain) ){
      if (topResults.length<10){
        topResults.push(obj)
      }else{
        if (obj.count>lastValueOfTop10){
          topResults.push(obj)
          topResults.sort(function(a, b) {
            return parseInt(b.count) - parseInt(a.count);
          });
          topResults.splice(-1,1);
          lastValueOfTop10=topResults[topResults.length-1].count;
        }
      }
    }
  });

  rl.on('close', function() {
    console.log(topResults)//logs array of article objects
  });

  var parseLine = function (line){
    var lineArray = line.split(" ");
    return {
      domain:lineArray[0].split(".")[0],
      name:lineArray[1] || " ",
      count:lineArray[2]
    }
  }
}





//getTopLanguages()


function getTopLanguages(){
  var topResults = {};
  var lastValueOfTop10=0;
  var rl = readline.createInterface(instream, outstream);
  rl.on('line', function(line) {
    line = line.split(" ");
    var lang =line[0].split(".")[0]
    //  console.log(lang)
    topResults[lang] = topResults[lang] ?  (topResults[lang] + 1)  : 1;

  });

  rl.on('close', function() {
    var array=[]
    for(var property in topResults){
      array.push({
        lang:property,
        count:topResults[property]
      })
    }
    array.sort(function(a, b) {
      return parseInt(b.count) - parseInt(a.count);
    });
    //TODO Remove commons and other things that arent langs.
     array= array.slice(0, 10)
     console.log(array);
  });
}

/*
function topTenPerLang(){
  for (int i = 0; i< array.length; i++){
    connsole.logarray[i].lang
  }
}*/

//getTopLanguages();
//getTopArticles('es')
getTopArticles()
//getTopArticles('de')
//getTopArticles('en')


//domain_code
//page_title
//count_views
//total_response_size
