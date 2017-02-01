# Server-side app: Horizon Starter

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

Files you **will** edit:

- `week03/day3/horizonstarter/models.js`: your Mongoose models
- `week03/day3/horizonstarter/routes.js`: Express routes (i.e. endpoints)

Files you will **not** edit:

- `week03/day3/horizonstarter/app.js`

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

  By the way, a **URI** is like a **URL** for things that are not ne

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
  Use `Project.find()` to get all the `Project`s from MongoDb. Render
  `index.hbs` and pass the array you get back from `.find()` as a template
  varaable

  Remember you have do `res.render()` inside the callback for `.find()` like
  so:

  ```javascript
  SomeMongoDbModel.find(function(err, array) {
    res.render('template', {items: array});
  });
  ```
1. Edit `week03/day3/horizonstarter/views/index.hbs` and render all the
   projects from MongoDb using `{{#each}}`

### Exercise 2: Create project

1. Edit `week03/day3/horizonstarter/views/index.hbs` and add a link (i.e. an
   `a` tag) pointing `http://localhost:3000/new` at the bottom of the page.
1. Edit `week03/day3/horizonstarter/models.js` and add/edit properties for the
   `Project` model:

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

  You can use the `value=""` HTML property for this purpose:

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

### Exercise TODO: Filter projects by funding status

Make it possible to filter projects based whether they have met their funding
goal. It should be possible to view only projects that are fully funded and
it should be possible to view on TODO

### Bonus: Exercise TODO: Project images

Allow users to specify an optional image URL when creating project.  Display
this image on both the "View all projects" and the "View a single project"
pages.

### Double Bonus: Exercise TODO: Validate forms with Bootstrap

Use
[HTML form validation rules](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Data_form_validation)
to enforce the validation checks performed by mongoose on HTML as well.

## Contents

