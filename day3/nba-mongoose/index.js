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
app.get('/', function(req, res){
  Player.find({ }, function(error, results){
    if(error){
      console.log("Error finding players");
    } else {
      res.json(results);
    }
  })
})

app.get('/roster', function(req, res){
  Roster.find({ }, function(error, results){
    if(error){
      console.log("Error finding players");
    } else {
      res.json(results);
    }
  })
})

// (Part 4.2)
app.post('/addPlayer', function(req, res){
  var newPlayer = new Player(req.body)
  res.send(newPlayer);
  newPlayer.save(function(error, results){
    if(error){
      console.log("Error adding player", error);
    } else {
      console.log("Saved!");
    }
  })
})

// (Part 5.3)
app.post('/addPlayerRoster', function(req, res){
  var newRoster = new Roster(req.body)
  res.send(newRoster);
  newRoster.save(function(error, results){
    if(error){
      console.log("Error adding player", error);
    } else {
      console.log("Saved!");
    }
  })
})

app.get('/:rosterid', function(req, res){
  Roster.findOne({_id: req.params.rosterid}, function(error, rosterResults){
    if(error){
      console.log("Error finding roster id");
    } else {
      Player.findOne({Name: rosterResults.Name}, function (error, playerResults){
        if(error){
          console.log("Error finding player with correct name");
        } else {
          res.json(
            {
              "Name": rosterResults.Name,
              "Team": rosterResults.Team,
              "JerseyNumber": rosterResults.JerseyNumber,
              "Points": playerResults.Points,
              "Assists": playerResults.Assists,
              "Rebounds": playerResults.Rebounds
            }
          )
        }
      })
    }
  })
})

// (BONUS)

app.delete('/:rosterid', function(req, res){
  Roster.findOne({_id: req.params.rosterid}, function(error, rosterResults){
    if(error){
      console.log("Error finding roster id");
    } else {
      console.log("search player collection");
      //res.send(rosterResults._id)
      Player.findOne({Name: rosterResults.Name}, function (error, playerResults){
        if(error){
          console.log("Error finding player with correct name", error);
        } else {
          Roster.remove({_id: req.params.rosterid}, function(err){
            if(err){
              console.log(err);
            } else {
              console.log('Removed from roster collection');
              Player.remove({_id: playerResults._id}, function(err){
                if(err){
                  console.log(err);
                } else {
                  console.log('Removed from player collection');
                  res.send("Success!! Nate Dana is out of the league and playing somewhere in Turkey")
                }
              })
            }
          })
        }
      })
    }
  })
})



// Begin listening on port 3000 (Part 2.1)
app.listen(3000, function(){
  console.log('Listening on port 3000');
});
