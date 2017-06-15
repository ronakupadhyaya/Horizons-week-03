"use strict";

//horizonsstarter

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
  Project.find(function(err, projects){
    res.render('index', {projects: projects})
  })
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {



  // if(!req.body.title ||!req.body.goal ||!req.body.description ||!start ||!end){
  //   res.status(400).send("400 error, empty field(s)")
  //   res.render('new',{project: post})
  //   }else{

  var title = req.body.title;
  var goal =  req.body.goal;
  var description= req.body.description;
  var start= req.body.start;
  var end= req.body.end;


  var post={
    title: title,
    goal: goal,
    description: description,
    start: start,
    end: end,
  }
  var project = new Project(post);

  project.save(function(err){
    project['err']=err;
    if(err){
      console.log(err);
      res.render('new', project);
    }
    else{
      console.log("success");
      res.redirect('/');
    }
    //mongoose.connection.close();
  });

    //}



  // // YOUR CODE HERE
  // var task=new ToDoItem({
  //   name:name,
  //   priority:priority,
  //   completed:false
  // });
  //
  // // TODO: Use mongoose's save function to save task (the new instance of
  // //    your model that you created above). In the callback function
  // //    you should close the mongoose connection to the database at the end
  // //    using "mongoose.connection.close();"
  //
  // // YOUR CODE HERE
  // task.save(function(err){
  //   if(err){
  //     console.log("could not save");
  //   }
  //   else{
  //     console.log("success");
  //   }
  //   mongoose.connection.close();
  // });
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, projects){
    if(err){
      console.log("error"+err);
     }
    else{
      console.log("success"+projects);
      res.render('project', projects);

    }
  });


});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  console.log(req.params.projectid);
  Project.findById(req.params.projectid, function(err, project){

    var name = req.body.name;
    var amount =  req.body.amount;


    var post={
      name: name,
      amount: amount,
    }


    if(err){
      console.log("error"+err);
     }
    else{
      console.log("success"+project);
      project.contributions.push(post);
      var sum = 0;
      for(var i = 0; i < project.contributions.length; i++){
        sum+= parseInt(project.contributions[i].amount);
      }
      project.totalContributions = sum;
      project.goalMet=(project.totalContributions/project.goal)*100;
      project.save(function(err, savedProject){
        //that function is a callback function

        //project['err'] = err;
        if(err){
          console.log(err);
          res.render()
        }
        else{
          console.log("success");
          res.redirect('/project/'+savedProject._id);
          //_id is a mongo thing but you wouldn't do that above, just here
        }
        //mongoose.connection.close();
      });
    }
  });

});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
