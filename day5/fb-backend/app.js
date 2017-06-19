"use strict";
var config = require("./config.js");

/*    EXPRESS    */
var express = require("express");
var app = express();

/*    BODY PARSER    */
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*   EXPRESS VALIDATOR   */
var validator = require("express-validator");
app.use(validator());

/*   HANDLEBARS   */
// var handlebars = require("express-handlebars");
// app.engine('.hbs', handlebars({
//   defaultLayout: 'main',
//   extname: '.hbs'
// }));
// app.set('view engine', '.hbs');
// app.use(logger('dev'));

/*    MONGOOSE    */
var mongoose = require("mongoose");
mongoose.connection.on("error", function() {
  console.log("Error connecting to database.");
  process.exit(1);
});
mongoose.connection.on("connected", function() {
  console.log("Connected to database");
});
mongoose.connect(config.MONGODB_URI);

/*   READ FILES FROM /PUBLIC   */
app.use(express.static('public'));

/*    IMPORT ROUTES    */
var users = require("./routes/users");
var posts = require("./routes/posts");
app.use("/api/users", users);
app.use("/api/posts", posts);

/*   START LISTENING   */
var port = config.PORT || 3000
console.log("Express has started. Listening on port " + port + "...");
app.listen(port);
