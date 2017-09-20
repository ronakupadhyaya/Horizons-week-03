var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser')

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser({extended: true}));

app.get('/', function(req, res) {
  res.render('example3');
});

var accounts = require('./accounts');

app.post('/login', function(req, res) {
  var result = ''
  for(var i = 0; i < account.length; i++) {
    if(account[i]['email'] === req.body.email){
      if(account[i]['password'] === req.body.password){
        result = account[i]['first_name']
      }
    }

  }
  res.render('example3', {
    firstName: result
  })
})
// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
