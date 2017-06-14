var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/',function(req,res){
  res.render('index.hbs',{
    data:data,
    isMale:true,
    isFemale:true
  })
})

app.get('/male',function(req,res){
  var dataMale=[];
  for (var i = 0; i < data.length; i++) {
    if (data[i].gender==='Male'){
      dataMale.push(data[i])
    }
  }
  res.render('index.hbs',{
    data:dataMale,
    isMale:true
  })
})

app.get('/female',function(req,res){
  var dataFemale=[];
  for (var i = 0; i < data.length; i++) {
    if (data[i].gender==='Female'){
      dataFemale.push(data[i])
    }
  }
  res.render('index.hbs',{
    data:dataFemale,
    isFemale:true
  })
})

app.listen(3000);
