var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyparser = require('body-parser');
var data = require('./accounts.json');

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3');
});

app.use(bodyparser({extended: true}))

app.post('/login', function(req, res){
  data.forEach(function(account){
    if(account.email === req.body.email && account.password === req.body.password){
      res.render('login',{
        firstname: account.first_name
      })
    }
  })

})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
