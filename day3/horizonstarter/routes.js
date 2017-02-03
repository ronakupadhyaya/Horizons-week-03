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

// Exercise 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  Project.find(function(err, projects) {
    if (err) {
      console.log('Error:', err);
      res.send(err);
    };
    if (req.query.sort === 'start') {
      projects.sort(function(a,b) {
        return new Date(a.start) - new Date(b.start);
      });
    };
    if (req.query.sort === 'end') {
      projects.sort(function(a,b) {
        return new Date(a.end) - new Date(b.end);
      });
    };
    if (req.query.sort === 'goal') {
      projects.sort(function(a,b) {
        return a.goal - b.goal;
      });
    };
    if (req.query.sort === 'totalContribution') {
      projects.sort(function(a,b) {
        var aa = 0;
        var ab = 0;
        if (a.contributions.length > 0) {
          aa = a.contributions.map(function(a){return a.amount}).reduce(function(a, b) {return a + b})
        }
        if (b.contributions.length > 0) {
          ab = b.contributions.map(function(a){return a.amount}).reduce(function(a, b) {return a + b});
        }
        return aa - ab;
      });
    };
    if (req.query.sort === 'fullyFunded') {
      projects = projects.filter(function(a) {
        setTotalRaisedAndRaisedPercentage(a);
        return raisedPercentage >= 100;
      });
    };
    if (req.query.sort === 'notFullyFunded') {
      projects = projects.filter(function(a) {
        setTotalRaisedAndRaisedPercentage(a);
        return raisedPercentage < 100;
      });
    };
    if (req.query.sortDirection === 'ascending') {
      projects;
    };
    if (req.query.sortDirection === 'descending') {
      projects.reverse();
    };
    res.render('index', {
      projects: projects,
      start: ISODateString(new Date(projects.start)),
      end: ISODateString(new Date(projects.end))
    });
  })
});

// Exercise 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new', {
    categories: projectCategories.map(function(categories) {
      return {option: categories, selected: categories===req.body.projectCategory}
    })
  });
});

// Exercise 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('projectTitle', 'Project title required.').notEmpty();
  req.checkBody('projectGoal', 'Project goal required.').notEmpty();
  req.checkBody('projectGoal', 'Project goal needs to be a number.').isInt();
  req.checkBody('projectStart', 'Project start date required.').notEmpty();
  req.checkBody('projectStart', 'Project start date needs to be a date.').isDate();
  req.checkBody('projectEnd', 'Project end date required.').notEmpty();
  req.checkBody('projectStart', 'Project end date needs to be a date.').isDate();
  var errors = req.validationErrors();
  if (errors) {
    console.log(errors)
    res.render('new', {errors: errors,
      title: req.body.projectTitle,
      goal: req.body.projectGoal,
      description: req.body.projectDescription,
      categories: projectCategories.map(function(categories) {
        return {option: categories, selected: categories===req.body.projectCategory}
      }),
      start: ISODateString(new Date(req.body.projectStart)),
      end: ISODateString(new Date(req.body.projectEnd))
    })
  } else {
    console.log(req.body)
    var project = new Project({
      title: req.body.projectTitle,
      goal: req.body.projectGoal,
      description: req.body.projectDescription,
      category: req.body.projectCategory,
      start: req.body.projectStart,
      end: req.body.projectEnd
    });
    project.save(function(error) {
      if (error) {
        console.log('Error', error);
      } else {
        console.log('Project successfully created!');
        res.redirect('/');
      };
    });
  }
});

// Exercise 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  resetTotalRaisedAndRaisedPercentage()
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log(err);
      res.send(err)
    } else {
      setTotalRaisedAndRaisedPercentage(project);
      console.log(totalRaised)
      res.render('project', {
        project: project,
        start: ISODateString(new Date(project.start)),
        end: ISODateString(new Date(project.end)),
        totalRaised: totalRaised,
        raisedPercentage: raisedPercentage
      });
    };
  });
});

// Exercise 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // resetTotalRaisedAndRaisedPercentage()
  // Project.findById(req.params.projectid, function(err, project) {
  //   if (err) {
  //     console.log(err);
  //     res.send(err);
  //   } else {
  //     req.checkBody('contributorName', 'Name is required!').notEmpty();
  //     req.checkBody('contributorAmount', 'Contribution amount needed to contribute!').notEmpty();
  //     req.checkBody('contributorAmount', 'Contribution amount needs to be a number!').isInt();
  //     var errors = req.validationErrors();
  //     if (errors) {
  //       setTotalRaisedAndRaisedPercentage(project);
  //       console.log(errors)
  //       res.render('project', {
  //         errors: errors,
  //         project: project,
  //         start: ISODateString(new Date(project.start)),
  //         end: ISODateString(new Date(project.end)),
  //         totalRaised: totalRaised,
  //         raisedPercentage: raisedPercentage
  //       });
  //     } else {
  //       var contributor = {
  //         name: req.body.contributorName,
  //         amount: req.body.contributorAmount
  //       };
  //       project.contributions.push(contributor);
  //       project.save(function(error) {
  //         if (error) {
  //           console.log('Error', error);
  //         } else {
  //           setTotalRaisedAndRaisedPercentage(project);
  //           console.log('Successfully contributed to project!');
  //           res.render('project', {
  //             project: project,
  //             start: ISODateString(new Date(project.start)),
  //             end: ISODateString(new Date(project.end)),
  //             totalRaised: totalRaised,
  //             raisedPercentage: raisedPercentage
  //           });
  //         };
  //       });
  //     };
  //   };
  // });
});

