var express = require("express");
var app = express();

var handlebars = require("express-handlebars");
app.engine("hbs", handlebars({
  extname: '.hbs'
}));

app.set("view engine", "hbs");

app.get("/", function (req, res) {
  var name = "hello";
  res.render("file", {
    firstVar: name
  });
});

app.get("/:error", function (req, res) {

  var tmp = req.params.error + "page not found, did you enter the correct url?"
  res.render("file", {
    firstVar: tmp
  });
});

app.listen(3000);
console.log("started");
