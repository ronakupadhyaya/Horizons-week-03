var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var data = require('./accounts');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser({extended: true}));
// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});


app.post('/login', function(req, res) {
  var newdata = data.filter(function(item){
    return item.email === req.body.username && item.password === req.body.password
  })
  if (newdata[0]){
    res.render('login', {
      user: req.body.username,
      pass: req.body.password,
      newdata: newdata,
      name: newdata[0].first_name
    });
  }else{
    res.render('login', {
      newdata:newdata
    });
  }
});


// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
