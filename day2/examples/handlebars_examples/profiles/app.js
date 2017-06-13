var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
//anything on the node js website is already good so you don't need to install fs
var fs= require('fs');
var _= require('underscore');
var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE

//JSON.parse(fs stuff)
//fs.readfilesync can read any file and you want to convert the file to a json object--before was in a json file but not a json object--before
//a buffer is a string of bytes
//if you read an image with fsfilesync you also get a sequence of bites
//changing images makes you mess around with sequences of bytes


//the json file looks like an array of objects but it's actually a large string and only way to convert into a

//we need fs.readfilesync because it's not in the browser so we can't use jquery and ajax

//for js uses require but non js uses readfilesync--music, image, json, whatever
var students=JSON.parse(fs.readFileSync('data.json'));

// app.get('/', function(req, res){
// })

app.get('/:gender', function(req, res){
  if(req.params.gender==='male'){


    res.render('index.hbs',{

      students:_.groupBy(students, 'gender')['Male']

    })
  }else if(req.params.gender==='female'){


    res.render('index.hbs',{

      students:_.groupBy(students, 'gender')['Female']

    })
  }

})

app.get('/', function(req, res){
  res.render('index.hbs', {
    students: students
  })
})





app.listen(3000);
