"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
router.get('/create-test-project', function(req, res) {
  var project = new Project({
    title: 'I am a test project'
  });
  project.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send('Success: created a Project object in MongoDb');
    }
  });
});

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  if (req.query.sort) { //if there is a sort query
    if (req.query.sort === "total") {
      sortByContribs(res);
    }
    else if (req.query.sort === "full") {
      retFull(res, true)
    }
    else if (req.query.sort === "not") {
      retFull(res, false)
    }
    else { //if not by total contribs
      var sortObject = {};
      if (req.query.sortDirection === "descending") {
        sortObject[req.query.sort] = -1;
      }
      else {
        sortObject[req.query.sort] = 1;
      }
      Project.find().sort(sortObject).exec(function(err, array) {
        if (err) {
          res.status(500).send("ERROR",err);
        } else {
          res.render('index', {
            items: array
          })
        }
      });
    }
  }
  else {
    Project.find(function(err, arr) {
      if (err) {
        res.status(500).send("ERROR",err);
      } else {
        res.render('index', {
          items: arr
        });
      }
    })
  } //if no sort query
});

var retFull = function(res, fullFlag) { //where fullFlag = boolean true if full, false if not
  Project.find(function(err, arr) {
    if (err) {
      console.log(err);
    } else {
      var filteredArr = [];
      if (fullFlag) { //for loop, push if fully funded
        console.log("full");
        for (var i = 0; i < arr.length; i++) { //loops through array of projects
          var total = 0;
          for (var j = 0; j < arr[i].contributions.length; j++) {
            total+= arr[i].contributions[j].amount; //loop through array of contribs for each proj to find total
          }
          var goal = arr[i].goal;
          if (goal <= total) {
            filteredArr.push(arr[i])
          }
        }
      } else { //push not fully funded
        console.log("not full");
        for (var i = 0; i < arr.length; i++) { //loops through array of projects
          var total = 0;
          for (var j = 0; j < arr[i].contributions.length; j++) {
            total+= arr[i].contributions[j].amount; //loop through array of contribs for each proj to find total
          }
          var goal = arr[i].goal;
          if (goal > total) {
            filteredArr.push(arr[i])
          }
        }
      }

      res.render('index', {
        items: filteredArr //Sortedarr depends on the flag
      })
    }
  })
};

var retNot = function(res) {

};

var sortByContribs = function(res){
  //from mongoose get all items --> array of objects
  Project.find(function(err, arr) {
    if (err) {
      console.log(err);
    } else {
      console.log("ORIGARR:",arr);
      var sorted = arr.sort(function(a,b) {
        // var aTotal = a.contributions.reduce(function(c,d) {
        //   return c.amount + d.amount;
        // },0);
        var aTotal = 0;
        for (var i =0; i < a.contributions.length; i++) {
          aTotal+= a.contributions[i].amount;
        }
        var bTotal = 0;
        for (var i =0; i < b.contributions.length; i++) {
          bTotal+= b.contributions[i].amount;
        }
        console.log("aTOTAL:", aTotal);
        // var bTotal = b.contributions.reduce(function(e,f) {
        //   return e.amount + f.amount;
        // },0);
        console.log("bTOTAL:", bTotal);
        return aTotal - bTotal;
      })
      res.render('index', {
        items: sorted
      })
    }
  })
  //for each object in array, get total contributions
  //sort by total contribs
}

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new', {

  })
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.check('title', 'title field required').notEmpty();
  req.check('goal', 'goal field required').notEmpty();
  req.check('start', 'start field required').notEmpty();
  req.check('end', 'end field required').notEmpty();
  req.check('category', 'category field required').notEmpty();
  var err = req.validationErrors();
  // console.log(err);
  // console.log(err[0].msg);
  var errString = '';
  if (err.length > 0) {
    for (var i = 0; i < err.length; i++) {
      errString = errString + err[i].msg + "! ";
    }
    res.render('new', {
      error: true,
      errormessage: errString,
      category: req.body.category,
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    })
  } else {
    var proj = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      contributions: [],
      category: req.body.category,
    });
    proj.save(function(err, p) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }

    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  //var proj = Project.findById(req.params.projectid

  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.log(err);
    } else {
    // console.log(found.goal);
    //
    // console.log("length",found.contributions.length);
    var count = 0;
    var contribArr = [];
    for (var i = 0; i < found.contributions.length; i++) {
      // console.log('yo',found.contributions[i].amount);
      count += found.contributions[i].amount;
      contribArr.push(found.contributions[i].name + ": " + found.contributions[i].amount);
    }
    console.log("test", contribArr);
    var percentage = (count/found.goal) * 100;
    console.log('perc', percentage, 'goal', found.goal, 'count', count);
    // console.log('new contribution', req.body.amount);
    // console.log("ok",found.contributions);
    // console.log("hmm",count);

    res.render('project', {
      category: found.category,
      percentage: percentage,
      contribArr: contribArr,
      count: count,
      title: found.title,
      goal: found.goal,
      description: found.description,
      start: found.start,
      end: found.end
    });
  }
  });
  //console.log(proj);

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      found.contributions.push({name: req.body.name, amount: req.body.amount });
      found.save(function(err) {
        if (err) {
          console.log(err);
        } else {

          res.redirect('/project/'+req.params.projectid);
        }
      });
    }
  });
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res){
  console.log("ID", req.params.projectid)
  Project.findById(req.params.projectid, function(err, found) {

    if (err) {
      console.log(err);
    } else {
      var start = new Date(found.start).toISOString().substring(0,10)
      var end = new Date(found.end).toISOString().substring(0,10)

      res.render('editProject', {
        category: found.category,
        title: found.title,
        goal: found.goal,
        description: found.description,
        start: start,
        end: end,
        project_id: req.params.projectid
      })
    }
  })
});


// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res){
  console.log("type",typeof req.body.start);
  console.log("TYPE",typeof start);
  var start = req.body.start;
  console.log("TYPE",typeof start);
  var st = new Date(start).toISOString().substring(0,10);
  var en = new Date(req.body.end).toISOString().substring(0,10);
  console.log(st);
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: st,
    end: en,
    category: req.body.category
  }, {upsert: true}, function(err, project){
    // console.log(err);
    console.log(project);
    res.redirect('/project/'+req.params.projectid)
  });
});

module.exports = router;
