"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');
var validator = require('express-validator');
router.use(validator());

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
router.get('/',function(req,res){
  var sortAsc = 1;
  if (req.query.direction === 'desc') {
    sortAsc = -1;
  }

if(req.query.sort==='contributions'){
  Project.find(function(err,arr){
    // arr = [{c:[amount:]},{c:[amount:]},{c:[amount:]}]
    if(err){
      console.log(err);
    }


    arr=arr.sort(function(a,b){

      return (a.contributions.reduce(function(a,b){
        return a+parseInt(b.amount)
      },0))-(b.contributions.reduce(function(a,b){
        return a+parseInt(b.amount)
      },0))
    })

     //console.log(arr);
    res.render('index',{
      projects:arr
    })
  })
}

else if(req.query.sort==='fund'){
  Project.find(function(err,arr){
    // filter arr
    arr=arr.filter(function(a){
      return (a.contributions.reduce(function(c,d){
        return c+parseInt(d.amount)
      },0))/a.goal>=1
    })
    res.render('index',{
      projects:arr
    })
  })
}

else if(req.query.sort==='notfund'){
  Project.find(function(err,arr){
    // filter arr
    arr=arr.filter(function(a){
      return (a.contributions.reduce(function(c,d){
        return c+parseInt(d.amount)
      },0))/a.goal<1
    })
    res.render('index',{
      projects:arr
    })
  })
}

else if (req.query.sort) {
  var sortObject = {};
  sortObject[req.query.sort] = sortAsc;
  Project.find().sort(sortObject).exec(function(err, array) {
    if (err){
      console.log('err '+err);
    }
    else{
      console.log(array);
      res.render('index',{
        projects:array
      })
    }
  });
}

else{
  Project.find(function(err,arr){
    res.render('index',{
        projects:arr
      })
    })
}
})


// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  var categories=['Famous Muppet Frogs','Current Black Presidents','The Pen Is Mightier',
  'Famous Mothers','Drummers Named Ringo','1-Letter Words','Months That Start With "Feb"',
  'How Many Fingers Am I Holding Up','Potent Potables'].map(function(i) {
    return {
      name: i,
      selected: false
    }
  });
  // can i somehow pass this in because i cant get the project from here?
  res.render('new.hbs',{
    category:categories
  })
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {

    // create new project and redirect
    var obj = {
      title:req.body.title,
      goal:req.body.goal,
      description:req.body.description,
      start:req.body.start,
      end:req.body.end,
      category:req.body.category
    };
    var newProject = new Project(obj)
    newProject.save(function(err,p) {
      if (err) {
        console.log(err);
        console.log(p);
        var categories=['Famous Muppet Frogs','Current Black Presidents','The Pen Is Mightier',
        'Famous Mothers','Drummers Named Ringo','1-Letter Words','Months That Start With "Feb"',
        'How Many Fingers Am I Holding Up','Potent Potables']
        var temp = categories.map(function(i) {
          return {
            name: i,
            selected: req.body.category === i ? true : false
          }
        });
        console.log(temp);

        res.render('new.hbs',{
          project: obj,
          err:err,
          category: temp
        })
      }
      else {
        res.redirect('/')
      }
    });

});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, p) {
    // contributions=[{name:amy,amount:100},{name:david,amount:100}]
    var sum = p.contributions.reduce(function(a,b){
      return a+parseInt(b.amount)
    },0)
    console.log(sum);
    var percent=sum/p.goal;
    res.render('project.hbs',{
      project:p,
      sum:sum,
      percent:percent,
      arr:p.contributions
    })
  })

});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, p) {
    var obj={'name':req.body.name,'amount':req.body.amount};
    p.contributions.push(obj);
    p.save(function(err){
      console.log(err)
    });
    res.redirect('/project/'+req.params.projectid)
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint
router.get('/project/:projectid/edit',function(req,res){
  Project.findById(req.params.projectid,function(err,p){
  var categories=['Famous Muppet Frogs','Current Black Presidents','The Pen Is Mightier',
  'Famous Mothers','Drummers Named Ringo','1-Letter Words','Months That Start With "Feb"',
  'How Many Fingers Am I Holding Up','Potent Potables'].map(function(category) {
    if (p.category ===category){
      return {name:category,selected:true}
    }
    else{
    return {
      name: category,
      selected: false
    }
  }
  });


  var dateSt = p.start.toISOString();
  var dateE = p.end.toISOString();
  var dateFormatSt = dateSt.slice(0,10);
  var dateFormatE = dateE.slice(0,10);

  res.render('editProject.hbs',{
    category:categories,
    project:p,
    start:dateFormatSt,
    end:dateFormatE,
    err:err
  })
})
})


router.post('/project/:projectid/edit',function(req,res){
  var obj = {
    title:req.body.title,
    goal:req.body.goal,
    description:req.body.description,
    start:req.body.start,
    end:req.body.end,
    category:req.body.category
  };

  Project.findByIdAndUpdate(req.params.projectid,obj,function(err,p) {
    if (err) {
      console.log(err);
      console.log(p);
      var categories=['Famous Muppet Frogs','Current Black Presidents','The Pen Is Mightier',
      'Famous Mothers','Drummers Named Ringo','1-Letter Words','Months That Start With "Feb"',
      'How Many Fingers Am I Holding Up','Potent Potables']
      var temp = categories.map(function(i) {
        return {
          name: i,
          selected: req.body.category === i ? true : false
        }
      });
      console.log(temp);
      res.render('editProject',{
        project: obj,
        err:err,
        category: temp
      })
    }
    else {
      res.redirect('/')
    }
  });

  });


router.post('/api/project/:projectId/contribution',function(req,res){
  Project.findById(req.params.projectId,function(err,project){
    if(err){
      console.log('error'+err);
    }
    else{

      router.use(validator({
   customValidators: {
      isPos: function(value) {
          return value>=0;
      }
    }  }));
      req.check('amount','amount > 0').isPos();
      var error=req.validationErrors();
      if(error){
          res.status(400).json(error);
      }
      else{
            var newContribution = {
              name:req.body.name,
              amount:req.body.amount
            }
            project.contributions.push(newContribution);
            project.save(function(err){
              if (err){
                console.log(err);
              }
              else{
                res.json(project)
              }
            });
    }
    }
  })
})

module.exports = router;
