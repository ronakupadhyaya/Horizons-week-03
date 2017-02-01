# Pair Programming Exercise: Horizon Starter

## Introduction

Welcome to the wild world of Node web applications! With node, mongo+mongoose,
Express and Handlebars, you now have the tools you need to build a
fully-fledged, fully-functional backend web application.

### The goal

Our goal is to write the Horizon Starter app (a clone of Kickstarter) with Node
and Express. 

Here are the features we're going to implement:

- A front page which lists all projects
- A page that lets you view a project, and donate to that project
- A page that lets you create a new project
- The ability to filter and sort the list of projects on the front page using
  query parameters

## Project files

We've set up a simple Express project for you.

These are the files you will be editing for this exercise:

- Express routes (i.e. endpoints): `week03/day3/horizonstarter/routes.js`
- Mongoose models are in: `week03/day3/horizonstarter/models.js`
- Your views are in the folder: `week03/day3/horizonstarter/views/`
- CSS styles for all pages: `week03/day3/horizonstarter/public/css/main.css`

These files, you do **not** need to edit, but you may still find them interesting:

- Express starter script: `week03/day3/horizonstarter/app.js`
- Handlebars layout template:
  `week03/day3/horizonstarter/views/layouts/main.hbs1

## Setup

We don't store MongoDb usernames and passwords in Git for security reasons.
So you need to create new MongoDb database on mLab and configure your app
to use it.

1. Create a new Database in [mLab](https://mlab.com/home)
1. Click on the Databse you've just created, then click on Users `>` Add
   database user`, pick a username and password
1. Copy the **MongoDb URI** and replace `<dbuser>` `<dbpassword>` with the
  username and password you just created. It should look like this:
  
  ```
  mongodb://moose:peanutbutterandjelly@ds055555.mlab.com:55555/moose-new-database
  ```

1. Create new file `week03/day3/horizonstarter/config.js` and use
   `module.exports` to return an object with a single key `MONGODB\_URI`.
   Set the value of this key to the URI from the previous step. It should
   look like this:

  ```
  module.exports = {
    MONGODB_URI: 'mongodb://moose:peanutbutterandjelly@ds055555.mlab.com:55555/moose-new-database'
  }
  ```

1. Start your app with `npm start`, if you see this message then you are good to go!

  ```
  Success: connected to MongoDb!
  ```

## Getting oriented

We've implemented the `GET /create-test-project` endpoint in
`week03/day3/horizonstarter/routes.js` for your reference.  This endpoint
creates a `Project` object and saves it to MongoDb. 

You can find the definition of the `Project` model in 
`week03/day3/horizonstarter/models.js`.

