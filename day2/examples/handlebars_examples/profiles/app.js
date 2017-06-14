var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
var maleData = data.filter(function(item){
  return item.gender === "Male";
})

var femaleData = data.filter(function(item){
  return item.gender === "Female"
})

app.get('/:gender', function(req, res){
  var gender = req.params.gender
  if (gender === "male") {
    res.render('index', {
      data: maleData
    });
  } else if(gender ==="female") {
    res.render ('index', {
      data: femaleData
    });
  } else if (!gender) {
    res.render('index', {
      data: data
    });
  }
});



app.listen(3000);
