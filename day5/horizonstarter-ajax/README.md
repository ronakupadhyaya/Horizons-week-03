# Hybrid web app: adding AJAX to Horizon Starter

## Contents

- [Introduction](#introduction)
- [Phase 1: Getting started](#phase-1-getting-started)

## Introduction

Yesterday you had the opportunity to build a web application which runs solely
on the backend. Of course, by now you've also had plenty of experience building
frontend web apps as well.

In the real world, things are not so black and white. As [the first Horizon
Starter project](../../day4/horizonstarter) discussed, there are upsides and
downsides to each of frontend and backend web apps. Lots of mature, real world
web apps (think Facebook or Google) take a hybrid approach: certain elements are
rendered on the backend, while other elements are interactive, allowing the user
to send and receive data to and from the backend via AJAX, as you saw last week.

Today, you're going to add some AJAX calls to Horizon Starter to make it more
responsive, interactive, and hipster. You'll be implementing the following:

- Project contributions happen via AJAX--no need to reload the page
- Project contributions are loaded in realtime, so that if someone else adds
  one, you'll see it appear on your screen right away
- Filtering the project list on the home page happens via AJAX

### Solution

You can check out a [live, hosted version of the
solution](http://starter.horizonsbootcamp.com:8090/). You can also run the
solution code locally (as yesterday, you'll need to make sure Mongo is
configured--instructions
[here](../../day4/README.md#phase-2-mongo-mongoose)--and you may need to update
the MongoDB URI in `config/db.js`. Then you can run:

```
$ cd solution/
$ npm install
$ npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) in your browser
to see it. Note that only the most basic styling has been applied to the
solution: your app should be a heckuvalot prettier!

### Getting started

You should be building on top of your Horizon Starter code from yesterday. You
may also start with the [solution code](../../day4/horizonstarter/solution) from
that project if you prefer.


## Phase 1. Creating an API

### Frontend vs. backend

The first step to add AJAX functionality to your app is to define the API
endpoints that the AJAX calls will talk to. Recall when you consumed API data
from Twilio and Trello. Now it's your turn to build the backend of an API!
Express is very versatile, and we can use it to build an API backend as well as
(and in addition to) the sort of backend web app you built yesterday.

Our API endpoints will be set up in the same way as our web app's views were,
with a few key differences. Remember that the consumer of an API is not a user
interacting with a web browser, but rather, AJAX calls coming from within
another application! Here are some key differences:

- AJAX endpoints don't return HTML! That means we don't need Handlebars
  templates. Instead, they return JSON data.
- We still have to validate the data, but we report errors very differently. Our
  API should return different HTTP status codes to indicate success or failure.
- We don't need the same set of express middleware as our HTML-based routes: we
  don't need things such as handlebars, cookies, or sessions (if you chose to
  use these).

### Express configuation

Because express is so versatile, there are multiple ways to define sets of
routes. We could define the routes for our AJAX API using `express.Router` like
we did yesterday. Since we want to use a different set of middleware, and since
our AJAX API and routes are entirely distinct from our previous routes, it
probably makes sense to create a _new express app_ and mount it under the
existing app in a particular place--say, `/api` (or `/api/1` if we want to
follow best practice and allow for multiple versions of our API in future).
Don't be confused by the use of the word "app" here: what express refers to as
an "app" is just a particular express configuration with middleware and a set of
routes.

You probably want to put your new express app in a new file (a new JS module).
You can load that module and mount it into the existing app like this:

```javascript
var newapp = require(PATH_TO_NEWAPP_MODULE);
app.use('/api/1/', newapp);
```

The new app module should start with a similar express configuration to the
existing app--minus the template engine and the other unnecessary middleware,
e.g.:

```javascript
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

## Phase 2. API routes and responses

Take a moment to map out the API endpoints (a.k.a. routes--the terms are
interchangeable) you'll need for the new functionality. As a rule of thumb, the
more time you spend planning things--on paper--_before you begin coding_--the
less mistakes you'll make and the less headaches you'll encounter.

You should set up your AJAX API endpoints the same way you did before, using
`app.get`, `app.post`, etc. As mentioned, your AJAX endpoints should return HTTP
status codes and JSON data. You can construct responses such as the following:

```javascript
// Indicate that a POST request was successful.
res.status(201).json({status: "ok"});

// Return the GET request data.
res.status(200).json(data);

// Indicate that the requested object doesn't exist.
res.status(404).json({status: "missing"});
```

You can quickly find a full list of HTTP status codes with a Google search.

Try setting up some API endpoints, such as one that returns the full list of
projects. Then test them--by calling them from your browser, by using jQuery
`$.ajax()`, or from Postman. See the [Horello AJAX project
README](https://github.com/horizons-school-of-technology/week02/tree/master/day4/2_horello-ajax#phase-2-getting-familiar-with-the-api)
for a recap of how to do this.

Once your endpoints are in place, move on to the next phase, where you'll begin
using them from the frontend.

## Phase 3. Tying in the frontend: project contributions

This is the magic moment of this project. You've seen frontend apps and you've
seen backend apps, but _you ain't seen nuthin' yet, cowboy!_ Because you ain't
never seen an app that's both.

How can an app be both a frontend app and a backend app at the same time?

Take a moment to remind yourself 

How to add a frontend script, test it
Rerendering

## Phase 4. Validation, error handling

Bootstrap validation states

## Phase 5. Polling

## Phase 6. Adding filters

## Bonus

Add more filters
Use sockets for polling

