var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get("/male", function(req,res){
  function isMale(myArray){
    return myArray.gender === "Male"
  }
  var males = data.filter(isMale);
  res.render("maleTemp",{
    myArray: males
  })
})

app.get("/female", function(req,res){
  function isFemale(myArray){
    return myArray.gender ==="Female"
  }
  var females = data.filter(isFemale)

  res.render("femaleTemp",{
    myArray: females
  })
})



app.get("/", function(req,res){
  res.render("thisTemp", {
    myArray: data
  })
})

app.listen(3000);
