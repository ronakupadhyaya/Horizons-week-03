# Hybrid web app: adding AJAX to Horizon Starter



## Introduction

*Can take from old description of exercise for here*

1. Ajax lets connect without page refresh

2. How server rendering is slow, `res.render`

3. Whats the difference with SPAs `res.json()` -> Data + AJAX

4. Hybrid-> some rendered by server, soome updated on ylient by ajax.


**JS on the client VS JS on the server.**



### The goal

Our goal is to improve the Horizon Starter app that was written in the previous exercise. Yesterday, we implemented the project using server-side rendering with handlebars.js. Today, we are going to use AJAX to make your app feel faster, and implement real time!

Here are the features we're going to implement:

- AJAX contributions: You no longer will need to refresh the page to see your contribution in the page. 
- Handling errors when doing AJAX.
- Filtering and sorting lists of products, without refreshing the page. 
- AJAX polling: The total amount of contributions is continuously updating. If someone else makes a contribution, you will see it too!


## Getting oriented

Yesteday's project horizon starter was a server-side rendered app. Today, we are going to add client side rendering. When we talk about rendering, we are simply talking about generating HTML from data. Server rendered apps **Render HTML** once, hybrids render twice. See below for an overview of both approaches:

**Server rendered app**: Horizon Starter

1. user: Visits `localhost:3000/projects`
2. server: matches route on `routes.js`
3. server: loads data for `projects` from `mongoose`
4. server: gets template + fills in data for projects to create an HTML file. **Rendering HTML**
5. client: displays html file. 

**Hybrid app**: Today's approach!

1. user: Visits `localhost:3000/projects`

2. server: matches route on `routes.js`

3. server: loads data for `projects` from `mongoose`

4. server: gets template + fills in data for projects to create an `html` file  **Rendering HTML**

5. client: displays html file. 

6. client: user clicks on the `sort: ascending button`

7. client: sends an ajax request to `/api/projects?sortDirection=ascending`

8. server: matches the route for  `/api/projects`

9. server: loads data from mongoose for projects, sends data back to client as JSON. 

10. client: gets data as JSON, converts it into html, displays it on page **Rendering HTML**

   ​



## Exercise 1: Ajax contributions

1.    Create a new endpoint route in your routes file: `week03/day3/horizonstarter/routes.js`. The new route should be: `POST /api/project/:projectId/contribution` 

      - When posting to our new route, search the database for the project with the correct `projectId`. Return an error if no such project is found.

      - Once you have the project:

        - Build a contribution object from 2 elements on the request body: `name` and `amount`
        - Push the object to the project's contribution array: `project.contributions`
        - `.save()` the `project`, if save is successful respond using `res.json()` with the contribution object

        **Testing**: 

        Start your server and visit `localhost:3000` on your browser. Create a new project and fill the information. Save it and visit that project's page. Copy the project's id from the url. Now open up Postman and do a POST request to `localhost:3000/api/project/YOUR_PROJECT_ID_HERE/contribution` with a body containing:

        ```
        {
        	"name": "RandomInvestor",
            "amount": 1000
        }
        ```

        Visit mlab.com, find the project with the id you contributed to and check the contributions array. Your new contribution should be there. 

        If you get back the same object, you are good to go!

        ​

