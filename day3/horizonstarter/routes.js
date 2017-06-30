"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
router.get('/create-test-project', function(req, res) {
  var project = new Project({
    title: 'I am a test project',
    goal: 30,
    description: 'Testing testing testing',
    start: '1/20/2017',
    end: '2/28/2017',
    category: 'Potent Potables'
  });
  project.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send('Success: created a Project object in MongoDb');
    }
  });
});

function formatDates(array) {
  var array2 = []
  for (var i = 0; i < array.length; i++) {
    var obj = {};
    obj.title = array[i].title;
    obj._id = array[i]._id;
    obj.goal = array[i].goal;
    obj.description = array[i].description;
    obj.category = array[i].category;
    var totalRaised = 0;
    array[i].contributions.forEach(function(contribution) {
      totalRaised += contribution.amount;
    });
    obj.percentage = totalRaised/obj.goal*100;
    obj.start = (array[i].start.getMonth() + 1) + "/" + array[i].start.getDate() + "/" + array[i].start.getFullYear();
    obj.end = (array[i].end.getMonth() + 1) + "/" + array[i].end.getDate() + "/" + array[i].end.getFullYear();
    //obj.id = array[i]._id;
    array2.push(obj);
  }
  return array2;
}
// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  // YOUR CODE HERE
  if (req.query.sort === 'start') {
    console.log('start');
    Project.find({}).sort('start').exec(function(err, array) {
      if (err) {
        console.log('ERROR', err);
      } else {
        res.render('index', {
          projects:formatDates(array)
        });
      }
    });
  } else if (req.query.sort === 'end'){
    console.log('end');
    Project.find({}).sort('end').exec(function(err, array) {
      if (err) {
        console.log('ERROR', err);
      } else {
        res.render('index', {
          projects:formatDates(array)
        });
      }
    });
  } else if (req.query.sort === 'goal'){
    console.log('goal');
    Project.find({}).sort('-goal').exec(function(err, array) {
      if (err) {
        console.log('ERROR', err);
      } else {
        res.render('index', {
          projects:formatDates(array)
        });
      }
    });
  } else if (req.query.sort === 'fullfunding'){
    console.log('full funding');
    Project.find(function(err, array) {
      if (err) {
        console.log("ERROR", err);
      } else {
        array = array.filter(function(item) {
          var totalContribution = 0;
          item.contributions.forEach(function(contribution) {
            totalContribution += contribution.amount;
          });
          return (totalContribution >= item.goal);
        });
        res.render('index', {
          projects:formatDates(array)
        });
      }
    });
  } else if (req.query.sort === 'notfullfunding'){
    console.log('not full funding');
    Project.find(function(err, array) {
      if (err) {
        console.log("ERROR", err);
      } else {
        array = array.filter(function(item) {
          var totalContribution = 0;
          item.contributions.forEach(function(contribution) {
            totalContribution += contribution.amount;
          });
          return (totalContribution < item.goal);
        });
        res.render('index', {
          projects:formatDates(array)
        });
      }
    });
  } else if (req.query.sort === 'contribution'){
    console.log('contribution');
    Project.find(function(err, array) {
      if (err) {
        console.log("ERROR", err);
      } else {
        array.sort(function(a, b) {
          var totalContributionsA = 0;
          var totalContributionsB = 0;
          a.contributions.forEach(function(contribution) {
            totalContributionsA += contribution.amount;
          });
          b.contributions.forEach(function(contribution) {
            totalContributionsB += contribution.amount;
          });
          return totalContributionsB - totalContributionsA;
        });
        console.log("New sorted array: " + array);
        res.render('index', {
          projects:formatDates(array)
        });
      }
    });
  } else {
    Project.find(function(err, array) {
      if (err) {
        console.log("ERROR", err);
      } else {
        res.render('index', {
          projects:formatDates(array)
        });
      }
    });
  }
});

function getTodayString() {
  var today = new Date();
  var year = today.getFullYear();
  var date = today.getDate();
  var month = today.getMonth() + 1;
  if (/^\d$/.test(date))  {
    date = "0" + date;
  }
  if (/^\d$/.test(month))  {
    month = "0" + month;
  }
  return year + "-" + month + "-" + date;
}
// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new', {
    start: getTodayString(),
    end: getTodayString()
  });
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('title', 'Title field invalid').notEmpty();
  req.checkBody('goal', 'Goal field invalid').isNumber();
  req.checkBody('selectpicker', 'Category not chosen').isZero(req.body.selectpicker);
