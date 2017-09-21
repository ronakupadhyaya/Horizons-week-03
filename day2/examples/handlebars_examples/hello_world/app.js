var express = require('express');
var app = express();

var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');


app.get('/greet', function(req, res){
  res.render('myFirstTemplate', {
    greetingName: req.query.name
  });
});


app.listen(3000)
console.log('started');
