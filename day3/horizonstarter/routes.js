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

  Project.find(function(err, projects) {

    var results;

    if(req.query.sort === 'start') {
      if (req.query.sortDirection === 'ascending') {
        projects.sort(function(p1, p2) {
          if (p1.start > p2.start) 
            return 1;
          else 
            return -1;
        });
      }
      else {
        projects.sort(function(p1, p2) {
          if (p1.start < p2.start) 
            return 1;
          else 
            return -1;
        });
      }
    }
    else if (req.query.sort === 'end') {
      if (req.query.sortDirection === 'ascending') {
        projects.sort(function(p1, p2) {
          if (p1.end > p2.end) 
            return 1;
          else 
            return -1;
        });
      }
      else {
        projects.sort(function(p1, p2) {
          if (p1.end < p2.end) 
            return 1;
          else 
            return -1;
        });
      }
    }
    else if (req.query.sort === 'goal') {
      if (req.query.sortDirection === 'ascending') {
        projects.sort(function(p1, p2) {
          if (p1.goal > p2.goal) 
            return 1;
          else 
            return -1;
        });
      }
      else {
        projects.sort(function(p1, p2) {
          if (p1.goal < p2.goal) 
            return 1;
          else 
            return -1;
        });
      }
    }
    else if (req.query.sort === 'contribution') {
      if (req.query.sortDirection === 'ascending') {
        projects.sort(function(p1, p2) {
          var total1 = 0;
          var total2 = 0;
          p1.contributions.forEach(function(contr) {
            total1 += contr.amount;
          });
          p2.contributions.forEach(function(contr) {
            total2 += contr.amount;
          });
          if (total1 > total2) 
            return 1;
          else 
            return -1;
        });
      }
      else {
        projects.sort(function(p1, p2) {
          var total1 = 0;
          var total2 = 0;
          p1.contributions.forEach(function(contr) {
            total1 += contr.amount;
          });
          p2.contributions.forEach(function(contr) {
            total2 += contr.amount;
          });
          if (total1 < total2) 
            return 1;
          else 
            return -1;
        });
      }
    }
    
    if (req.query.filter === 'fully') {
      results = projects.filter(function(project) {
        var total = 0;
        project.contributions.forEach(function(contr) {
          total += contr.amount;
        });
        return (total > project.goal)
      });
    }
    else if (req.query.filter === 'not-fully') {
      results = projects.filter(function(project) {
        var total = 0;
        project.contributions.forEach(function(contr) {
          total += contr.amount;
        });
        return (total < project.goal)
      })
    }
    else {
      results = projects;
    }

    console.log(req.query);
    res.render('index', {
      projects: results,
      sort: req.query.sort || 'start',
      sortDirection: req.query.sortDirection || 'ascending'
    });
  });
});

// Part 2: Create project
// Implement the POST /new endpoint
router.get('/new', function(req,res) {
  res.render('new');
});


router.post('/new', function(req, res) {
  // Validating create project inputs
  req.checkBody('title', 'Fill in the title').notEmpty();
  req.checkBody('goal', 'Fill in the goal').notEmpty();
  req.checkBody('start', 'Start cannot be empty').notEmpty();
  req.checkBody('start', 'Start date cannot be before end date.').isBefore(req.body.end);
  req.checkBody('end', 'End cannot be empty').notEmpty();

  // Creating an errors array from the validation
  var errors = req.validationErrors();
  if(errors) {
    console.log(errors);
    res.render('new',{
      errors: errors
    })
  }
  else {
    console.log(req.body);
    var project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      contributions: [],
      category: req.body.category,
      imageURL: req.body.imageURL
    })
    project.save(function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        // Go back to the view projects page
        res.redirect('/');
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log("Error finding project by id");
    } else {

      // Keep track of the total contributions
      var total = 0;
      if (project.contributions) {
        project.contributions.forEach(function(contr) {
          total += contr.amount;
        });
      }
      // Calculate the percentage of the goal met
      var percentage = (total/project.goal) * 100;

      // See if the goal has been completed or not
      var complete = false;
      if (percentage > 100) {
        complete = true;
      } else {
        complete = false;
      }
      // Render the new page
      res.render('project', {
        project: project,
        contributions: project.contributions,
        total: total,
        percentage: percentage,
        complete: complete,
      });
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log("Error trying to contribute: cannot find project by id");
    } else {
      // create the new contribution based on the form submitted
      var newContribution = {name: req.body.name, amount: req.body.amount}
      project.contributions = project.contributions || [];
      project.contributions.push(newContribution);

      // update on the item within the model with the added contribution
      project.update({contributions: project.contributions}, function(err, project) {
        if (err) {
          console.log("Error updating the contributions", err);
        } else {
          console.log("Contribution successful");
          res.redirect('/project/' + req.params.projectid);
        }
      });
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get('/project/:projectid/edit', function(req, res) {
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      alert('Project not found');
    }
    else {
      var startDateString = project.start.toISOString().substring(0, 10);
      var endDateString = project.start.toISOString().substring(0, 10);
      res.render('editProject', {
        project: project,
        start: startDateString,
        end: endDateString
      });
    }
  });
});
// Create the POST /project/:projectid/edit endpoint
router.post('/project/:projectid/edit', function(req, res) {

  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    category: req.body.category,
    imageURL: req.body.imageURL
  }, {new: true}, function(err, project) {
    console.log(project);
    res.redirect('/project/' + project._id);
  });
  
});

