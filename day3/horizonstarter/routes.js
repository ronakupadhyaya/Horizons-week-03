"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var expressValidator = require('express-validator');
router.use(expressValidator());

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
  if (req.query.sort) {
    if(req.query.sort === 'total'){
      Project.find(function(err, array){
        var arr = array;
        arr.forEach(function(item){
          var total = 0;
          item.contributions.forEach(function(inner){
            total = total + inner.amount;
          })
          item.total = total;
        })
        arr.sort(function(a, b) {
          // console.log(a.total);
          // console.log(b.total);
          return a.total - b.total;
        });
        res.render('index', {items: arr});
      })
    }else{
      var sortObject = {};
      sortObject[req.query.sort] = 1;
      Project.find().sort(sortObject).exec(function(err, array) {
        res.render('index', {items: array});
      });
    }
  }else if (req.query.filter){
    Project.find(function(err, array){
      var arr = array;
      arr.forEach(function(item){
        var total = 0;
        item.contributions.forEach(function(inner){
          total = total + inner.amount;
        })
        item.total = total;
      })
      if(req.query.filter === 'fully'){
        var fullArr = arr.filter(function(item){
          return item.goal === item.total || item.goal < item.total
        })
        res.render('index', {items: fullArr});
      }else if (req.query.filter === 'partial'){
        var partialArr = arr.filter(function(item){
          return item.goal > item.total
        })
        res.render('index', {items: partialArr});
      }

  })
}  else{
    Project.find(function(err, array){
      res.render('index', {items: array});
    });
  }
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // console.log(req.body.title);
  // console.log(req.body.goal);
  // console.log(req.body.start);
  console.log(req.body.category);
  req.checkBody('title','You need an title').notEmpty();
  req.checkBody('goal','You need a goal').notEmpty();
  req.checkBody('start','You need a start date').notEmpty();
  req.checkBody('end','You need a end date').notEmpty();
  req.checkBody('category','You need a end date').notEmpty();
  var result = req.validationErrors();
  if (result){
    res.status(400).render('new',{
      error:'Title, body, category, start date and/or end date cannot be blank!'
    })
  }else if (!result){
    console.log(req.body.description);
    if (req.body.description){
      var project = new Project({
        title: req.body.title,
        goal: req.body.goal,
        description: req.body.description,
        category: req.body.category,
        start: req.body.start,
        end: req.body.end,
        contributions: []
      });
    }
    else{
      var project = new Project({
        title: req.body.title,
        goal: req.body.goal,
        category: req.body.category,
        start: req.body.start,
        end: req.body.end,
        contributions: []
      });
    }
    project.save(function(err){
      if(err){
        console.log('could not save', err);

      }else{
        console.log('success');
        res.redirect('/')
        //mongoose.connection.close();
      }
    });
  }

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var projectid = req.params.projectid;
  var total = 0;
  var bar = 0;
  Project.findById(projectid, function(err,project){
    if (err){
      console.log("THERE WAS AN ERROR: " + err);
    }else{
      if (project.description || project.contributions){
        project.contributions.forEach(function(item){
          total+=item.amount;
        })
        bar = (total/project.goal)*100;
        if (project.description && project.contributions){
          res.render('project',{
            title: project.title,
            goal: project.goal,
            description: project.description,
            start: project.start,
            end: project.end,
            contributions: project.contributions,
            category: project.category,
            total: total,
            bar:bar
          })
        }else if (project.contributions){
          res.render('project',{
            title: project.title,
            goal: project.goal,
            start: project.start,
            end: project.end,
            contributions: project.contributions,
            category: project.category,
            total:total,
            bar:bar
          })
        }else if (project.description){
          res.render('project',{
            title: project.title,
            goal: project.goal,
            description: project.description,
            start: project.start,
            end: project.end,
            category: project.category,
            total:total,
            bar:bar
          })
        }
      }else{
        res.render('project',{
          title: project.title,
          goal: project.goal,
          start: project.start,
          end: project.end,
          category: project.category,
          total:total,
          bar:bar
        })
      }
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var projectid = req.params.projectid;
  Project.findById(projectid, function(err,project){
    if (err){
      console.log("THERE WAS AN ERROR: " + err);
    }else{
      var obj = {
        name: req.body.name,
        amount: req.body.amount
      }
      project.contributions.push(obj);
      project.save(function(err){
        if(err){
          console.log('could not save', err);

        }else{
          console.log('success');
          res.redirect('/project/'+projectid)
          //mongoose.connection.close();
        }
      });
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit',function(req,res){
  var projectid = req.params.projectid;
  Project.findById(projectid, function(err,project){
    if (err){
      console.log("THERE WAS AN ERROR: " + err);
    }else{
      var newStartDate = project.start.getFullYear()+'-';
      var newEndDate = project.end.getFullYear()+'-';
      var startDay = project.start.getDate();
      var startMonth = project.start.getMonth();
      startMonth++;
      var endDay = project.end.getDate();
      var endMonth = project.end.getMonth();
      endMonth++;
      if (startMonth < 10){
        newStartDate =newStartDate+'0'+startMonth+'-';
      }else{
        newStartDate = newStartDate+startMonth+'-';
      }
      if (startDay < 10){
        newStartDate = newStartDate+'0'+project.start.getDate();
      }else{
        newStartDate = newStartDate+project.start.getDate();
      }
      if (endMonth < 10){
        newEndDate = newEndDate+'0'+endMonth+'-';
      }else{
        newEndDate = newEndDate+endMonth+'-';
      }
      if (endDay < 10){
        newEndDate = newEndDate+'0'+project.end.getDate();
      }else{
        newEndDate = newEndDate+project.end.getDate();
      }
      console.log(newStartDate);
      console.log(newEndDate);

      if (project.description && project.contributions){
        res.render('editProject',{
          title: project.title,
          goal: project.goal,
          description: project.description,
          start: newStartDate,
          end: newEndDate,
          contributions: project.contributions,
          category: project.category,
          id:project._id
        })
      }else if (project.contributions){
        res.render('editProject',{
          title: project.title,
          goal: project.goal,
          start: newStartDate,
          end: newEndDate,
          contributions: project.contributions,
          category: project.category,
          id:project._id
        })
      }else if (project.description){
        res.render('editProject',{
          title: project.title,
          goal: project.goal,
          description: project.description,
          contributions: project.contributions,
          start: newStartDate,
          end: newEndDate,
          category: project.category,
          id:project._id
        })
      }
    else{
      res.render('editProject',{
        title: project.title,
        goal: project.goal,
        start: newStartDate,
        end: newEndDate,
        category: project.category,
        id:project._id
      })
     }
    }
  })
})

router.post('/project/:projectid/edit',function(req,res){
  req.checkBody('title','You need an title').notEmpty();
  req.checkBody('goal','You need a goal').notEmpty();
  req.checkBody('start','You need a start date').notEmpty();
  req.checkBody('end','You need a end date').notEmpty();
  req.checkBody('category','You need a end date').notEmpty();
  var result = req.validationErrors();
  if (result){
    res.status(400).render('/project/'+req.params.projectid+'/edit',{
      error:'Title, body, category, start date and/or end date cannot be blank!',
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    })
  }else{
    var cont;
    console.log(req.body.description);
    console.log(req.body);
  Project.findById(req.params.projectid, function(err,project){
    if (err){
      console.log("THERE WAS AN ERROR: " + err);
    }else{
      console.log(project.contributions);
      cont = project.contributions
      Project.findByIdAndUpdate(req.params.projectid, {
        title: req.body.title,
        goal: req.body.goal,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        contributions: cont

      },{new:true}, function(err,project) {
          if (err){
            console.log('Oops, something happened!');
            res.redirect('/')
          }else{
            res.redirect('/project/'+req.params.projectid)
          }
        })
      }
    })
  }
})
router.use(expressValidator({
 customValidators: {
    isTrue: function(value){
      return value;
    },
    isPositive: function(value) {
      return value.amount > 0;
    }
 }
}));
router.post('/api/project/:projectid/contributions', function(req,res){
  var projectid = req.params.projectid;
  req.checkBody('newContribution','You need an title').isPositive();
  var errors = req.validationErrors();
  if (errors){
    res.status(400).json(err);
  }else{
    Project.findById(projectid, function(err,project){
      if (err){
        console.log("THERE WAS AN ERROR: " + err);
      }else{
        var obj = {
          name: req.body.name,
          amount: req.body.amount
        }
        console.log(req.body);
        console.log(req.body.name);
        console.log(req.body.amount);
        project.contributions.push(obj);
        project.save(function(err){
          if(err){
            console.log('could not save', err);

          }else{
            console.log('success');
            res.json(obj);
            //mongoose.connection.close();
          }
        });
      }
    })
  }
})

router.get('/api/projects',function(req,res){
  console.log(req.query.funded);
  if (req.query.funded == true){
    console.log('true');
    Project.find(function(err, array){
      var arr = array;
      arr.forEach(function(item){
        var total = 0;
        item.contributions.forEach(function(inner){
          total = total + inner.amount;
        })
        item.total = total;
      })
    })

    var fullArr = arr.filter(function(item){
      return item.goal === item.total || item.goal < item.total
    })
    res.json(fullArr);

  }else if (req.query.funded == false){
    console.log('false');
    Project.find(function(err, array){
      var arr = array;
      arr.forEach(function(item){
        var total = 0;
        item.contributions.forEach(function(inner){
          total = total + inner.amount;
        })
        console.log(total);
        item.total = total;
      })
    })
    var partialArr = arr.filter(function(item){
      return item.goal > item.total
    })
    res.json(partialArr);
  }

  else{
    Project.find(function(err, array){
      res.json(array);
    });
  }
})

module.exports = router;
