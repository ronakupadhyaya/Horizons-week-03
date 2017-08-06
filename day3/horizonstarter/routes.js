"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var expressValidator = require('express-validator');
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
router.get('/', function(req, res){
  // YOUR CODE HERE
  if(req.query.filter){
      Project.find(function(err, array){
        if(err){
          console.log(err);
        } else{
          console.log(array);
          var filter = req.query.filter;
          var newArr;
          if(filter==='funded'){
             newArr = array.filter(function(proj){
              var contArr = proj.contributions;

              var total = 0;
              contArr.forEach(function(cont){
                total += parseInt(cont.amount);
                console.log(total);
              })
console.log(total);
              return proj.goal <= total;
            })
        } else if(filter==='notFunded'){
            newArr = array.filter(function(proj){
            var contArr = proj.contributions;
            var total = 0;
            contArr.forEach(function(cont){
              total += parseInt(cont.amount);
            })

            return total < proj.goal;
          })
        }
        res.render('index.hbs', {items: newArr});
      }
    })
  }
  else if(req.query.sort && req.query.sort==='totalContributions'){
    Project.find(function(err, array){
      if(err){
        console.log(err);
      } else{
        array.forEach(function(proj){
          var contArr = proj.contributions;
          var total = 0;
          contArr.forEach(function(contr){
            total += contr.contributionAmount;
          })
          proj.totalContributions = total;
        })
        var sortObject = {};
        sortObject[req.query.sort] = 1;
        Project.find().sort(sortObject).exec(function(err, array){
          if(err){
            console.log(err);
          } else{
            res.render('index.hbs', {items: array});
          }
        })
      }
    })
  }
  else if(req.query.sort){
    var sortObject = {};
    if(req.query.sortDirection && req.query.sortDirection==='descending'){
      sortObject[req.query.sort] = -1
    } else{
    sortObject[req.query.sort] = 1;
  }
    Project.find().sort(sortObject).exec(function(err, array) {
    // YOUR CODE HERE
    if(err){
      console.log(err)
    } else{
      res.render('index.hbs', {items: array});
    }
  });
} else{
  Project.find(function(err, array){
    if(err){
      console.log(err);
    } else{
      console.log(array);
      res.render('index.hbs', {items: array});
    }
  });
}
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new.hbs',{
    title: '',
    goal: '',
    description: '',
    start: '',
    end: '',
    errors: []
  });
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('title', 'Title cannot be empty').notEmpty();
  req.checkBody('goal', 'Goal cannot be empty').notEmpty();
  req.checkBody('startDate', 'Start Date cannot be empty').notEmpty();
  req.checkBody('endDate', 'End Date cannot be empty').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    console.log(errors);
    res.render('new.hbs', {
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.startDate,
      end: req.body.endDate,
      category: req.body.category,
      errors: errors
    })
  } else{
    var newProject = new Project({title: req.body.title, goal: req.body.goal, decription: req.body.description, start: req.body.startDate, end: req.body.endDate, category: req.body.category});
    newProject.save(function(err){
      if(!err){
        res.redirect('/');
      } else{
        console.log(err);
      }
    });

  }

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, proj){
    if(err){
      console.log(err, 'Error Found^');
    } else if(!proj){
    } else{

      var array = proj.contributions;
      var total = 0;
      array.forEach(function(obj){
        total+=parseInt(obj.amount);
      })

      var percentage = (total/proj.goal);
      percentage *= 100;

      res.render('project.hbs', {
        project: proj,
        total: total,
        id: id,
        percentage: percentage
      })
      }
    })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  //console.log('id', id);

  console.log(req.params);

  Project.findById(id, function(err, proj){
    if(err){
      console.log('boss error');
    } else {
      var contArr = proj.contributions;
      var newContr = {
        amount: req.body.contributionAmount,
        contributor: req.body.contributorName
      };

      contArr.push(newContr);
      proj.contributions = contArr;
      proj.save(function(err, proj){
        if(err){
          console.log(err);
        } else{
          res.redirect('/project/' + id);
        }
      })
    }
  })
});


// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res){
  var id = req.params.projectid;
  Project.findById(id, function(err, proj){
    if(err){
      console.log(err);
    } else{
      console.log(proj.description);
      res.render('editProject.hbs', {
        project: proj,
        id: id
      })
    }
})
});

router.post('/project/:projectid/edit', function(req, res){
  var id = req.params.projectid;
  Project.findByIdAndUpdate(id, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.startDate,
    end: req.body.endDate,
    category: req.body.category
  }, function(err){
    if(err){
    console.log(err);
  } else{
    res.redirect('/');
  }

  })
})

module.exports = router;
