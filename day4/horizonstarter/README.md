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

## Tips

First, some general tips to get you started.

## Phase 1: Getting started
### Express.js project scaffolding

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

Remember the `--hbs` argument, which sets the template engine to Handlebars.

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
code? You should create a folder called `model` to store your models.

### Running the backend

The simplest way to run the server is by typing `npm start` in the project
folder. How does this work? Look for the "scripts" object inside `package.json`
for a hint.

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

Debugging ExpressJS can be tricky.

- debugging expressjs
- form validation: https://github.com/ctavan/express-validator
- nodemon

## Phase 2: Mongo, Mongoose

- Install
- Require modules

## Data model, schema

- Create schema
- Create sample data (how?) - can be done from commandline, not as
easy as it could be
 - This is helpful: https://docs.mongodb.com/manual/reference/mongo-shell/#basic-shell-javascript-operations
- Wire up to a view

## Views

- Front page (list all projects)
- Create new project form
- Contribute form
- Nodemon

## Routes

## Phase 4: Templating

## Phase 5: Form validation

## (BONUS) Phase X

- frontend form validation

## Troubleshooting

    Error: connect ECONNREFUSED 127.0.0.1:27017
    
This means you don't have mongodb running.
