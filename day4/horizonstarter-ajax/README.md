# Hybrid web app: adding AJAX to Horizon Starter



## Introduction

You are going to start this project on top of the files you built yesterday for HorizonStarter. You will add new AJAX functionality on top of the old project. It is okay if you didn't finish all the exercises, but you **should** be able to see projects the projects page, click on one and make a contribution to a project on your HorizonStarter before this exercise. 

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



## Bonus: 

### 1. Polling Contributions

Now that you've got the contributions form and functionality working via AJAX, let's refresh the contribution data automatically to display new contributions (from other users) in real time.

The easiest way to do this is by having an AJAX call that fires every 5 seconds using `setInterval`. If there is new data for contributions, clear the div and add the new data. To test this:

	1. Open the same project in two browser tabs. 
	2. Add a contribution in one tab
	3. Switch to the other tab, it should appear after 5 seconds!

#### 2. Search by project title or description 

Add a search bar on your home 


