var express = require("express");
var app = express();

var handlebars = require("express-handlebars");

app.engine("hbs", handlebars({
  extname: ".hbs"
}));

app.get("/", function(req, res) {
  res.send("Hello, world!");
});

app.get("/:error", function(req, res) {
  res.send(req.params.error + " not found.");
});

app.listen(3000);
console.log("Node running");
