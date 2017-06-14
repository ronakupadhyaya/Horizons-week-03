var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
// app.get('/',function(req,res){
//   res.render('index',
//   {students:data})
// })

app.get('/:gender',function(req,res){
  res.render('index',
  {students:data,
   gender:req.params.gender})
})

app.listen(3000);
