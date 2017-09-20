
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Require the Player model (Part 2.3)

// Require the Roster model (Part 5.2)



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

var Player = require('./model/player');
var Roster = require('./model/roster');
/* =====================================
        WRITE ROUTES DOWN HERE
   ===================================== */

// (Part 3.1)
app.get('/', function(req, res){
  Player.find(function(err, players){
    res.json(players);
  })
})
// (Part 4.2)
app.post('/addPlayer', function(req, res){
  var newPlayer = new Player(req.body);
  newPlayer.save(function(err, results){
    if(err){
      res.status(402).send("Player not valid!");
    } else{
      res.json(results);
    }
  })
})

app.post('/addRoster', function(req, res){
  var newRoster = new Roster(req.body);

  newRoster.save(function(err, results){
    if(err){
      res.status(402).send("Roster not valid");
    } else{
      res.json(results);
    }
  })
})
app.get('/:rosterid', function(req, res){
  var rosterId = req.params.rosterid;
  Roster.findById(rosterId, function(err, rosterPlayer){
    if(err || !rosterPlayer){
      res.status(402).send("Roster not found");
    } else{
      Player.find({Name: rosterPlayer.Name}).lean().exec(function(err, player){
        if(err){
          res.status(402).send("Player not found");
        } else {
          console.log("ROSTER", rosterPlayer);
          player[0].Team = rosterPlayer.Team;
          player[0].JerseyNum = rosterPlayer.JerseyNumber;
          console.log("PLAYER", player[0]);
          res.json(player[0]);
        }
      })

    }

  })
});


app.delete('/:rosterid', function(req, res){
  var rosterId = req.params.rosterid;
  Roster.findById(rosterId, function(err, rosterPlayer){
    if(err || !rosterPlayer){
      res.status(402).send("Roster not found");
    } else{
      Player.find({Name: rosterPlayer.Name}).remove(function(err){
        Roster.findById(rosterId).remove(function(err){
          if(err){
            console.log("ERR", err);
          } else{
            res.json("everything removed");
          }
        })
      })

    }

  })
})



// Begin listening on port 3000 (Part 2.1)
app.listen(3000, function(){
  console.log("listening on port 3000")
})
