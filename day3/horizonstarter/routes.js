"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var _ = require('underscore');
var validator = require('express-validator');



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
  // var sortDir=0;
  // if(req.query.sortDir){
  //   if(req.query.sortDir==='ascending')sortDir=1;
  //   else sortDir=-1;
  // }
  if(req.query.sort){
    if(req.query.sort!='totalcontributios'){
    var sortObject = {};
    sortObject[req.query.sort] = 1;
    Project.find().sort(sortObject).exec(function(err, pro){
      if(err)console.log(err);
      else{
        res.render('index',{
          pro:pro,
          sort:req.query.sort
        })
      }
    });}else{
      Project.find(function(err,pro){
        if(err)console.log(err);
        else{
            var data=_.sortBy(pro,function(item){return item.totalContributions});
            if(req.query.sortDirection==='descending')data=data.reverse();
            res.render('index',{
              pro:data,
              sort:req.query.sort
            })
        }
      })
    }
  }
  else{
      Project.find(function(err,pro){
        if(err)console.log(err);
        else {
          res.render('index',{
            pro:pro,
            sort:req.query.sort
          })
        }
      })
  }
});

router.get('/funded/:flag',function(req,res){
  if(req.params.flag==='true'){
    Project.find(function(err,pro){
      if(err)console.log(err);
      else{
        pro=pro.filter(function(item){
          return item.totalContributions>=item.goal;
        })
        res.render('projectlist',{
          pro:pro
        })
      }
    })
  }else{
    Project.find(function(err,pro){
      if(err)console.log(err);
      else{
        pro=pro.filter(function(item){
          return item.totalContributions!==item.goal;
        })
        res.render('projectlist',{
          pro:pro
        })
      }
    })

  }
})

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new');
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.check('title','Title is empty').notEmpty();
  req.check('start','Start date is empty').notEmpty();
  req.check('end','End date is empty').notEmpty();
  var error=req.validationErrors();
  var project = new Project({
    title: req.body.title,
    goal: req.body.goal,
    start: req.body.start,
    end: req.body.end,
    description: req.body.description,
    category:req.body.category,
    totalContributions:0
  });
  project.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.redirect('/')
    }
  });


});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  console.log('here');
  Project.findById(req.params.projectid,function(err,pro){
    if(err){
      res.status(500).json(err);
    }else{
      var totalamount=pro.totalContributions;
      // pro.contributions.forEach(function(item){
      //   totalamount+=parseInt(item.amount)
      // })
      totalamount=(totalamount/pro.goal)*100;
      console.log(totalamount);
      res.render('project',{
        pro:pro,
        amount:totalamount
      })
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid,function(err,pro){
    if(err){
      res.status(500).json(err);
    }else{
      var contribution={name:req.body.name,amount:req.body.amount};
      pro.totalContributions+=parseInt(req.body.amount);
      //console.log(contribution);
      pro.contributions.push(contribution);
      pro.save(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.redirect('/')
        }
      });
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

router.get('/projects/:projectid/edit',function(req,res){
  Project.findById(req.params.projectid,function(err,pro){
    if(err)console.log(err);
    else{
      res.render('editProject',{
        pro:pro
      })
    }
  })
})

router.post('/projects/:projectid/edit',function(req,res){
  Project.findByIdAndUpdate(req.params.projectid,{
    title:req.body.title,
    goal: req.body.goal,
    start: req.body.start,
    end: req.body.end,
    description: req.body.description,
    category:req.body.category
  }, function(err){
    if(err){
      res.status(500).json(err);
    }else{
      res.redirect('/');
    }
  })
})


router.post('/api/project/:projectId/contribution',function(req,res){

  Project.findById(req.params.projectId,function(err,pro){
    if(err){
      console.log('i dont want to come here');
      res.status(500).json(err);
    }else{
      console.log('i dont want to come here');
      var contribution={name:req.body.contribution.name,amount:req.body.contribution.amount};
      pro.totalContributions+=parseInt(req.body.contribution.amount);
      pro.contributions.push(contribution);
      pro.save(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(contribution);
        }
      });
    }
  })
//}
})

router.get('/api/projects',function(req,res){
  if(req.query.funded==='true'){
    Project.find(function(err,pro){
      if(err)console.log(err);
      else{
        pro=pro.filter(function(item){
          return item.totalContributions>=item.goal;
        })
        if(req.query.sort==='amountFunded'){
          pro=_.sortBy(pro,'totalContributions');
          if(req.query.sortDirection==='descending')pro=pro.reverse();
        }else if(req.query.sort==='percentageFunded'){
          pro=_.sortBy(pro,function(item){return item.totalContributions/item.goal})
          if(req.query.sortDirection==='descending')pro=pro.reverse();
        }
        res.json(pro);
      }
    })
  }else if(req.query.funded==='false'){
    Project.find(function(err,pro){
      if(err)console.log(err);
      else{
        pro=pro.filter(function(item){
          return item.totalContributions<item.goal;
        })
        if(req.query.sort==='amountFunded'){
            pro=_.sortBy(pro,'totalContributions');
            if(req.query.sortDirection==='descending')pro=pro.reverse();
        }else if(req.query.sort==='percentageFunded'){
          pro=_.sortBy(pro,function(item){return item.totalContributions/item.goal})
          if(req.query.sortDirection==='descending')pro=pro.reverse();
        }
        res.json(pro);
      }
    })
  }else{
    Project.find(function(err,pro){
      if(err)console.log(err);
      else{
        res.json(pro);
      }
    })
  }
})







module.exports = router;