2.    Make an AJAX request from the browser to the new endpoint.

      Now, we want to send the contribution data to the `localhost:3000/api/project/YOUR_PROJECT_ID_HERE/contribution` endpoint via ajax. You have to setup a couple of things before being able to perform an AJAX request. 

      1. Create a file on your `public/js` folder called `contributions.js`

      2. Add a script tag to your `project.hbs` that looks like this `<script src="/js/contributions.js">` which loads the new file you created at `public/js/contibutions.js`. 

      3. Open your `project.hbs` file and remove the `<input type="submit">` from the form, and add a `<button>` instead
      4. Open `contributions.js`  and add a `click` event listener for the button we just created. Remember that event handlers can only be added when the document is ready! On your event handler, call  `sendContribution();` whenever someone clicks the button. 
      5. Define the  `sendContribution();` function. Inside this function, you have to code the AJAX `POST /api/project/:projectId/contribution` request. Follow this steps:
         1. Get the data from the form using jQuery. 

         2. Create a new contribution object from the data.

              ```  
               var newContribution = {
               	name: // value you get from the form.
               	amount: // value you get from the form. 
               };
              ```

         3. Send the data via `$.ajax()` POST to the endpoint you created on the previous step.

         4. Define  `showFlashMessage()` that inserts a notification message somewhere near the top of the page. [Check out the bootstrap documentation on notifications.](http://www.w3schools.com/bootstrap/bootstrap_alerts.asp) A 'danger' message is red, while the 'success' one is green.

         5. If the request was succesful:

            1. Clear the contribution form input elements.
            2. Call `showFlashMessage("Thanks for your contribution! You rock!", 'success');` to display a success message on the screen! 
            3. If the request was not succesful call `showFlashMessage("An error ocurred", 'danger');`

      **Testing**: to check your code works up to this point, visit `localhost:3000` on your browser, click on any project. Fill in the form and add a contribution! You should get a green message if there were no errors. You will **not**  be able to see the new contribution on your page right away. But if you refresh the page,  the new contribution will appear.

3.    Use JQuery to update the page after adding a contribution. 

      Up to this point, you have to refresh the page you add a contribution. This is because the AJAX request is POSTing and saving the contribution to the database, but it is not rendering to the page, yet.


      1. Define a new `renderNewContribution(newContribution)` function. It takes the`newContribution` object, which contains all the data for the newly created contribution. Create the html to show the contribution and put it in a variable called `contributionHTML`. `$.append()` `contributionHTML` to the list of contributions.
      2. Update the AJAX success handler from the previous step to call `renderNewContribution(newContribution);` 

4.    Validate contributions are greater than 0.

      You should be familiar by now to server-side validations. If someone contributes a value less than 0, the server should return an error.


      1. Modify the route we created on step one to validate the request.  It should validate for non-numeric and negative values.
      2. If there is an error, respond with  `res.status(400).json(err);` note that `err` is an object you get from the validator. It contains data for that error! Send the error to the client. 
      3. Modify the `sendContribution` function on `contributions.js`. On the error callback, instead of calling `showFlashMessage("An error ocurred", 'danger');`, with "An error ocurred", send the appropriate message that you got from the server.




## Exercise 2: Ajax filter projects

In this exercise, we are going to implement project filtering in `index.hbs` via AJAX. We want the user to be able to filter projects by status: "Fully funded", "Not fully funded" and "show all".



**1. Defining the route **


1. Create a new endpoint route in `horizonstarter/routes.js` to `GET /api/project` 

2. This route is similar to the `GET /project` you did yesterday. The only difference is that instead of rendering, it returns all the posts as JSON with `res.json(posts)`. You should:

   1. Define the route. `GET /api/project` . 
   2. Query the database to get all the projects. 
   3. Get the `funded` param from the URL by doing `req.query.funded`. Our API can be called in 3 different ways:
      - To get only funded projects `GET /api/project?funded=true`  
      - To get only non-fully funded projects `GET /api/project?funded=false`
      - To get all projects `GET /api/project`
   4. Filter the array of projects you get back according to funded param. To do this, iterate over `projects`. To see if a project is fully funded, go over the contributions, adding them up to check if they are greater or equal to the required amount. 
   5. Send the filtered results back as json  `res.json()`

   ​

   **Testing**: 

   Visit `localhost:3000` and create a couple of projects. Make sure to leave a couple of them unfunded, and make contributions on some others so they become fully funded. 

   Start your server and open Postman perform the following requests:	

   1. `GET localhost:3000/api/project`. You should get all the projects back.
   2. `GET localhost:3000/api/project?funded=true`. You should only get funded projects.
   3. `GET localhost:3000/api/project?funded=false` You should only get unfunded projects.


​	

**2. Making the request **

This is similar to yesterday's filter projects by funded or not funded. The difference is that, instead of adding links to pages by linking to `localhost:3000/api/project?funded=false`, you will make buttons that will filter the projects, without refreshing the page. 

1.  Add 3 buttons to your `index.hbs` template. They should be: "Funded", "Not completely funded" and "show all".

2.  Create a file on your `public/js` folder called `projects.js`

3.  Add a script tag to your `index.hbs` to import the file you created `public/js/index.js`. 

4.  Open  `public/js/index.js` file and add `click` event listeners for the 3 buttons we just created. When each button is clicked:

    1.  Make an AJAX request to `GET /api/project` . Remember to send the correct params. For example: If the "funded" button was clicked, perform the following request `GET localhost:3000/api/project?funded=true` . `console.log` your posts on the success callback of the AJAX request to make sure you are getting the correct posts.

**Testing**: To test this request:

1. Add a `console.log(req.query)` to `GET /api/project`
2. Visit `localhost:3000`  and check your terminal (i.e. node console). It should print a blank object. 
3. Visit `localhost:3000` click on the "Funded" button and check your terminal (i.e. node console). It should print an object containing  `funded: true`
4. Visit `localhost:3000` click on the "Not Funded" button and check terminal (i.e. node console).  It should print an object containing  `funded: false`

**3. Rendering the results**

You are going to use JQuery to update the page after filtering results.

1. If the AJAX request to `GET /api/project`  was succesful, clear the projects div and turn each project into HTML and append them to the projects div.

2. If the AJAX request `GET /api/project`  failed, display an error banner using bootstrap.  


**Testing**: to check your code works up to this point, visit `localhost:3000` on your browser. On the homepage click on all three buttons, they should filter the projects accordingly. 




## Exercise 3: ajax sort projects

On this last exercise, we are going to implement project sorting. We want to sort by "percentage funded" and "amount funded". This step is very similar to **Exercise 2**. We will reuse a great amount of code of the last one, only modifying it to be able to sort the projects when presenting them. 



**1. Defining the route **

The `GET localhost:3000/api/project` route is already defined on the last step.

1.   Modify it to get 2 new parameters: 

     a. `sort` that could take in the values "percentageFunded", "amountFunded" or not be present.

     b. `sortDirection` that could take in the values "ascending", "descending" and no value, to which we will asume no sorting is required. 

     * This means our URL can now take in up to 3 optional arguments. The most basic request would look like this `localhost:3000/api/project`. But we should be able to query these:
       * `localhost:3000/api/project?funded=true`
       * `localhost:3000/api/project?funded=true&sort=amountFunded` which should default to ascending order. 
       * `localhost:3000/api/project?funded=false&sort=amountFunded&sortDirection=descending`
       * And all other possible combinations of these params. Note that `sortDirection` should only be applied when `sort` is present. Otherwise there is no field to `sort`. 

2.   To be able to hadle this, you need to add a new step in your route logic. In **Exercise 2** we filtered posts based on being "Fully funded" or "Not Fully Funded". Now, you have to add new functionality to change the ordering of projects:

     - You need to sort projects **after** you have filtered them, but **before** sending them back
     - Only sort your projects if there is a `sort` parameter. 
     - If there is a `sort` parameter and no `order` , user ascending (i.e. increasing) sort.

3.   Send back the data of the filtered & sorted posts back by doing `res.json(posts)`

     **Testing**: Start your server and open Postman perform the following requests:	


     1. `GET localhost:3000/api/project`. You should get all the projects back.
     2. `GET localhost:3000/api/project?funded=true&sort=amountFunded`. You should only get funded projects, sorted by how funded they are, ascending.
     3. `GET localhost:3000/api/project?funded=false&sort=percentageFunded&order=descending` You should only get unfunded projects, sorted by their percentage of funding, descending.

**2. Making the request **

Now, we have connect our new route to the page.

1. Edit `views/index.hbs`  and add two dropdowns:

   1. Sort By, that should contain two options:  "Percentage Funded", "Amount Funded"
   2. Order, that sould contain two options: "Ascending", "Descending" 

2. Add a button called "Sort" after the dropdowns. 

3. Add an event listener for this button. On the listener, perfom an AJAX GET request to `GET /api/projects`, sending the correct parameters `order` and `sortBy` by getting them from the dropdowns.

**Testing**: To test this request:

 1. Add a `console.log(req.query)` to the route `GET /api/projects`
 2. Visit `localhost:3000`  and check your node console. It should print a blank object. 
 3. Visit `localhost:3000` select "Percentage Funded" from your sortBy dropdown and click sort.  Check your node console. It should print an object containing  `SortBy: "percentageFunded"`
 4. Visit `localhost:3000` select "Amount Funded" from your sortBy dropdown, select "Descending" from your orderBy dropdown and click sort.  Check your node console. It should print an object containing   `SortBy: "amoutFunded", order: "descending"`

   

**3. Rendering the results**

Use JQuery to update the page after sorting. Edit the callbacks on your AJAX request. 

1. If the request was succesful, clear the projects div and render the posts you got back from the request onto the page.
2. If the request failed, display an error banner using bootstrap.  

**Testing**: to check your code works up to this point, visit `localhost:3000` on your browser. On the homepage select different options from the dropdowns. Click on sort. They should filter and sort the projects accordingly onscreen.



## Bonus: Exercise 4

1. Polling contributions -> Contribute on a new tab and everything updates.

####  













## OLD STUFF

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


Build on top of your Horizon Starter code from yesterday.

If you want a clean slate, you may also start with the
[solution code](../../day4/horizonstarter/solution) from yesterday. We don't
recommend that.


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

### Express configuration

We need a new set of routes for our AJAX API.

1. Create a new file in `routes/api.js`. Similar to `routes/index.js` this
   file should declare a `Router` at the top and return it via `module.exports`
   at the bottom.

​```javascript
  var express = require('express');
  var router = express.Router();

  // Your routes here

  module.exports = router;
```

1. Add the routes from `routes/api.js` to your Express app in `app.js`.

​```javascript
  app.use('/', routes); // this was here before
  // Adding routes from your new router to your app!
  // Note how we use /api as the prefix!
  app.use('/api', require('./routes/api'));
```
1. Now when I add a route in `routes/api.js` I don't need to type `/api` again.
   In `app.js`, we added the prefix `/api` to ALL of the routes in
   `routes/api.js`!

```javascript
  // This route shows up as /api
  router.get('/', function(req, res) {
    res.json({
      "you are in": "/api"
    });
  });

  // This route shows up as /api/hello
  // This is because in app.js, we added the prefix /api to ALL of the routes in
  // routes/api.js.
  router.get('/hello', function(req, res) {
    res.json({
      "you are in": "/api/hello"
    });
  });
```

## Advanced Express Configuration (Optional)

Because express is so versatile, there are multiple ways to define sets of
routes. Since we want to use a different set of middleware, and since
our AJAX API and routes are entirely distinct from our previous routes, it
may make sense to create a _new express app_ and mount it under the
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
// 201 means: Success, I've created something!
// Useful for indicating that a POST request was successful.
res.status(201).json({status: "ok"});

// Return the GET request data.
// status(200) is implied, we're just being explicit here.
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
2. Backend validation: _after the AJAX call, before hitting the database_
3. Database validation: _from the database, if data doesn't match the schema_


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
