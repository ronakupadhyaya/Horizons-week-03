var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://student:horizon@ds139899.mlab.com:39899/rick-test');

var Cat = mongoose.model('Cat', {name: String, furColor: String});


app.get('/cats', function(req, res){
  Cat.find({},function(err,cats){
    if(err) {
      throw err;
    }
    if(cats){
      cats.forEach(function(item){
        console.log(item.name);
      })
      res.json(cats);
      // res.send(cats);
    }

  })
});

app.listen(3000);