// Exercise 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log(err);
       res.send(err);
    } else {
      res.render('editProject', {
        project: project,
        start: ISODateString(new Date(project.start)),
        end: ISODateString(new Date(project.end)),
        categories: projectCategories.map(function(categories) {
          return {option: categories, selected: categories===project.category}
        })
      });
    };
  });
});

// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  req.checkBody('projectEditTitle', 'Project title required.').notEmpty();
  req.checkBody('projectEditGoal', 'Project goal required.').notEmpty();
  req.checkBody('projectEditGoal', 'Project goal needs to be a number.').isInt();
  req.checkBody('projectEditStart', 'Project start date required.').notEmpty();
  req.checkBody('projectEditStart', 'Project start date needs to be a date.').isDate();
  req.checkBody('projectEditEnd', 'Project end date required.').notEmpty();
  req.checkBody('projectEditStart', 'Project end date needs to be a date.').isDate();
  var errors = req.validationErrors();
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.projectEditTitle,
    goal: req.body.projectEditGoal,
    description: req.body.projectEditDescription,
    category: req.body.projectEditCategory,
    start: req.body.projectEditStart,
    end: req.body.projectEditEnd
  }, function(err, project) {
    if (errors) {
      console.log(errors)
      res.render('editProject', {
        errors: errors,
        project: project,
        start: ISODateString(new Date(req.body.projectEditStart)),
        end: ISODateString(new Date(req.body.projectEditEnd))
      });
    } else if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("Project successfully updated!")
      res.redirect(('/project/' + req.params.projectid));
    };
  });
});

router.post('/api/project/:projectId/contribution', function(req, res) {
  Project.findById(req.params.projectId, function(err, project) {
    if (err) {
      console.log(err);
      res.json(err);
    };
    req.checkBody('name', 'Name is required!').notEmpty();
    req.checkBody('amount', 'Contribution amount needed to contribute!').notEmpty();
    req.checkBody('amount', 'Contribution amount needs to be a number!').isInt();
    req.checkBody('amount', 'Contribution needs to be above zero!').isGreaterThanZero();
    var errors = req.validationErrors();
    if (errors) {
      console.log(errors)
      res.status(400).json(errors)
    } else {
      var contributor = {
        name: req.body.name,
        amount: req.body.amount
      };
      project.contributions.push(contributor);
      project.save(function(err) {
        if (err) {
          res.json(err);
        } else {
          res.json(contributor);
        };
      });
    }
  });
});

router.get('/api/project', function(req, res) {
  resetTotalRaisedAndRaisedPercentage();
  Project.find(function(err, projects) {
    if (err) {
      console.log(err);
      res.json(err);
    };
    if (req.query.funded === 'true') {
      projects = projects.filter(function(a){
        setTotalRaisedAndRaisedPercentage(a);
        return raisedPercentage >= 100;
      });
    };
    if (req.query.funded === 'false') {
      projects = projects.filter(function(a){
        setTotalRaisedAndRaisedPercentage(a);
        return raisedPercentage < 100;
      });
    };
    if (req.query.sort === 'amountFunded') {
      projects.sort(function(a,b) {
        var aa = 0;
        var bb = 0;
        if (a.contributions.length > 0) {
          aa = a.contributions.map(function(a){return a.amount}).reduce(function(a, b) {return a + b})
        }
        if (b.contributions.length > 0) {
          bb = b.contributions.map(function(a){return a.amount}).reduce(function(a, b) {return a + b});
        }
        return aa - bb;
      });
    };
    if (req.query.sort === 'percentageFunding') {
      projects.sort(function(a,b) {
        var aa = 0;
        var bb = 0;
        if (a.contributions.length > 0) {
          setTotalRaisedAndRaisedPercentage(a);
          aa = raisedPercentage;
        }
        if (b.contributions.length > 0) {
          setTotalRaisedAndRaisedPercentage(b)
          bb = raisedPercentage;
        }
        console.log(aa)
        console.log(bb)
        return aa - bb
      });
    };
    if (req.query.sortDirection === 'ascending') {
      projects;
    };
    if (req.query.sortDirection === 'descending') {
      projects.reverse();
    };
    res.json(projects);
  });
});

// Helper Functions

function ISODateString(d) {
  function pad(n){return n<10 ? '0'+n : n};
  return d.getUTCFullYear()+'-' + pad(d.getUTCMonth()+1)+'-' + pad(d.getUTCDate())};

var totalRaised = 0;
var raisedPercentage = 0;

function resetTotalRaisedAndRaisedPercentage() {
  totalRaised = 0;
  raisedPercentage = 0;
}

function setTotalRaisedAndRaisedPercentage(project) {
  if (project.contributions.length> 0) {
    totalRaised = project.contributions.map(function(a){return a.amount}).reduce(function(a, b) {return a + b});
    raisedPercentage = Math.floor((totalRaised/project.goal) * 100);
  };
};

var projectCategories = [
  'Famous Muppet Frogs',
  'Current Black Presidents',
  'The Pen Is Mightier',
  'Famous Mothers',
  'Drummers Named Ringo',
  '1-Letter Words',
  'Months That Start With "Feb"',
  'How Many Fingers Am I Holding Up',
  'Potent Potables'
]

module.exports = router;
