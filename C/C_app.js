var User = mongoose.model('User', {
  username: String,
  password: String
});

app.post('/register', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  //  YOUR CODE HERE
  if ((check if file is in mongo collection) !== req.body.username) {
    console.log('username already exists')
  }
});

var Student = mongoose.model('Student', {
  name: String,
  bestFriend: String,
  birthday: Date
});

app.post('/birthdays', function(req, res) {
  var currentStudent = req.body;
  //  YOUR CODE HERE
  for (var i=0; i<body.length; i++) {
    for (var j=0; j<body.length; j++) {
        if ((currentStudent.bestFriend === Student[j]) &&(Student[i].bestFriend === currentStudent)) {
          console.log("<3")
        }
        else {
          console.log("</3")
        }
      }
    }
  }
});
