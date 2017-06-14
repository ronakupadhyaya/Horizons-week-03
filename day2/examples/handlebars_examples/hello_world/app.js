var express = require('express');
var handlebars = require('express-handlebars');
var app = express();
app.engine('hbs', handlebars({
    extname:'.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.render('temp');
});

app.get('/:error', function(req,res){
  var e = req.params.error;
  res.render('temp2.hbs', {
    error : e
  })
})

app.listen(3000);
