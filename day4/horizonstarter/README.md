# Server-side app: Horizon Starter

## Contents

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
- do not require running Javascript in the user's browser (but they might--we'll
  see this soon)
- do not require using an API to communicate with the backend (since they're
  running on the backend!)
- are faster to load, but are often less responsive since many user actions
  require sending data to the server and waiting for a response

Note that many of these rules are flexible, and many apps use a hybrid approach
that includes benefits of both frontend and backend apps. We'll explore this
topic more over the coming days. But we'll start today by writing a purely
backend web app.

Your goal is to write the Horizon Starter app (a clone of Kickstarter) as a
purely backend webapp. You're starting from scratch and it's up to you to design
and layout the project as you see fit, but we'll walk you through the steps and
provide suggestions.

## The stack

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

Now that you've got your server running, the next step is to install and set up
your database server, MongoDB, and the ORM tool, Mongoose. On OS X (assuming
you've already installed [Homebrew](http://brew.sh/)), this should be as easy as
running:

    $ brew update && brew install mongodb

Once Mongo is installed, you should see the following message with instructions
on how to run it:

    To have launchd start mongodb now and restart at login:
      brew services start mongodb
    Or, if you don't want/need a background service you can just run:
      mongod --config /usr/local/etc/mongod.conf

(You'll find instructions on installing and running Mongo on windows
[here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/).)

Once Mongo is installed and running, let's try connecting to it inside our
application. Install Mongoose by running:

    $ npm install --save mongoose

Then create a database configuration object (we recommend saving this into its
own JS module, perhaps in a `config/` folder) which looks like this (replace
`<PROJECTNAME>` with the name of your project--actually any name will do here,
this is the name of the Mongo database that you're using for this project):

    dbConfig = {
      'url' : 'mongodb://localhost/<PROJECTNAME>'
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
var mongoose = require('mongoose');

// Create a schema
var PersonSchema = new Mongoose.schema({
  name: String,
  age: Number
});

// Create a model based on this schema and the 'mypeople' collection
var Person = mongoose.model('mypeople', PersonSchema);

// Create a person document
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
Fix Them](http://blog.mongodb.org/post/52299826008/the-mean-stack-mistakes-youre-probably-making)

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

One option is to use the debugger to try creating and reading documents. Another
option is the
[mongo shell](https://docs.mongodb.com/manual/reference/mongo-shell/). See the
list of
[basic shell JavaScript operations](https://docs.mongodb.com/manual/reference/mongo-shell/#basic-shell-javascript-operations)
for a starting point.


## Phase 4. Views

With your data model in place, the next step is to create some views to display
and allow the user to edit the data. At a bare minimum, you're going to want the
following:

- A front page which lists all projects (perhaps with a set of featured projects
  on top, like on Kickstarter)
- A page that lets you view a project, and contribute to that project
- A page that lets you create a new project

How you structure these views--for instance, whether each is its own page, or
whether one page hosts multiple functions in different divs or inside
modals--and whether you need other views is entirely up to you.

Your views should be handlebars templates in `.hbs` files inside the `views/`
project folder.


## Phase 5. Routes


## Phase 6: Form validation

- form validation: https://github.com/ctavan/express-validator
## (BONUS) Phase 7

- frontend form validation
- AJAX?
- add more features from kickstarter e.g. featured project page

## Troubleshooting

    Error: connect ECONNREFUSED 127.0.0.1:27017
    
This means you don't have mongodb running.
