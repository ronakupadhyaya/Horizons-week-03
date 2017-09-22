var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({
  extname: 'hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE
app.get('/:gender', function(request, response) {
  response.render('index', {
    gender: request.params.gender,
    data: data,
    helpers: {
      compareGender: function(s) {
        return s.gender === request.params.gender
      }
    }
  })
})

app.listen(3000);
