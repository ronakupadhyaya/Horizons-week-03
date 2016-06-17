# Hybrid web app: adding AJAX to Horizon Starter

## Contents

- [Introduction](#introduction)
- [Phase 1: Creating an API](#phase-1-creating-an-api)
- [Phase 2: API routes and responses](#phase-2-api-routes-and-responses)
- [Phase 3. Tying in the frontend: project
  contributions](#phase-3-tying-in-the-frontend-project-contributions)
- [Phase 4. Validation, error handling](#phase-4-validation-error-handling)
- [Phase 5. Polling](#phase-5-polling)
- [Phase 6. Adding filters](#phase-6-adding-filters)
- [Bonus](#bonus)

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
- The ability to filter the list of projects on the front page using query
  parameters via AJAX:
  - Filter by projects that are fully funded (query string: `?funded=true`)
  - Filter by projects looking to raise over a certain amount of money (e.g. the
    query string `?goalAbove=10000` should return all projects seeking
    to raise over $10k)

### Solution

You can check out a [live, hosted version of the
solution](http://starter.horizonsbootcamp.com:8092/). You can also run the
solution code locally (as yesterday, you'll need to make sure Mongo is
configured--instructions
[here](../../day4/horizonstarter/README.md#phase-2-mongo-mongoose)--and you may
need to update the MongoDB URI in `config/db.js`). Then you can run:

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

### Hybrid apps

Take a moment to remind yourself what these two terms mean. Backend apps are
rendered on a server using a framework such as express and a templating system
such as handlebars, sending pre-rendered HTML and CSS to a user's browser.
Frontend apps run, as Javascript, inside a user's browser and often exchange
data with a backend using AJAX.

Well, these two concepts aren't mutually exclusive, are they? Here's the key
insight: we can send pre-rendered HTML and CSS to a user's browser _along with
Javascript that runs in the browser._ That Javascript can do all sorts of funky
stuff such as sending and receiving data using AJAX, like we saw last week.

You could add that Javascript directly to the `.hbs` template files, just like
you've been adding HTML and CSS, but it would be better to keep it separate in a
set of `.js` files. Then you can include these with `<script src=...></script>`
tags in the template, which will cause the user's browser to download and run
the referenced script. See if you can figure out where to store these new
_frontend_ Javascript files in your app, then go ahead and create one and add it
to the template. Try to do something simple as a test, such as `console.log` or
`alert`. Reload the page and _voila!_ you should see your _frontend_ Javascript
code running inside your _backend_ rendered web app. If that's not a mindfark I
don't know what is!

### Rerendering

So you know how to add Javascript to the page--so what? What does it actually
need to do? How do you upload new data such as a new project contribution, how
do you download data such as the list of project contributions, and how do you
display this data to the user?

This part is up to you. You already know how to GET and POST data using AJAX.
Think about how to use the frontend tools you already learned--AJAX, events,
jQuery, etc.--to perfect the data flow. This is where it all comes together. You
need to update what the user sees, the data that was originally rendered on the
backend, when you receive new data from the user or from AJAX. Think back to the
`render` and `mount` functions we wrote for the Horello projects.

Start by building out the first piece of new, AJAX-driven functionality: project
contributions.

One more hint, as you're replacing your existing backend-driven form. Don't
forget `event.preventDefault()`!


## Phase 4. Validation, error handling

At this point, you should have successfully added Javascript to the frontend and
you should have connected it to the "contribute to project" form on the project
page via events and AJAX. The next challenge is form validation and error
handling on the frontend.

### Validation

This topic was covered in more detail in [yesterday's project
notes](../../day4/horizonstarter#form-validation), but today we need to do
validation on the frontend. Think about how you want to alert the user when they
input bad data, or when they neglect to fill in a required piece of data. You
may find the following two resources especially useful:

- [Bootstrap form validation states](http://getbootstrap.com/css/#forms-control-validation)
- [jQuery validation](https://jqueryvalidation.org/)

### Error handling

We also need to consider what happens when we receive an error from the backend.
How do we surface this error to the user? How do we give them a hint about how
to fix the error?

Validation and error handling go hand-in-hand: if we fully validate all input,
we should be able to avoid nearly all errors on the backend; on the contrary, if
we're not thorough about our validation on the frontend, we'll get errors from
the backend (e.g., if we make an AJAX call even though a required piece of data
is missing) and we'll need to alert the user either way. As a recap, remember
that validation happens in different stages, and that each has a role:

1. Frontend validation: _before the AJAX call_
1. Backend validation: _after the AJAX call, before hitting the database_
1. Database validation: _from the database, if data doesn't match the schema_


## Phase 5. Polling

Now that you've got the contributions form and functionality working via AJAX,
let's move on to something a little bit harder: automatically refreshing the
contributions data to display new contributions (from other users) in real
time*.

The easiest way to do this is by having an AJAX call that fires periodically
using `setInterval` (every 5-10 seconds would be a reasonable interval). It
should be pretty straightforward to add this on top of the functionality you've
already built. Once it's working, try opening your app in two browser tabs: add
a contribution/comment in one, and watch it appear in the other!

*: Technically, if you're polling, then updates are in _quasi_ real time rather
than true real time. See the bonus, below, for making these happen in real real
time.


## Phase 6. Adding filters

The final and most interesting aspect of this project is adding the filters to
the project list on the front page. To recap, we need to add:

- The ability to filter the list of projects on the front page using query
  parameters via AJAX:
  - Filter by projects that are fully funded (query string: `?funded=true`)
  - Filter by projects looking to raise over a certain amount of money (e.g. the
    query string `?goalAbove=10000` should return all projects seeking
    to raise over $10k)

Think about the following considerations:

- Which API endpoints will you need? (If you haven't already built them)
- What UI elements do you need to add to the frontend?
- How do you refresh the data using AJAX?
- How do you redisplay the updated data to the user on the frontend?


## Bonus

If you need more of a challenge in this project, add the following:

- More project filters, e.g.:
  - Filter by user
  - Filter by category
- Search by project title or description
- Allow multiple filters to be combined
- Allow projects to be sorted:
  - Sort by user
  - Sort by funding level (both absolute dollars and funding percent)
  - Alphabetic sort
  - Chronological sort
  - Display projects in the order in which they expire, soonest expiration first
- Use web sockets for truly realtime polling (http://socket.io/)

If you've made it this far, you're an absolute rockstar. Join the secret Slack
channel `#AbhiIsAnAnimal` to claim your reward.
