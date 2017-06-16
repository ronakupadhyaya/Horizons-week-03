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
  Project.find(function(err, array) {
  res.render('index',{item:array});
});
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render('new');
});
var Eror="Fill in all the sections";
// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // req.checkBody('title','Title must not be empty').noteEmpty;
  // req.checkBody('goal','Title must not be empty').noteEmpty;
  // req.checkBody('description','Title must not be empty').noteEmpty;
  //
  // var errors=req.validationErrors();
  // var Eror="Fill in all the sections";

  //console.log("ggggggg",errors)

  var project=new Project({
    title:req.body.title,
    goal:req.body.goal,
    description:req.body.description,
    start:req.body.start,
    end:req.body.end,
    category:req.body.category

  })

  project.save(function(err,saved){
    if(err){
      res.render('new',{
      Eror:err,
      title:req.body.title,
      goal:req.body.goal,
      description:req.body.description,
      start:req.body.start,
      end:req.body.end,
      category:req.body.category
    })}else{
      res.redirect('/');
    }
  })


});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  var id=req.params.projectid;
  Project.findById(id,function(err, proj){
    if(err){console.log('error')}else{
      res.render('project',{proj:proj});
    }

  });

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  var nameCon=req.body.name;
  var amant=req.body.amount;
  var id=req.params.projectid;


  Project.findById(id,function(err,proj){
    if(err){ console.log(err)}else{

      proj.contributions.push({name:nameCon, amount:amant});

      proj.save(function(err,update){if(err){

      }else{
        var totalCont=0;
        proj.contributions.forEach( function(con){
          totalCont+=con.amount;
        })
        var percentage= totalCont*100/proj.goal;

        var contr=proj.contributions;
        console.log('pppp',percentage)
        res.render('project',{
          perc:percentage,
          contr:contr,
          totC:totalCont,
          proj:proj
        })
      }
      })
    }
  });
});

// Part 6: Edit project
router.get('/project/:projectid/edit', function(req, res){
  var id=req.params.projectid;
  Project.findById(id,function(err, proj){
    var st=new Date(proj.start);
    var nd=new Date(proj.end);
   console.log("rrrrrr",req.params.projectid)
    if(err){console.log('error')}else{
      res.render('editProject',{
        title:proj.title,
        goal:proj.goal,
        description:proj.description,
        start:st.toISOString().substring(0,10),
        end:nd.toISOString().substring(0,10),
        category:proj.category,
        projectid:id
      });
    }

  });



});

router.post('/project/:projectid/edit', function(req, res){

  Project.findByIdAndUpdate(req.params.projectid,{
    title:req.body.title,
    goal:req.body.goal,
    description:req.body.description,
    start:req.body.start,
    end:req.body.end,
    category:req.body.category
  },function(err){
    if(err){
      console.log(err);
      res.render('editProject',{
        title:req.body.title,
        goal:req.body.goal,
        description:req.body.description,
        start:req.body.start,
        end:req.body.end,
        category:req.body.category,
        projectid:req.params.projectid
      });

  }else{

      res.redirect('/');

    }
  })

});
// router.get('/:sort',function(req,res){
//   if (req.query.sort) {
//   var sortObject = {};
//   sortObject[req.query.sort] = 1;
//   Project.find().sort(sortObject).exec(function(err, array) {
//     // YOUR CODE HERE
//   });
// }
// })


router.post('/api/project/:projectid/contribution', function(req, res) {
  var id=req.params.projectid;

  Project.findById(id,function(err,proj){
    if(err){ console.log(err)}else{

      proj.contributions.push(req.body.contrib);
      proj.save(function(err,update){if(err){

      }else{
        var totalCont=0;
        proj.contributions.forEach( function(con){
          totalCont+=con.amount;
        })
        var percentage= totalCont*100/proj.goal;

        var contr=proj.contributions;



        res.json(contr);
        // res.render('project',{
        //   perc:percentage,
        //   contr:contr,
        //   totC:totalCont,
        //
        // })
      }
      })
    }
  });
});

module.exports = router;
