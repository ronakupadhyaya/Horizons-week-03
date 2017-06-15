"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var validator = require('express-validator');

var app = express();
app.use(validator());

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

router.get('/contributions', function(req, res) {
  Project.find(function(err, array) {
    if (err) {
      console.log(err);
    } else {
      console.log(array);
      array.sort(function(item1, item2) {
        var contr1 = item1.contributions;
        var sum1 = 0;
        contr1.forEach(function(elem) {
          sum1 += parseInt(elem.amount);
        })
        console.log("sum1", sum1);
        var contr2 = item2.contributions;
        var sum2 = 0;
        contr2.forEach(function(elem) {
          sum2 += parseInt(elem.amount);
        })
        console.log("sum2", sum2);
        return sum1 - sum2;
      });
      res.render("index", {items : array});
    }
  })
});

router.get('/filterByFunding', function(req, res) {
  Project.find(function(err, array) {
    if (err) {
      console.log(err);
    } else {
      console.log(array);
      array = array.filter(function(item) {
        var contr = item.contributions;
        var sum = 0;
        contr.forEach(function(elem) {
          sum += parseInt(elem.amount);
        })
        return sum === item.goal;
      });
      res.render("index", {items : array});
    }
  })
});

router.get('/filterByNotFunded', function(req, res) {
  Project.find(function(err, array) {
    if (err) {
      console.log(err);
    } else {
      console.log(array);
      array = array.filter(function(item) {
        var contr = item.contributions;
        var sum = 0;
        contr.forEach(function(elem) {
          sum += parseInt(elem.amount);
        })
        return sum !== item.goal;
      });
      res.render("index", {items : array});
    }
  })
});

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  // YOUR CODE HERE
  Project.find(function(err, array) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {items : array});
    }
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render("new");
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.check("title", "Title required").notEmpty();
  req.check("start", "Start required").notEmpty();
  req.check("end", "End required").notEmpty();
  req.check("description", "Description required").notEmpty();
  req.check("goal", "Goal required").notEmpty();

  var errors = req.validationErrors();
  console.log(req.body.pic);
  if (errors) {
    console.log("here")
    res.status(400).render("new", {errors : errors});
  } else {
    var newProj = new Project({
      title : req.body.title,
      start : req.body.start,
      end : req.body.end,
      description : req.body.description,
      goal : req.body.goal,
      category : req.body.category,
      url : req.body.pic
    });
    newProj.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    })
  }

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
    if (err) {
      console.log(err);
    } else {
      var sum = 0;
      project.contributions.forEach(function(element) {
        sum += parseInt(element.amount);
      })
      var percent = sum / project.goal * 100;
      res.render("project", {totContr : sum, project : project, percent : percent});
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
    console.log(id);
    if (err) {
    } else {
      console.log(project.contributions);
      var contr = project.contributions;
      contr.push({
        name : req.body.name,
        amount : req.body.amount
      })
      project.save(function(err) {
        console.log("hi");
        if (err) {
        } else {
          var sum = 0;
          contr.forEach(function(element) {
            if (element.amount) {
              sum += parseInt(element.amount);
            }
          })
          var percent = sum / project.goal * 100;
          res.render("project", {totContr : sum, project : project, percent : percent});
        }
      });
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, project) {
    console.log(id);
    var startDate = new Date(project.start).toISOString().substring(0, 10);
    var endDate = new Date(project.end).toISOString().substring(0, 10);
    if (err) {
      console.log("1", err);
    } else {
      res.render("editProject", {
        project : project,
        startDate: startDate,
        endDate: endDate
      })
    }
  })
});

router.post('/project/:projectid/edit', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findByIdAndUpdate(req.params.projectid, {
    title : req.body.title,
    start : req.body.start,
    end : req.body.end,
    description : req.body.description,
    goal : req.body.goal,
    category : req.body.category
  }, function(err) {
    if(err) {
      console.log(err);
    }
  })
  res.redirect("/project/" + id);
});

router.get('/:sort/:sortDirection?', function(req, res) {
  var direction = req.params.sortDirection;
  console.log(direction);
  var sortBy = req.params.sort;
  if (!direction) {
    direction = "ascending";
  }
  if (!sortBy) {
    sortBy = "start";
  }
  var obj = {start : direction};
  if (sortBy === "end") {
    obj = {end : direction};
  } else if (sortBy === "goal") {
    obj = {goal : direction};
  }
  Project.find({}).sort(obj).exec(function(err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {items : docs});
    }
  })
});


module.exports = router;
