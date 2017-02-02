var express = require ('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:password@ds139979.mlab.com:39979/priyanka-horizons');

var Cat = mongoose.model('Cat', {name:String, furColor: String})

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
