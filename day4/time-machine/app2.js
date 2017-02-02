var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

// Parse body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// boiler plate for using layouts
// assumes layouts folder and partials folder inside
// views folder
app.engine('hbs', exphbs({
  extname:'hbs',
  defaultLayout: 'main.hbs',
  helpers: {
    countTo10: function() {
      var ret = '';
      for (var i = 0; i < 10; i++) {
        ret += '<p>' + i + '</p>';
      }
      return ret;
    },
    count: function(n) {
      var ret = '';
      for (var i = 0; i < n; i++) {
        ret += '<p>' + i + '</p>';
      }
      return ret;
    },
    printNums: function(a, b, c) {
      return a + ' ' + b + ' ' + c;
    }
  }
}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('index', { times: 4 });
});

app.use('/test', function(req, res) {
  res.json({
    'req.method': req.method,
    'req.params': req.params,
    'req.query': req.query,
    'req.body': req.body
  });
});

app.listen(3002);