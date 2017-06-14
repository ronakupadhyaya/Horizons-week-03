var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var fs = require('fs');

var app = express();
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
var data = JSON.parse(fs.readFileSync('data.json'))

app.get('/', function(req, res) {
  res.render("index", {
    data: data
  })
})


app.get('/:word', function(req, res) {
  var filteredArray = []

if (req.params.word === "male") {
  for (var i=0; i<data.length; i++)
    if(data[i].gender === "Male") {
      filteredArray.push(data[i])
    }
  }

  if (req.params.word === "female") {
    for (var i=0; i<data.length; i++)
      if(data[i].gender === "Female") {
        filteredArray.push(data[i])
      }
    }


  res.render('gender', {
    data: filteredArray, word: req.params.word
  });
})

app.listen(3000);
console.log("started")
