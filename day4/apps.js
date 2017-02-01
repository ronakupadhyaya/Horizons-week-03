var express = require ('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:password@ds139979.mlab.com:39979/priyanka-horizons');


app.get('/cats', function(req,res) {
  Cat.find({},function(err,cats) {
  if(err) {
  throw err;
  }
  if(cats) {
  console.log(cats);
  res.send(cats);
  }
  })
})

app.listen(3000)
 s
