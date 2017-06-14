var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var json = require('./accounts')

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('example3', {
  });
});

app.post('/login', function(req,res) {
  for (var i=0; i < json.length; i++) {
    if (req.body.email === json[i].email && req.body.password === json[i].password)
  res.render('example3', {
    first_name: json[i].first_name
  })

  //check
}
})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
