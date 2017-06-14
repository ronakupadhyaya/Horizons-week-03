var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
var maleList = [];
var femaleList = [];
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get("/", function(req,res){
  res.render('index',{
    student:data
  });
});

data.forEach(function(student){
  if(student.gender === "Male"){
    maleList.push(student);
  }else{
    femaleList.push(student);
  }
});

app.get("/male", function(req,res){

  res.render("index",{
    student:maleList
  });
});

app.get("/female", function(req,res){
  res.render("index",{
    student:femaleList
  });
});


app.listen(3000);
