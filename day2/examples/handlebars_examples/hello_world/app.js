var express = require('express')
var app = express();

var handleBars = require('express-handlebars')
app.engine('hbs', handleBars({
  extname: '.hbs'
}))
app.set('veiw engine', 'hbs')

app.get('/', function(req, res){
  res.render('firstHandle.hbs')
})

app.get('/:statusCode', function(req, res){
    res.sendStatus(req.params.statusCode);
});

app.listen(3000);
