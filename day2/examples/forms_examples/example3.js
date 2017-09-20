var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

var data = require('./accounts.json');
// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require('body-parser');

//app.use(bodyParser({extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function(req, res) {
  res.render('example3', {
    errorMessage: false,
    helloMessage: false
  });
});

app.post("/login", function(req, res){
  var name = "";
  data.forEach(function(elem){
    if (req.body.email === elem.email && req.body.password === elem.password){
      name = elem.first_name;
    }
  });
  if (name !== "") {
    res.render('example3', {
      firstName: name,
      errorMessage: false,
      helloMessage: true
    });
  } else {
    res.render('example3', {
      errorMessage: true,
      helloMessage: false
    })
  }
})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
