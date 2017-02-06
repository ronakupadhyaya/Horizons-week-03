var mongoose = require("mongoose");
var express = require('express');

var app = express();
mongoose.connect('mongodb://student:horizon@ds139969.mlab.com:39969/irvin-horizons')

var Cat = mongoose.model('Cat', {name: String, furColor: String})
app.get('/cats', function(req, res){
      Cat.find({},function(err,cats){
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
