var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://student:horizon@ds139899.mlab.com:39899/rick-test');

app.get('/cats',function(req,res){
  Cat.find({},function(err,cats) {
    i f(err){
      throw err;
    }
    if(cats){
      console.log(cats);
      res.send(cats);
    }
  })
})
app.listen(3000);
