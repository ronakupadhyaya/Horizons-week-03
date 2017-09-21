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
app.get('/',function(req,res){
  Player.find({},function(error,foundPlayers){
      if(error){
        res.render(error);
      }
      else{
        res.json(foundPlayers);
      }
  })
});


// (Part 4.2)

app.post("/addPlayer",function(req,res){
  var newPlayer = new Player({
    Name:'Bob',
    Points:40,
    Rebounds: 2,
    Assists: 10
  });
  newPlayer.save({}, function(error){
    if(error){
    }
    else{
      res.redirect('/');
    }
  });
});



// (Part 5.3)

app.post("/addPlayerRoster",function(req,res){
  var newPlayerRoster = new Roster({
    Name:'Lebron James',
    JerseyNumber:10,
    Team:'Team B'
  });
  newPlayerRoster.save({}, function(error){
    if(error){
    }
    else{
      res.redirect('/');
    }
  });
});

// (Part 6.1)

app.get('/:rosterid',function(req,res){
  var rosterId = req.params.rosterid;
  Roster.findById(rosterId,function(error,foundRoster){
    if(error){

    }
    else{
      Player.findOne({"Name": foundRoster.Name},function(err,foundPlayer){
        if(err){

        }
        else{
          console.log(foundPlayer);
          var response = {
            Name:foundPlayer.Name,
            Team:foundRoster.Team,
            JerseyNum:foundRoster.JerseyNumber,
            Points:foundPlayer.Points,
            Assists:foundPlayer.Assists,
            Rebounds:foundPlayer.Rebounds
          };
          res.json(response);
        }
      });
    }
  });
});


// (BONUS)

app.delete('/:rosterid',function(req,res){
  var rosterId = req.params.rosterid;
  Roster.findById(rosterId,function(error,foundRoster){
    if(error){

    }
    else{
      var playerName = foundRoster.Name;
      Roster.deleteOne({"_id":rosterId},function(error1){
        if(error1){}
          else{
            Player.deleteOne({"Name":playerName},function(error2){
              if(error2){}
              else{
                res.redirect('/');
              }
            });
          }
      });
    }
  });
});

// Begin listening on port 3000 (Part 2.1)
app.listen(3000, function(){
  console.log('Listening on port 3000');
});
