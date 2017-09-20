// Require express and create an express app

// Require mongoose

// Require and setup body-parser

// Require the Player model

// Require the Roster model



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
// Establish mongoose connection to the mongoDB on mlab


/* =====================================
        WRITE ROUTES DOWN HERE
   ===================================== */





// Begin listening on port 3000
