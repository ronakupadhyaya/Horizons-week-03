var express = require("express");
var handlebars = require("express-handlebars");

var app = express(); //starts the app

//use .hbs view engine
app.engine("hbs", handlebars({
  extname: '.hbs'
}));
app.set("view engine", "hbs");

app.get("/", function(request, response){
  response.render("template");
});

app.get("/:error", function(request, response){
  var str = request.params.error + " page not found, did you enter the correct url?";
  response.send(str);
});

app.listen(3000); //run from port 3000
console.log("Server running...")
