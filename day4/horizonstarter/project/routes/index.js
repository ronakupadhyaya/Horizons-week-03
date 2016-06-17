var express = require('express');
var router = express.Router(); //way of grouping endpoints together -->
                // similar to app.get, app.post etc. --> is a bundle of endpoints
var models = require('../models/models'); // we need this in index.js and not app.js because
      // we are creating an ENDPOINT here to move things around

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Erin\'s Express' });
});

/* new page */
router.get('/hello', function(req, res) {
  res.send('index', ('Hello!'))  ;

});

router.get('/projects', function(req, res){
  models.project.find(function(error, mongoProjects){
    res.render('projects', {
      projects: mongoProjects
    });
  })
});



router.get('/projects/:id', function(req, res){
  models.project.findById(req.params.id, function(error, mongoProject){
        //TODO: handle missing project

    if(error){
      res.status(400).send('Error reading project '+error);
    } else if( !mongoProject){
      res.status(404).send('No Such Project: '+ req.body.id);
    } else {
      res.render('singleProject', {
        'project': mongoProject
      });
    }
  });
});

router.get("/new", function(req, res){
  res.render('new');
});

router.post("/new", function(req, res){
  console.log(req.body);
  var p = new models.project({
    title: req.body.title,
    goal: req.body.goal,
    desc: req.body.desc,
    category: req.body.category,
    startDate: req.body.startDate,
    endDate: req.body.endDate
    });
    console.log("here")
  p.save(function(error){
    if(error) {
      res.status(400).send("Error creating project:" + error)}
      else{
        res.redirect('/projects');
      }
    }
)}
);
router.get("/projects/delete/:id", function(req, res){
  models.project.findByIdAndRemove(req.params.id, function(error, mongoProject){
    if(error){
      res.status(400).send('Error reading project '+ error);
    } else if(!mongoProject){
      res.status(404).send('No Such Project: '+ req.body.id);
    } else {
      res.redirect('/projects');
    }});
  });

  router.post("/new", function(req, res){
    console.log(req.body);
    var p = new models.project({
      title: req.body.title,
      goal: req.body.goal,
      desc: req.body.desc,
      category: req.body.category,
      startDate: req.body.startDate,
      endDate: req.body.endDate
      });
      console.log("here")
    p.save(function(error){
      if(error) {
        res.status(400).send("Error creating project:" + error)}
        else{
          res.redirect('/projects');
        }
      }
  )}
  );

  router.post("/donate/:id", function(req, res){
    var d = new models.project({
    donation: req.query.donation});
    d.save(function(error ))
    });

    app.post('/counters/:id/up', function(req, res) {
      var update = {
        $inc: {
          count: -1
        }
      };
      Counter.findByIdAndUpdate(req.params.id, update, function(error, counter) {
        if (error) {
          res.status(400).send(error);
        } else {
          res.json(counter);
        }
      });
    });

    app.post('/counters/:id/up', function(req, res) {
      Counter.findById(req.params.id, function(error, counter) {
        if (error) {
          res.status(400).send(error);
        } else {
          counter.count++;
          counter.save(function(error2, newCounter) {
            if (error2) {
              res.status(400).send(error2);
            } else {
              res.json(newCounter);
            }
          });
        }
      });
    });

    app.post('/counters/up/:id', function(req, res) {
      var incrementBy = req.body.amount || 1;
      var update = {
        $inc: {
          count: incrementBy
        }
      };
      Counter.findByIdAndUpdate(req.params.id, update, function(error, counter) {
        if (error) {
          res.status(400).send(error);
        } else {
          res.json(counter);
        }
      });
    });


module.exports = router;


//when you define routes, this is where you do it