Visit [http://localhost:3000/create-test-project](http://localhost:3000/create-test-project)
to create test data and look at your database in mLab. Note how there's now a
collection called `projects` and inside this collection you should see the newly
created document.

## Exercises

### Exercise 1: View all projects

1. Implement the `GET /` endpoint in `week03/day3/horizonstarter/routes.js`.
  Use `Project.find()` to get all the `Project`s from MongoDb and render
  them on `index.hbs`.

  Remember you have to do `res.render()` inside the callback for `.find()` like
  so:

  ```javascript
  SomeMongoDbModel.find(function(err, array) {
    res.render('template', {items: array});
  });
  ```
1. Edit `week03/day3/horizonstarter/views/index.hbs` and use [`{{#each}}`](http://handlebarsjs.com/builtin_helpers.html)
  to display all the `Project`s you get from `.find()`.

### Exercise 2: Create project

1. Edit `week03/day3/horizonstarter/views/index.hbs` and add a link (i.e. an `a`
   tag) that reads "Create new project" and points to
   `http://localhost:3000/new` at the bottom of the page.
1. Edit `week03/day3/horizonstarter/models.js` and add/edit these properties for
   the `Project` model:

   1. `title`: make this field required
   1. `goal`: Type: `Number`, required
   1. `description`: Type: `String`
   1. `start`: Type: `Date`, required
   1. `end`: Type: `Date`, required

1. Implement the `GET /new` endpoint in `week03/day3/horizonstarter/routes.js`.
  Render `new.hbs`.
1. Edit `week03/day3/horizonstarter/views/index.hbs` and render an HTML form
  that has `method` `POST` and `action` `/new`. This form should contain:
    1. `title`: text input field 
    1. `goal`: text input field
    1. `description`: [Textarea](http://www.w3schools.com/TAgs/tag_textarea.asp) 
    field 
    1. `start`: Date input field
    1. `end`: Date input field
1. Implement the `POST /new` endpoint in `week03/day3/horizonstarter/routes.js`.
  1. Validate form fields using `express-validate`, if there are errors render
  `new.hbs` with error messages and the form fields filled in.
  1. If there are no validation errors, create a new `Project` and
  `.save()` it. If `.save()` is successful redirect to `/`.
1. You should now see the newly created project on your "View all projects"
  page.

### Exercise 3: View a single project

1. Implement the `GET /project/:projectid` endpoint in `week03/day3/horizonstarter/routes.js`.
  Get the `Project` with the given `projectid` from MongoDb using `Project.findById()`
  then render `project.hbs` with this `Project`.
  You can find `projectid` under `req.params`.
1. Edit `week03/day3/horizonstarter/views/project.hbs` and display
  the `Project` `title`, `goal`, `description`, `start` and `end` dates.

### Exercise 4: Contribute to a project

Let's add the ability to make contributions to projects a la Kickstarter.
We're going to add a new form to the "View a single project" page
that allows us to make contributions.

1. Add a property to the `Project` model in `week03/day3/horizonstarter/models.js`:

  `contributions`: Type: `Array`, contains an array of objects with `name` and
  `amount` properties.
1. Edit `week03/day3/horizonstarter/views/project.hbs` and add an HTML form
  for making contributions. This form should have `name` and `amount` input
  fields for specifying who is making the contribution and the size of the
  contribution.
1. Implement the `POST /project/:projectid` endpoint in `week03/day3/horizonstarter/routes.js`.
  This endpoint should the `Project` from MongoDb with `.findById()`,
  add a new object to the `contributions` array and `.save()` it back.
1. Edit `week03/day3/horizonstarter/views/project.hbs` and display:
  1. Total amount of contributions made.
  1. Percentage of the project goal met
    (use [a Bootstrap progress bar](http://www.w3schools.com/bootstrap/bootstrap_progressbars.asp))
  1. List of all contributions showing who and how much.

### Exercise 5: Project categories

1. Add a property to the `Project` model in `week03/day3/horizonstarter/models.js`:

  `category`: Type: `String`, required. Ensure that this property can only have 
  one of these values using the `enum` option in mongoose:

  1. `Famous Muppet Frogs`
  1. `Current Black Presidents`
  1. `The Pen Is Mightier`
  1. `Famous Mothers`
  1. `Drummers Named Ringo`
  1. `1-Letter Words`
  1. `Months That Start With "Feb"`
  1. `How Many Fingers Am I Holding Up`
  1. `Potent Potables`

  Example `enum` usage:

  ```javascript
  // This model can be used to create Fords and Toyotas
  mongoose.Model('Car', {
    make: {
      type: String,
      enum: ['Ford', 'Toyota']
    }
  })
  ```

1. Edit `week03/day3/horizonstarter/views/new.hbs` and add a dropdown
  (i.e. a picklist) to the form to specify the `Project` `category`.
1. Edit `week03/day3/horizonstarter/views/project.hbs` and display
  the project category.

### Exercise 6: Edit project

1. Create a new view in `views` called `editProject.hbs`, add form fields
  to represent all the `Project` properties. You can copy `new.hbs`
  to start with!
1. Create a new endpoint in `routes.js` `GET /projects/:projectid/edit`
  that gets the given `Project` from MongoDb using `.findById()` and
  renders `editProject.hbs` with the `Project` object.

  When the project edit page loads, it should have all the properties of
  the project being edited pre-filled into form fields.

  You can use the `value=""` HTML attribute for this purpose:

  ```html
  <input type="text" name="title" value={{project.title}}>
  ```

1. Create a new endpoint in `routes.js` `POST /projects/:projectid/edit`.
  The HTML form in `editProject.hbs` should submit data to this endpoint
  (using `action` and `method`).

  When this route is called use `.findByIdAndUpdate()` to update the
  `Project` object:

  ```javascript
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    // YOUR CODE HERE
  }, function(err) {
    // YOUR CODE HERE
  });
  ```

### Exercise 7: Sort projects

1. Add two query parameters `GET /`: `sort` and `sortDirection`.

  When the `sort` query parameter is specified use `.sort()` when doing
  `.find()` to sort results you're getting back from MongoDb.

  If `sortDirection` is not specified assume ascending (i.e. increasing)
  order.

  [Mongoose `.sort()` usage](http://stackoverflow.com/a/15081087)
  
1. Add buttons to `week03/day3/horizonstarter/views/index.hbs` to sort
  projects by `start`, `end`, `goal` using the query parameters from 
  the previous step.

### Exercise 8: Sort by total contributions

Make it possible to sort projects by their total contribution.

We can't sort by total contributions inside MongoDb because there is no
`totalContributions` property. Get all projects from MongoDb then
sort the array yourself. You can install `underscorejs` with NPM if you'd like.

### Exercise 9: Filter projects by funding status

Make it possible to filter projects based whether they have met their funding
goal. Similar to "Exercise 8" we have to get all `Project`s from MongoDb
and filter them ourselves.

You should add links to `index.hbs` to allow:

1. View fully funded projects
1. View projects that are not fully funded

### Bonus: Exercise 10: Project images

Allow users to specify an optional image URL when creating project.  Display
this image on both the "View all projects" and the "View a single project"
pages.

### Double Bonus: Exercise 11: Validate forms with Bootstrap

Use
[HTML form validation rules](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Data_form_validation)
to enforce the validation checks performed by mongoose on HTML as well.
