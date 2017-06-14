var express = require('express');
var handlebars = require('express-handlebars');
var app = express();

app.engine("hbs", handlebars({
	extname: ".hbs"
}));
app.set("view engine", "hbs");


app.get('/', function(req, res){
  res.render("myTemplate");
})

app.get("/:error", function(req, res){
  var error = req.params.error;
  res.send(error + " page not found, did you enter the correct url?")
})

app.listen(3000);
