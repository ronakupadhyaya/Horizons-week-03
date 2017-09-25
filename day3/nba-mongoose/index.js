// Require express and create an express app (Part 2.1)
var express = require('express');
var app = express();


// Require mongoose (Part 2.2)
var mongoose = require('mongoose');
// Require and setup body-parser (Part 4.1)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// Require the Player model (Part 2.3)
var Player = require('./model/player');
// Require the Roster model (Part 5.2)

var Roster = require('./model/roster');

// Ensure that there is a MONGODB_URI environment variable (source env.sh)
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}


mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function(err) {
  console.log('Error connecting to MongoDb: ' + err);
  process.exit(1);
});
// Establish mongoose connection to the mongoDB on mlab (Part 2.2)
mongoose.connect(process.env.MONGODB_URI);

/* =====================================
        WRITE ROUTES DOWN HERE
   ===================================== */

// (Part 3.1)
app.get('/', function(req, res) {
  Player.find(function(error, results){
    if(error){
      res.send(error);
    } else {
      res.json(results);
    }
  });
})
// (Part 4.2)
app.post('/addPlayer', function(req, res) {
  // Put some stuff in here
  // req.body will be involved somewhere
  var newPlayer = new Player({
  // set player details inside this object
  // Name: "Tiger Woods", etc.
    Name: req.body.name,
    Points: req.body.points,
    Rebounds: req.body.rebounds,
    Assists: req.body.assists
  });
  newPlayer.save(function(error, results){
  // In this case, you have no query parameter, you want ALL players
  // So you can leave the curlies empty

  // Check for error / do whatever with results
  // What did you want to do with the results? Do it here!
    if(error){
      res.send(error)
    } else {
      res.json(results)
    }
  });
});
// (Part 5.3)
app.post('/addPlayerRoster', function(req, res) {
  var newRoster = new Roster({
    Name: req.body.name,
    JerseyNumber: req.body.jerseyNumber,
    Team: req.body.team
  });
  newRoster.save(function(error, results){
    if(error){
      res.send(error)
    } else {
      res.json(results)
    }
  });
});


app.get('/:rosterid', function(req, res) {
  Roster.find({id: req.params.rosterid}, function (error, results){
    if(error){
      res.send(error);
    } else {
      Player.find({Name: results.Name}, function(error, player) {
        if(error){
          res.send(error);
        } else {
          var playerObj = {
            "Name": results.Name,
            "Team": results.Team,
            "JerseyNum": results.JerseyNum,
            "Points": player.Points,
            "Assists": player.Assists,
            "Rebounds": player.Rebounds
          };
          res.json(playerObj);
        }
      })
    }
  })
})



// (BONUS)



// Begin listening on port 3000 (Part 2.1)
app.listen(3000, function(){
  console.log('Listening on port 3000');
});
