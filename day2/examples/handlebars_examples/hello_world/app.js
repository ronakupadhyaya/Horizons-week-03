var express = require('express');

// Let's create a new express app
var app = express();

var handlebars = require('express-handlebars');
app.engine('hbs',handlebars({
  extname:'.hbs'
}));
app.set('view engine','hbs');

app.get('/',function(req,res){
  res.render('myTemplate',{text:'Hello World'});
});

app.get('/:error',function(req,res){
  var error=req.params.error;
  res.render('myTemplate',{text:`${error} page not found, did you enter the correct url?`});
});

// Start the server listening on port 3000.
app.listen(3000);
