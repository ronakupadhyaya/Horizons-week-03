var express = require('express');
var models = require('../models/models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/projects', function (req, res) {
    models.project.find(function (error, mongoProjects) { //models.project comes from models.js
        res.render('projects', {
            'projects': mongoProjects
        });
    })
})

router.get('/myUrl', function (req, res) {
    models.project.find(function (error, mongoProjects) {
        res.render('projects', {
            'projects': mongoProjects
        });
    })
});

router.get('/projects/:id', function (req, res) {
    models.project.findById(req.params.id, function (error, mongoProject) {
        // TODO handle missing project
        if (error) {
            res.status(400).send('Error reading project');
        } else if (! mongoProject){
            res.status(404).send('No such project: ' + req.params.id);
        } else {
            res.render('singleProject', {
                'project': mongoProject
            })
        };
    })
});

router.get('/new', function (req, res) {
    res.render('new');
})

router.get('/new/posts', function (req, res) {
    res.render('new');
})

router.post('/new', function(req, res) {
    var p = new models.project({
        title: req.body.title,
        goal: req.body.amount,
        raised: 0,
        category: req.body.category,
        description: req.body.description,
        startDate: req.body.start,
        endDate: req.body.end
    });  //req.body because it's a post and it's coming from the body and not the query
    p.save(function(error, project) {
        if (error) {
            res.status(400).send("Error creating project: " + error);
        } else {
            //res.redirect('/projects/' + project._id);
            res.redirect('/projects/');
        }
    })
})

// router.post('/projects/:id', function (req, res) {
//     models.project.findById(req.params.id, function (error, mongoProject) {
//         // TODO handle missing project
//         if (error) {
//             res.status(400).send('Error reading project');
//         } else if (! mongoProject){
//             res.status(404).send('No such project: ' + req.params.id);
//         } else {
//             models.project.findOneAndUpdate(req.body._id,
//                 {
//                     '$inc': {
//                         contributions: req.body.contribution
//                     }
//                 });
//                 res.render('singleProject', {
//                     'project': mongoProject
//                 })
//             };
//         })
//     });


module.exports = router;