//  console.log("Menu: " + req.body.selectpicker + ", type: " + typeof req.body.selectpicker);
  if (req.validationErrors()) {
    var titleError = "";
    var goalError = "";
    req.validationErrors().forEach(function(error) {
      if (error.param === 'title') {
        titleError = error.msg;
      }
    });
    req.validationErrors().forEach(function(error) {
      if (error.param === 'goal') {
        goalError = error.msg;
      }
    });
    res.render('new', {
      title: req.body.title,
      goal: req.body.goal,
      titlePlaceholder: titleError,
      goalPlaceholder: goalError,
      titleHasError: titleError !== '',
      goalHasError: goalError !== '',
      start: getTodayString(),
      end: getTodayString(),
      categoryErr: true
    });
  } else {
  //  console.log("Ready to save!");
    new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.selectpicker
    }).save(function(err) {
      if (err) {
        console.log("ERROR", err);
      } else {
        console.log("SAVED!");
        Project.find(function(err, array) {
          if (err) {
            console.log("ERROR", err);
          } else {
            console.log(formatDates(array));
            res.render('index', {
              projects:formatDates(array)
            });
          }
        });
      }
    });
  }

});

//for only one project
function formatDates2(project) {
  var obj = {};
  obj.title = project.title;
  obj._id = project._id;
  obj.goal = project.goal;
  obj.description = project.description;
  obj.category = project.category;
  obj.start = (project.start.getMonth() + 1) + "/" + project.start.getDate() + "/" + project.start.getFullYear();
  obj.end = (project.end.getMonth() + 1) + "/" + project.end.getDate() + "/" + project.end.getFullYear();
  return obj;
}

//for edit function
function formatDates3(project) {
  var obj = {};
  obj.title = project.title;
  obj._id = project._id;
  obj.goal = project.goal;
  obj.description = project.description;
  obj.category = project.category;
  var startMonth = project.start.getMonth() + 1;
  var startDay = project.start.getDate();
  var endMonth = project.end.getMonth() + 1;
  var endDay = project.end.getDate()
  if (/^\d$/.test(startMonth))  {
    startMonth = "0" + startMonth;
  }
  if (/^\d$/.test(startDay))  {
    startDay = "0" + startDay;
  }
  if (/^\d$/.test(endMonth))  {
    endMonth = "0" + endMonth;
  }
  if (/^\d$/.test(endDay))  {
    endDay = "0" + endDay;
  }
  obj.start = project.start.getFullYear() + "-" + startMonth + "-" + startDay;
  obj.end = project.end.getFullYear() + "-" + endMonth + "-" + endDay;
  return obj;
}
// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, project) {
    var contributions = project.contributions;
    var numContributions = contributions.length;
    var totalRaised = 0;
    var donators = {};
    contributions.forEach(function(donation) {
      totalRaised += donation.amount;
      if (donators.hasOwnProperty(donation.name)){
        donators[donation.name] += donation.amount;
      } else {
        donators[donation.name] = donation.amount;
      }
    });
    var percentage = (totalRaised/project.goal)*100;

    res.render('project', {
      project:formatDates2(project),
      numBackers: Object.keys(donators).length,
      totalRaised: totalRaised,
      percentage: percentage,
      over: totalRaised > project.goal,
      donators: donators
    });
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('contributor', 'Contributor field invalid').notEmpty();
  req.checkBody('amount', 'Amount field invalid').isNumber();
  if (req.validationErrors()) {
    var nameError = "";
    var amountError = "";
    req.validationErrors().forEach(function(error) {
      if (error.param === 'contributor') {
        nameError = error.msg;
      }
    });
    req.validationErrors().forEach(function(error) {
      if (error.param === 'amount') {
        amountError = error.msg;
      }
    });
    for (var i = 0; i < req.validationErrors().length; i++) {
      console.log(req.validationErrors()[i].msg);
    }
    Project.findById(req.params.projectid, function(err, project) {
      res.render('project', {
        project: formatDates2(project),
        nameHasError: nameError !== '',
        amountHasError: amountError !== '',
        amountError: amountError,
        nameError: nameError
      });
    });
  } else {
    //save the donation
    Project.findById(req.params.projectid, function(err, project) {
      if (err) {
        console.log("ERROR", err);
      } else {
        project.contributions.push({name: req.body.contributor, amount: parseFloat(req.body.amount)});
        project.save();
        console.log("Contribution successful!");
        Project.find(function(err, array) {
          if (err) {
            console.log("ERROR", err);
          } else {
            console.log(formatDates(array));
            res.render('index', {
              projects:formatDates(array)
            });
          }
        });
      }
    });
  }
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    res.render('editProject', {
      project:formatDates3(project)
    });
  });
});

// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {
  req.checkBody('selectpicker', 'Category not chosen').isZero(req.body.selectpicker);
  var errors = req.validationErrors();
  if (errors) {
    Project.findById(req.params.projectid, function(err, project) {
      res.render('editProject', {
        project:formatDates3(project),
        error:true
      });
    });
  } else {
    console.log("No errors!");
    console.log("Category: " + req.body.selectpicker);
    Project.findByIdAndUpdate(req.params.projectid, {
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.selectpicker
    }, function(err) {
      if (err) {
        console.log("ERROR", err);
      } else {
        console.log("SAVED!");
        Project.find(function(err, array) {
          if (err) {
            console.log("ERROR", err);
          } else {
            console.log(formatDates(array));
            res.render('index', {
              projects:formatDates(array)
            });
          }
        });
      }
    });
  }
});

router.post('/api/project/:projectId/contribution', function(req, res) {
    //save the donation
    req.checkBody('amount', 'Amount should be greater than zero').greaterThanZero(req.body.amount);
    if (!req.validationErrors()) {
      Project.findById(req.params.projectId, function(err, project) {
        if (err) {
          console.log("ERROR", err);
        } else {
          project.contributions.push({name: req.body.name, amount: parseFloat(req.body.amount)});
          project.save();
          console.log("Contribution successful!");
          res.json(project.contributions);
        }
      });
    } else {
      res.status(400).json(req.validationErrors());
    }
});

router.get('/api/projects', function(req, res) {
  var projects = [];

  if (req.query.funded === 'true'){
    Project.find(function(err, array) {
      if (err) {
        console.log("ERROR", err);
      } else {
        array = array.filter(function(item) {
          var totalContribution = 0;
          item.contributions.forEach(function(contribution) {
            totalContribution += contribution.amount;
          });
          return (totalContribution >= item.goal);
        });
        projects = array.slice();
        console.log("Projects now: " + projects);
        res.json(formatDates(array));
      }
    });
  } else if (req.query.funded === 'false'){
    Project.find(function(err, array) {
      if (err) {
        console.log("ERROR", err);
      } else {
        array = array.filter(function(item) {
          var totalContribution = 0;
          item.contributions.forEach(function(contribution) {
            totalContribution += contribution.amount;
          });
          return (totalContribution < item.goal);
        });
        res.json(formatDates(array));
      }
    });
  } else {
    Project.find(function(err, array) {
      if (err) {
        console.log('ERROR', err);
      } else {
        res.json(formatDates(array));
      }
    });
  }
  //check for sorting option
  /*if (req.query.sort && (req.query.sort === 'percentageFunded')) {
    if (!req.query.sortDirection || (req.query.sortDirection === 'ascending')) {
      projects.sort(function(a, b) {
        var totalRaisedA = 0;
        var totalRaisedB = 0;
        a.contributions.forEach(function(contribution) {
          totalRaisedA += contribution.amount;
        });
        b.contributions.forEach(function(contribution) {
          totalRaisedB += contribution.amount;
        });
        return totalRaisedA/a.goal - totalRaisedB/b.goal;
      });
    } else if (req.query.sortDirection === 'descending') {
      projects.sort(function(a, b) {
        var totalRaisedA = 0;
        var totalRaisedB = 0;
        a.contributions.forEach(function(contribution) {
          totalRaisedA += contribution.amount;
        });
        b.contributions.forEach(function(contribution) {
          totalRaisedB += contribution.amount;
        });
        return totalRaisedB/b.goal - totalRaisedA/a.goal;
      });
    }
  } else if (req.query.sort === 'amountFunded') {
    if (!req.query.sortDirection || (req.query.sortDirection === 'ascending')) {
      projects.sort(function(a, b) {
        var totalRaisedA = 0;
        var totalRaisedB = 0;
        a.contributions.forEach(function(contribution) {
          totalRaisedA += contribution.amount;
        });
        b.contributions.forEach(function(contribution) {
          totalRaisedB += contribution.amount;
        });
        return totalRaisedA - totalRaisedB;
      });
    } else if (req.query.sortDirection === 'descending') {
      projects.sort(function(a, b) {
        var totalRaisedA = 0;
        var totalRaisedB = 0;
        a.contributions.forEach(function(contribution) {
          totalRaisedA += contribution.amount;
        });
        b.contributions.forEach(function(contribution) {
          totalRaisedB += contribution.amount;
        });
        return totalRaisedB - totalRaisedB;
      });
    }
  }*/
});

module.exports = router;