// AJAX call for submitting and updating contributions
router.post('/api/project/:projectId/contribution', function(req,res) {
  Project.findById(req.params.projectId, function(err, project) {
    if (err) {
      console.log("Error trying to contribute: cannot find project by id");
    } else {
      // create the new contribution based on the form submitted
      var newContribution = {name: req.body.name, amount: req.body.amount}
      project.contributions = project.contributions || [];
      project.contributions.push(newContribution);

      // update on the item within the model with the added contribution
      project.update({contributions: project.contributions}, function(err, project) {
        if (err) {
          console.log("Error updating the contributions", err);
          res.json({error: "Error updating the contributions"});
        } else {
          res.json(newContribution); 
        }
      });
    }
  })
})

// AJAX call for filtering projects and re-appending them
router.get('/api/projects', function(req,res) {;
  Project.find(function(err, projects) {
    var results = projects;
    if (err) {
      console.log(err);
    }
    console.log(req.query);
    // Sorting projects
    if(req.query.sort === 'start') {
      if (req.query.sortDirection === 'ascending') {
        results.sort(function(p1, p2) {
          if (p1.start > p2.start) 
            return 1;
          else 
            return -1;
        });
      }
      else {
        results.sort(function(p1, p2) {
          if (p1.start < p2.start) 
            return 1;
          else 
            return -1;
        });
      }
    }
    else if (req.query.sort === 'end') {
      if (req.query.sortDirection === 'ascending') {
        results.sort(function(p1, p2) {
          if (p1.end > p2.end) 
            return 1;
          else 
            return -1;
        });
      }
      else {
        results.sort(function(p1, p2) {
          if (p1.end < p2.end) 
            return 1;
          else 
            return -1;
        });
      }
    }
    else if (req.query.sort === 'goal') {
      if (req.query.sortDirection === 'ascending') {
        results.sort(function(p1, p2) {
          if (p1.goal > p2.goal) 
            return 1;
          else 
            return -1;
        });
      }
      else {
        results.sort(function(p1, p2) {
          if (p1.goal < p2.goal) 
            return 1;
          else 
            return -1;
        });
      }
    }
    else if (req.query.sort === 'contribution') {
      if (req.query.sortDirection === 'ascending') {
        results.sort(function(p1, p2) {
          var total1 = 0;
          var total2 = 0;
          p1.contributions.forEach(function(contr) {
            total1 += contr.amount;
          });
          p2.contributions.forEach(function(contr) {
            total2 += contr.amount;
          });
          if (total1 > total2) 
            return 1;
          else 
            return -1;
        });
      }
      else {
        results.sort(function(p1, p2) {
          var total1 = 0;
          var total2 = 0;
          p1.contributions.forEach(function(contr) {
            total1 += contr.amount;
          });
          p2.contributions.forEach(function(contr) {
            total2 += contr.amount;
          });
          if (total1 < total2) 
            return 1;
          else 
            return -1;
        });
      }
    }
    // Filtering projects
    if (req.query.funded === 'true') {
      results = projects.filter(function(project) {
        var total = 0;
        project.contributions.forEach(function(contr) {
          total += contr.amount;
        });
        return (total > project.goal)
      });
    }
    else if (req.query.funded === 'false') {
      results = projects.filter(function(project) {
        var total = 0;
        project.contributions.forEach(function(contr) {
          total += contr.amount;
        });
        return (total < project.goal)
      });
    }
    else {
      results = projects;
    }
    if (err) {
      console.log(err);
    }

    res.json(results);
  });
});

// // AJAX call for sorting projects and re-appending them
// router.get('/api/projects', function(req,res) {
//   Project.find(function(err, projects) {
//     var results = projects;
//     console.log("hereeee");
//     console.log("ANYTHING" + projects);
//     if (err) {
//       console.log(err);
//     }
//     if(req.query.sort === 'start') {
//       if (req.query.sortDirection === 'ascending') {
//         results.sort(function(p1, p2) {
//           if (p1.start > p2.start) 
//             return 1;
//           else 
//             return -1;
//         });
//       }
//       else {
//         results.sort(function(p1, p2) {
//           if (p1.start < p2.start) 
//             return 1;
//           else 
//             return -1;
//         });
//       }
//     }
//     else if (req.query.sort === 'end') {
//       if (req.query.sortDirection === 'ascending') {
//         results.sort(function(p1, p2) {
//           if (p1.end > p2.end) 
//             return 1;
//           else 
//             return -1;
//         });
//       }
//       else {
//         results.sort(function(p1, p2) {
//           if (p1.end < p2.end) 
//             return 1;
//           else 
//             return -1;
//         });
//       }
//     }
//     else if (req.query.sort === 'goal') {
//       if (req.query.sortDirection === 'ascending') {
//         results.sort(function(p1, p2) {
//           if (p1.goal > p2.goal) 
//             return 1;
//           else 
//             return -1;
//         });
//       }
//       else {
//         results.sort(function(p1, p2) {
//           if (p1.goal < p2.goal) 
//             return 1;
//           else 
//             return -1;
//         });
//       }
//     }
//     else if (req.query.sort === 'contribution') {
//       if (req.query.sortDirection === 'ascending') {
//         results.sort(function(p1, p2) {
//           var total1 = 0;
//           var total2 = 0;
//           p1.contributions.forEach(function(contr) {
//             total1 += contr.amount;
//           });
//           p2.contributions.forEach(function(contr) {
//             total2 += contr.amount;
//           });
//           if (total1 > total2) 
//             return 1;
//           else 
//             return -1;
//         });
//       }
//       else {
//         results.sort(function(p1, p2) {
//           var total1 = 0;
//           var total2 = 0;
//           p1.contributions.forEach(function(contr) {
//             total1 += contr.amount;
//           });
//           p2.contributions.forEach(function(contr) {
//             total2 += contr.amount;
//           });
//           if (total1 < total2) 
//             return 1;
//           else 
//             return -1;
//         });
//       }
//     }
//     res.json(results);
//   });
// });

module.exports = router;










