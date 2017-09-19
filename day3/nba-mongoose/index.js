// Require express and create an express app

// Require mongoose

// Require and setup body-parser

// Require the Player model

// Require the Roster model



// Ensure that there is a MONGODB_URI environment variable (source env.sh)
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}

/* UNCOMMENT THESE FOR HELPFUL LOGGING REGARDING THE MONGOOSE CONNECTION */
// mongoose.connection.on('connected', function() {
//   console.log('Success: connected to MongoDb!');
// });
// mongoose.connection.on('error', function(err) {
//   console.log('Error connecting to MongoDb: ' + err);
//   process.exit(1);
// });

// Establish mongoose connection to the mongoDB on mlab


/* =====================================
        WRITE ROUTES DOWN HERE
   ===================================== */



// Add to the '/addPlayer' route to add Kevin Durant, Lebron James
// and Russell Westbrook with their respective Jersey Number and Team to the Roster Document
// the Roster document in mlab should have 3 records, one for each player
// after this is completed
// Lebron James's record should look similar to this
// {
//     "_id": {
//         "$oid": "59a7626f25bfef1f5eeebe8a"
//     },
//     "Name": "Lebron James",
//     "JerseyNum": 23,
//     "Team": "Cleveland Cavaliers",
//     "__v": 0
// }
//hint: http://mongoosejs.com/docs/models.html and use body-parser (ie. req.body)
app.post('/addPlayer', function(req,res){
  // YOUR CODE HERE
});

// Add a route with path '/updateTeam'
// that updates Kevin Durant's team to Oklahoma City Thunder
// you should be receving a success response from Postman with status code 200
// check mlab to make sure Kevin's team has been updated

// YOUR CODE HERE


// Add a route with path '/delete/:id' to remove Stephen Curry from
// the Player Document. Verify by checking mLab

// YOUR CODE HERE


// Add route with path '/:pid' that will provide the following info by finding
// Russell Westbrook based off of his id in the Roster document first
// {
//     "Name": "Russell Westbrook",
//     "Team": "Oklahoma City Thunder",
//     "Points": 31.6,
//     "Assists": 10.4,
//     "Rebounds": 10.7
// }

// YOUR CODE HERE


// Begin listening on port 3000