- [Introduction](#introduction)
- [Phase 1: Getting started](#phase-1-getting-started)
- [Phase 2: Mongo, Mongoose](#phase-2-mongo-mongoose)
- [Phase 3: Data model, schema](#phase-3-data-model-schema)
- [Phase 4: Views](#phase-4-views)
- [Phase 5: Routes](#phase-5-routes)
- [A little extra guidance](#a-little-extra-guidance)
- [BONUS challenges](#bonus-challenges)
- [Troubleshooting](#troubleshooting)

## Introduction

Welcome to the wild world of backend web applications! With node,
mongo+mongoose, and handlebars, you now have the tools you need to build a
fully-fledged, fully-functional backend web application. Before we dive in,
let's recap the differences between front and backend webapps. You spent last
week building frontend apps, which:

- run lots of Javascript in the user's browser
- are often single page applications, such as Horello, which means the browser
  does not need to navigate to different pages or locations; all interaction
  happens within a single page
- communicate with a server using AJAX, often via a RESTful JSON API
- are a bit slower to load, but are often more responsive once loaded since they
  don't require as much back and forth to and from a server

In contrast, backend apps, such as the one you're building as part of this
project:

- run on a server, which means that the pages are fully rendered on the server
  and the user's browser only sees HTML and CSS
- may be written in Javascript (using Node), such as this project, but may also
  be written in a large variety of other languages such as Python, PHP, Ruby,
  etc.
- do not require running Javascript in the user's browser 
- do not require using an API to communicate with the backend
- are faster to load, but are often less responsive since many user actions
  require sending data to the server and waiting for a response

Note that many of these rules are flexible, and many apps use a hybrid approach
that includes benefits of both frontend and backend apps. We'll explore this
topic more over the coming days. But we'll start today by writing a purely
backend web app.

### The goal

Your goal is to write the Horizon Starter app (a clone of Kickstarter) as a
purely backend webapp. You're starting from scratch and it's up to you to design
and layout the project as you see fit, but we'll walk you through the steps and
provide suggestions.

In terms of functionality, the MVP (everything up to and excluding the
[bonuses](#bonus-challenges)) should contain the following:

- A front page which lists all projects (perhaps with a set of featured projects
  on top, like on Kickstarter)
- A page that lets you view a project, and donate to that project
- A page that lets you create a new project
- The ability to filter the list of projects on the front page using query
  parameters
  - Filter by projects that are fully funded (query string: `?funded=true`)
  - Filter by projects looking to raise over a certain amount of money (e.g. the
    query string `?goalAbove=10000` should return all projects seeking
    to raise over $10k) (not implemented in today's solution, implemented in
    [tomorrow's solution](../../day5/horizonstarter-ajax/solution))
- A page that lets you bulk edit/delete projects (not implemented in
  solution)

A Kickstarter clone without users sounds a little sucky, but it's a great
starting point and an introduction to backend apps, routes, and databases.
You'll get to add users and some additional cool functionality in the bonus.

### Solution

You can check out a [live, hosted version of the
solution](http://starter.horizonsbootcamp.com:8090/). You can also run the solution code
locally, but first you'll need to [configure Mongo](#phase-2-mongo-mongoose). If
you're not running MongoDB locally, you'll also need to update the MongoDB URI
in `config/db.js`. Then you can run:

```
$ cd solution/
$ npm install
$ npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) in your browser
to see it. Note that only the most basic styling has been applied to the
solution: your app should be a heckuvalot prettier!

### Stack

Recall from lesson that a "stack" refers to the set, or stack (because they sit
on top of each other), of technologies that you use to build an app or, more
generally to solve a problem. Read more about the concept [in this Wikipedia
article](https://en.wikipedia.org/wiki/Solution_stack).

Our stack for this project consists of:

- Language: Node (i.e., Javascript)
- Database: MongoDB with Mongoose
- Server: ExpressJS
- Templates: Handlebars

## Phase 1: Getting started
### Project scaffolding

First things first. You should already have installed node. ([The instructions
are here](../../day2/warmup.md) if you need them.) The next step is to install
expressjs and create your project scaffolding. We highly recommend using the
[express-generator](http://expressjs.com/en/starter/generator.html) tool. Run
this command to install it:

    $ npm install express-generator -g

Once this is installed, `cd` to the location where you want to create your
project, and run the following command, replacing `<PROJECT_NAME>` with the name
you'd like to give your project:

    $ express --hbs <PROJECT_NAME>

**Remember the `--hbs` argument, which sets the template engine to Handlebars.**

This command will create some folders and populate some basic files to get you
started. Spend a few minutes exploring these files until things make sense.
Here's a partial overview:

- `package.json`: This file, which should be included with every node project,
  contains important project metadata such as the version number and the list of
  dependencies.
- `app.js`: This is the main entry point for the application. It loads the
  required modules, configures the express middleware, and launches the server.
- `/public`: This folder contains static content, such as images, CSS files, and
  (if you need them) Javascript files read by the user's browser.
- `/routes`: This folder contains modules that configure the app's routes in
  express.
- `/views`: This folder contains your handlebars templates.

Recall the MVC pattern that we discussed in class: model, view, controller. It
should be obvious where your "view" files will go. Have you found the controller
code? You should create a folder called `model/` to store your models.

### Running the backend

First, run `npm install` in the project directory to install the dependencies
(you should be getting used to this by now!).

The simplest way to run the server is by typing `npm start`. How does this work?
Look for the "scripts" object inside `package.json` for a hint.

Try this out! Run the server, then try opening up `http://localhost:3000` in
your web browser to connect to it. If everything has been set up correctly, you
should see a message that says "Welcome to Express."

However, there are two problems with running the server this way: file changes,
and debugging.

#### File changes

Naturally, as you work on your project, you'll be making lots of changes to
these files--and in some cases adding and removing files. For a frontend app,
all you have to do is reload the page in the browser (or, with node, rerun the
script) for your changes to take effect. This is a bit harder with servers.
Express will pick up some changes, such as when you update your templates,
dynamically, but it will not pick up changes to your Javascript modules. One
solution is to restart the server every time you make a change, but this is
clumsy and slow.

A better solution is [nodemon](https://github.com/remy/nodemon), which monitors
for changes in realtime and restarts your server automatically every time
something changes. Follow the instructions at [the nodemon
repo](https://github.com/remy/nodemon) to install it. You can run your server
with `nodemon <SCRIPT>`, e.g., `nodemon bin/www`, but simply running `nodemon`
in your project folder should work.

#### Debugging

Debugging ExpressJS can be tricky, but with the right series of commands, you
can use the familiar Chrome Dev Tools to debug your backend. If you're running
without nodemon, this is as simple as using `node-debug`, e.g.,:

    $ node-debug bin/www

Which, as you already know, will print a URL that you can put into your browser
to connect to the debugger. It's a little bit trickier with nodemon. First, run
nodemon with the `--debug` arg, e.g.:

    $ nodemon --debug bin/www

Then, in a separate terminal window or tab, run `node-inspector`. This will
print the URL that you need to plug into the browser, and you should be able to
set breakpoints and debug your express server. Try this now: set a breakpoint in
`app.js` or `routes/index.js` and confirm that you can stop on that breakpoint
in Dev Tools.

One more debugging tip: you can control the amount of debugging output that
appears on the commandline by setting the `DEBUG` environment variable. For
instance, to see all debug output, you could run:

    $ DEBUG=*:* npm start

See [Debugging Express](http://expressjs.com/en/guide/debugging.html) for lots
more on this topic.


## Phase 2: Mongo, Mongoose

### Step 1: Set up Mongo

Now that you've got your server running, the next step is to set up MongoDB.
There are two ways you can do this: using a third party cloud service called
mLab, or by installing and running Mongo locally. We recommend the first option,
for simplicity, and because mLab gives you a visual tool that you can use to
view and work with your data. However, note that it may be slightly faster to
run Mongo locally.

#### Option 1. (recommended): mLab

**Note: There's a more detailed walkthrough of creating an mLab account (with screenshots) in [this morning's warmup exercise](../warmup.md).**

mLab allows you to host Mongo databases in the cloud for free. Sign up for an
account at https://mlab.com/signup/. Check your email and click on the
verification link. Then, once you're back on the mLab site, tap the Create New
button at the top right. Stick with the default settings for Cloud provider.
Under Plan, tap Single-node and choose the free Standard option. Enter a
Database name at the bottom, then tap Create new MongoDB deployment.

Back on the Deployments screen, click on the deployment. You have to create a
user. Click on the link to do so, fill in the fields on the modal form, and hit
Create. Now, make note of the MongoDB URI, which should look something like
this--filling in the username and password that you just created:

    mongodb://<dbuser>:<dbpassword>@ds012231.mlab.com:15934/horizonstarter

You'll need this connection string in just a moment.

#### Option 2. Local install

Follow these steps if you prefer to install Mongo locally. On OS X (assuming
you've already installed [Homebrew](http://brew.sh/)), this should be as easy as
running:

    $ brew update && brew install mongodb

Once Mongo is installed, you should see the following message with instructions
on how to run it:

    To have launchd start mongodb now and restart at login:
      brew services start mongodb
    Or, if you don't want/need a background service you can just run:
      mongod --config /usr/local/etc/mongod.conf

Run the second command to start the server. Note that, every time you restart
your computer, you'll have to run this command again. If you prefer to have
Mongo start automatically every time you start your computer, you can run the
first command instead.

When running locally, you don't need a username or a password. You should use
the following connection string (MongoDB URI) (set `<PROJECTNAME>` to anything
you like, it doesn't matter as long as it's unique):

    mongodb://localhost/<PROJECTNAME>

(You'll find instructions on installing and running Mongo on windows
[here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/).)

### Step 2. Connecting Mongoose to MongoDB

Once Mongo is installed and running, let's try connecting to it inside our
application. Install Mongoose by running:

    $ npm install --save mongoose

Then create a database configuration object (we recommend saving this into its
own JS module, perhaps in a `config/` folder) which looks like this (replace
`<MONGODB_URI>` with the connection string from above):

    dbConfig = {
      'url' : '<MONGODB_URI>'
    };
      
Assuming you haven't changed any of the default Mongo settings, you should be
able to connect to your Mongo server like this:

    var mongoose = require('mongoose');
    mongoose.connect(dbConfig.url);

Add these lines to `app.js` to establish the database connection when the server
launches.


## Phase 3. Data model, schema

The next step is to create [mongoose
schemas and models](http://mongoosejs.com/docs/guide.html) for your app. First,
some basic Mongo terminology:

- a _document_ is any single object stored in the database (like a row in a
  table, or an object instance).
- a _collection_ is a set of objects that share the same schema, i.e., the same
  document structure. Think of these like Javascript classes or tables in other
  databases.
- a _schema_ is a basic document structure. E.g., a "Person" schema might have a
  name, which is a String, and an age, which is a Number.
- a _model_ connects the schema to a specific named collection. It's based on a
  schema and allows you to read and write from and to a specific collection.

To illustrate with a basic example:

```javascript
// Load mongoose
var mongoose = require('mongoose');

// Create a schema
var PersonSchema = new Mongoose.schema({
  name: String,
  age: Number
});

// Create a model based on this schema to be stored in the 'mypeople' collection
var Person = mongoose.model('mypeople', PersonSchema);

// Create a person document in this collection
var somePerson = new Person({name: "Ethan", age: 17});
```

Give some thought to designing the schema for your project. Recall the
[baseball exercise](https://github.com/horizons-school-of-technology/week02/tree/master/day3/2_inline_model):
what schemas (classes) does your project require? What data properties and
methods do these schemas need? The design of the data model is up to you, so go
wild. Mongoose schemas and models are a lot like the data models we've seen and
built over the past couple of weeks. They have properties, and you can attach
methods to them, too. Read the [Mongoose
guide](http://mongoosejs.com/docs/guide.html) for more information. This article
is also helpful: [Mistakes You’re Probably Making With MongooseJS, And How To
Fix Them.](http://blog.mongodb.org/post/52299826008/the-mean-stack-mistakes-youre-probably-making)

You should store your models in individual files inside the `model/` folder. For
instance, the `Person` model above would be stored in `model/person.js`. Include
these model files using `require('model/MODELNAME')` throughout your app as
necessary.

### Testing

Spend some time making sure that your schemas and models are set up properly.
You should try creating some sample documents inside your collection(s), and
make sure that you know how to read them, too. See
[Models](http://mongoosejs.com/docs/models.html) for instructions on creating
and saving documents, and [Queries](http://mongoosejs.com/docs/queries.html) for
instructions on reading documents.

If you're using mLab, this would be a great opportunity to explore its database
explorer. Go to https://mlab.com/home, click on your deployment, then look at
the list of Collections. You can create new collections here (or using the tools
below). As you create and work with data in the app and using the tools below,
you should see the data in this web interface update, and vice versa.

You may decide to write unit tests to test your schemas and models. Here are
some resources that may be helpful:

- [jasmine-node](https://github.com/mhevery/jasmine-node)
- [mocha-mongoose](https://github.com/elliotf/mocha-mongoose)
  ([Mocha](https://mochajs.org/) is another extremely popular Javascript test
  framework)
- [Mongoose testing](http://www.scotchmedia.com/tutorials/express/authentication/1/06)

Other options are using the debugger to try creating and reading documents, or
using the 
[mongo shell](https://docs.mongodb.com/manual/reference/mongo-shell/). See the
list of
[basic shell JavaScript operations](https://docs.mongodb.com/manual/reference/mongo-shell/#basic-shell-javascript-operations)
for a starting point.


## Phase 4. Views

With your data model in place, the next step is to create some views to display
and allow the user to edit the data. You're on your own for this part, too, but
at a bare minimum, you're going to want the following:

- A front page which lists all projects (perhaps with a set of featured projects
  on top, like on Kickstarter)
- A page that lets you view a project, and contribute to that project
- A page that lets you create a new project

How you structure these views--for instance, whether each is its own page, or
whether one page hosts multiple functions in different divs or inside
modals--and whether you need other views is entirely up to you.

Your views should be handlebars templates in `.hbs` files inside the `views/`
project folder.

Go crazy! Feel free to borrow styles from Kickstarter, and make your page look
and feel like that one, or to use entirely different designs.


## Phase 5. Routes

With your views in place, you'll need to configure your routes. The routes link
the application URLs to your views so that e.g., when the user visits
`/newproject`, they'll see the view you created that contains the new project
form. They also contain the controller logic, which receives and acts upon the
data the user submits via these forms: for instance, when the user submits the
new project form, this logic should validate the input, return errors if there
are any, or create the project and report success to the user if not.

Each of your views (created in the previous phase) will need at least one route.
Here's another way to think about routes: each "action" the user can take in the
application--such as "view project" or "create project"--will need a route.

### Form validation

One of the trickier things your route/controller logic needs to handle is form
validation. Form validation is responsible for making sure that the data the
user fills into the form and submits line up with our expectations about those
data: required data aren't missing, data are in the right format (e.g.,
something that's supposed to be a number is actually a number), etc. This helps
keep our data clean, so we don't clutter up the database with junk or display
bad data to the user. Form validation is also responsible for reporting errors
back to the user, and, ideally, for making it clear and easy for the user to fix
the errors and resubmit.

Form validation is a big topic, and it's also a critical component of your
application's UX design (user experience), so it deserves careful attention.
Detailed best practices of form validation are beyond the scope of this
document, but here are a few great blog posts to get you started:

- [The Ultimate UX Design of Form Validation](http://designmodo.com/ux-form-validation/)
- [Form validation best practices: A case study of how to get it right](https://medium.com/@andrew.burton/form-validation-best-practices-8e3bec7d0549)
- [Form validation examples](http://formvalidation.io/examples/)

Finally, here are a few more tips to get you on your way:

- Display errors inline in the form. Wherever possible, display the errors next
  to, or as part of, the input fields themselves, so the user doesn't have to
  hunt for the erroneous field. Bootstrap forms make this easy: see [Validation
  states](http://getbootstrap.com/css/#forms-control-validation).
- Use clear, specific error messages that make the required user action clear,
  rather than generic error messages. "A valid email address is required" is a
  much more helpful error message than "an error has occurred."
- Don't force the user to input data twice. If they input data, and there's an
  error, pre-populate the fields they already filled out when you redisplay the
  form.
- An npm module such as
  [express-validator](https://github.com/ctavan/express-validator) can help a
  lot.
- Don't confuse form validation with [Mongoose
  validation](http://mongoosejs.com/docs/validation.html), which happens at the
  database level (i.e., inside the mongoose library, not in your code). You
  should do that too as a second line of defense against bad data entering
  your database, but they're two completely different things.
- Don't confuse backend form validation with frontend form validation. The
  former happens _after_ a form is submitted, inside express, and displaying
  errors requires rerendering forms. The latter happens inside the user's
  browser _before_ the form is submitted. You should do both, if possible--you
  may find [jQuery Validation](https://jqueryvalidation.org/) helpful for
  frontend validation--but only backend validation is required for this project.

### Error handling

You will inevitably encounter errors, such as when the user form input doesn't
validate. Think about how to present these errors to the user. You can no longer
rely on `console.log` or `console.error` to present errors to the user, since
your script is only running on the backend and the user won't see the console
(of course you may continue to use these functions for debugging).

When possible, errors should be presented to the user inline. They should not
take the user away from the main app flow, and they should not cause data the
user has entered to disappear. Make use of Bootstrap components such as alerts
for this purpose.


## A little extra guidance

If you're feeling a little lost, check out the [Horizon Starter
Playbook](./playbook.md). You'll find a few more tips and some additional
guidance there.


## BONUS challenges

Everyone should aim to get through the MVP features (everything up to this
point). If you do, pat yourself on the back because YOU'RE AWESOME! 💪💪🤘

If you've gotten this far--starting on the challenge--we will be super
impressed.

And if you FINISH today's bonus, we will buy you dinner. For reals. (Ethan might
tag along. He's looking a little undernourished. Hope that's cool.)

### Adding users

Let's add the following functionality:

- Every project has an owner.
- A user can donate to any project as long as they are not that project's owner
  (i.e., the creator of that project).
- Users can login and logout.
- A user must login to create a project or make a donation.
- A personal admin page that lets a user see all the projects she has created,
  how much each of her projects has raised, and a list of which projects she has
  donated to.

To do this you must, roughly: 

- Create user model with one property for a username
- Create a login page
	- `GET /login` renders an HTML page with 1 input field asking for a username
  - `POST /login` creates and saves a user object (unless it already exists). It
    then sets a username cookie with the user's username. 
- Create a logout button (if there is an existing cookie, delete it). `GET
  /logout` should just remove the `"username"` cookie and redirect to the `GET
  /login` page. 
- Make sure that `GET projects/new` route only renders a form if there is a
  `"username"` cookie
- `GET projects/:id` should only show a donate button if the username cookie !==
  the owner of the Project :)
- Add an `owner` property to the Project model. This will store the id of the
  User that created the project
- To keep track of the which projects a user has donated to:
  - Add a Donations array to the User model. This should store id's of Projects
    the User has donated to
  - Edit the `/donate/:id` route to update the Donations array whenever a user
    donates
- Create an admin page for a user at `GET /admin`. Note there is no `/:id` on
  this route. Instead, the admin page looks at the username cookie to find the
  user we care about. 
  - Show each project the user owns
  - How much each project has in donations 
  - Which projects a user donated to
  - Which users donated to each of the user's projects


## Troubleshooting

- If you see this error when you try to run your server:

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
    
  It means that mongodb isn't running. See the instructions in the [Mongo
  section](#phase-2-mongo-mongoose), above, to install and launch mongo.

## If you are bored...

Just in case you're feeling ambitious, implement the following additional
functionality from Kickstarter: 

- Add images, videos, and rewards to projects, if you haven't already.
- Alert users (by email, or by SMS, using Twilio) when their project, or a
  project they've contributed to, reaches its fundraising goal.
- Frontend validation: check form input when the user hits submit, before
  sending it to the backend. You may find a library such as [jQuery
  Validation](https://jqueryvalidation.org/) useful for this, in combination
  with Bootstrap [Validation
  states](http://getbootstrap.com/css/#forms-control-validation).
- Add some AJAX endpoints so that some features of the app, such as adding a
  contribution to a project, happen without leaving the page. Congrats, you've
  now got a hybrid frontend-backend app, which is how most complex modern apps
  are designed. (We'll cover this in more detail tomorrow.)
- Add some more Kickstarter-style features: users, featured projects, favorites
  (stars), project updates, etc.
- Add unit tests: for your schemas and models, for form validation, etc.

