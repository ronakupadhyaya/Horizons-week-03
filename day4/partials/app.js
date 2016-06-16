var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({extname:'hbs'}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  var mongoQuery = {};
  
    res.render('index.hbs');
});


app.listen(3000);
