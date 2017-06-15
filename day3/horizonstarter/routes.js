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
  // YOUR CODE HERE
  var direction = 1;
  if(req.query.sortOrder === 'descending'){
    direction = -1;
  };
  if(req.query.sort === 'total'){
    Project.find(function(err, item){
      if(err){
        console.log(err);
      } else{
        var objArr = item;
        objArr.sort(function(a, b){
          var atotal = 0;
          var btotal = 0;
          a.contributions.forEach(function(item){
            atotal = atotal + parseInt(item.amount);
          });
          b.contributions.forEach(function(item){
            btotal = btotal + parseInt(item.amount);
          });
          return atotal - btotal;
        });
        if(direction === -1){
          objArr.reverse();
        }
        res.render('index', {items: objArr});
      }
    });
  }else if(req.query.sort){
    var sortObject = {};
    sortObject[req.query.sort] = direction;
    Project.find({}).sort(sortObject).exec(function(err, array) {
      // YOUR CODE HERE
      if(err){
        console.log(err);
      }else{
          res.render('index', {items: array});
      }
    });
  }else{Project.find(function(err, task){
    if(err){
      console.log(err);
    } else{
      res.render('index', {items: task});
    }
  })};

});

router.get('/complete', function(req, res){
  Project.find(function(err, item){
    if(err){
      console.log(err);
    } else{
      var objArr = item;
      var sorted = [];
      objArr.forEach(function(item){
        var total = 0;
        item.contributions.forEach(function(item2){
          total = total + parseInt(item2.amount);
        });
        if(total/parseInt(item.goal) >= 1){
          sorted.push(item);
        }
      });
      res.render('index', {items: sorted});
    }
  });
});

router.get('/incomplete', function(req, res){
  Project.find(function(err, item){
    if(err){
      console.log(err);
    } else{
      var objArr = item;
      var sorted = [];
      objArr.forEach(function(item){
        var total = 0;
        item.contributions.forEach(function(item2){
          total = total + parseInt(item2.amount);
        });
        if(total/parseInt(item.goal) < 1){
          sorted.push(item);
        }
      });
      res.render('index', {items: sorted});
    }
  });
})

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new')
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  //TODO validator
  req.check('title', 'Please give your project a title.').notEmpty();
  req.check('goal', 'Please set a $ goal for your project.').notEmpty();
  req.check('description', 'Please give your project a description.').notEmpty();
  req.check('start', 'Please indicate a start date.').notEmpty();
  req.check('end', 'Please indicate an end date.').notEmpty();
  req.check('category', 'Please indicate a category.').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    res.render('new', {errors: errors, data: req.body});
  }else{
  var project = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category
  });

  project.save(function(err){
    if(err){
      console.log("error: " + err);
    } else{
      //redirect
      res.redirect('/');
    }
  });
}
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;


  Project.findById(id, function(err, found){
    if(err){
      res.render('project', {error: 'Page not found'});
    }else{
      var total = 0;
      found.contributions.forEach(function(item){
        total = total + parseInt(item.amount);
      });
      var progress = total/parseInt(found.goal) * 100;
      if(progress > parseInt(found.goal)){
        progress = 100;
      };
      res.render('project', {found: found, id: id, total: total, progress: parseInt(progress)});
    };
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  var id = req.params.projectid;
  Project.findById(id, function(err, found){
    if(err){
      console.log(err);
    }else{
      var total = 0;
      var obj = found;
      var contr = obj.contributions;
      contr.push(req.body);
      obj.contributions = contr;
      contr.forEach(function(item){
        total = total + parseInt(item.amount);
      });

      var progress = total/parseInt(found.goal) * 100;
      if(progress > parseInt(found.goal)){
        progress = 100;
      };

      obj.save(function(err){
        if(err){
          console.log("error: " + err);
        } else{
          //redirect
          //res.redirect('/');
          res.render('project', {found: found, id: id, total: total, progress: parseInt(progress)});
        }
      });
    };
  })

});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/projects/:projectid/edit', function(req, res){
  var id = req.params.projectid;
  Project.findById(id, function(err, found){
    if(err){
      console.log(err);
    }else{
      res.render('editProject', {found: found, id: id})
    }
  })
});
// Create the POST /project/:projectid/edit endpoint
router.post('/projects/:projectid/edit', function(req, res){
  var id = req.params.projectid;
  Project.findByIdAndUpdate(req.params.projectid, {
  title: req.body.title,
  title: req.body.title,
  goal: req.body.goal,
  description: req.body.description,
  start: req.body.start,
  end: req.body.end,
  category: req.body.category
}, function(err) {
  console.log(err);
});
res.redirect('/');
});

router.post('/api/project/:projectid/contribution', function(req, res){
  var id = req.params.projectid;
  Project.findById(id, function(err, found){
    if(err){
      console.log(err);
    }else{
        var total = 0;
        var obj = found;
        var contr = obj.contributions;
        contr.push(req.body);
        obj.contributions = contr;
        contr.forEach(function(item){
          total = total + parseInt(item.amount);
        });

        var progress = total/parseInt(found.goal) * 100;
        if(progress > parseInt(found.goal)){
          progress = 100;
        };

        obj.save(function(err){
          if(err){
            console.log("error: " + err);
          } else{
            //redirect
            //res.redirect('/');
            res.render('project', {found: found, id: id, total: total, progress: parseInt(progress)});
          }
        });

    });
})




module.exports = router;












//
