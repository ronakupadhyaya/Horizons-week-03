Okay, so now your are all setup! 

Below is a playbook for you to follow to walk you through building kickstarter and help you prioritize which features you build and give you guidance on how you build them! 

Everyone should seek to get through Step 1. If you do, pat yourself on the back!

Getting through Step 2 means you are truly crushing it, but if you don't get through it all, don't worry! Read through the steps and think about what parts seem doable / seem impossible! 

## Step 1: Kickstarter with no users 

In step 1, we will build kickstarter without any users. This would kind of suck, but it's a great starting point and introduction to databases. Here are the features you will implement: 

- A front page which lists all projects (perhaps with a set of featured projects
  on top, like on Kickstarter)
- A page that lets you view a project, and donate to that project
- A page that lets you create a new project
- The ability to filter the list of projects on front page using query parameters. Create the ability to filter the page by projects that are fully funded (`/projects?funded=true`) and projects looking to raise over a certain amount of money (`/projects?goal_greater_than=10000` should return all projects )
- A page that let's you bulk edit projects


This means that you will need the following: 
- A project Model (`/model/project`) with the following properties. Make sure to 
	- Title: String
	- Goal: Number // Amount this project seeks to raise
	- Raised: number
	- Category: Enum
    - Description: String  
    - Start Date: Date
    - End Date: Date
- Routes for the following
	- `GET /projects` should render an HTML page (`/views/project.hbs`) with all projects & their titles/descriptions and amount raised/goal
	- `GET /projects/:id` should render an HTML page with all of the project's properties. This page should have a button for donations and a button to delete the project.
	- `GET /projects/new` should render a form for creating a project
	- `POST /projects/new` should 1) create a new Project by parsing the form fields from the page. 2) Save the Project to the Projects Collection and 3) redirect to `GET /projects/new`
	- `DELETE /projects/:id` should delete the project from the Projects collection
	- `POST /donate/:id` takes a project ID and a donation amount (in the request body) and increments the appropriate projects "Raised" amount. The page should rerender `GET /project/id`. 
- To enable filtering on your project list view, make your `GET /projects` optionally take query parameters. Use the query parameters to query your Projects collection. You should support queries for fully funded projects and projects looking to raise over a certain amount of money. 
- To Bulk Edit Projects you need the following:
	- A checkbox form that sends multiple product IDs to the server when submitted
	- A route for POST `/projects/delete_multiple` that will delete multiple posts from the collection and then redirects to `GET /projects`


## Step 2: Adding Users. A real challenge. 

We are now looking for the following behavior from our App. 
	- Every Project has a owner.
	- Users can donate to any project as long as they are not an owner (creator of the project)
	- You can logout and login as a new user 
	- Whenever a project is created, there must be an owner (ie page must be logged in)
	- An Admin page that lets a User see all the projects she has created, how much each of her projects has raised, and a list of which projects she has donated too. 

To do this you must, roughly: 

- Create User Model with one property for a username
- Create a login page
	- `GET /login` renders and HTML page with 1 input field asking for a username. 
	- `POST /login` creates and saves a user object (unless it already exists). It then sets a username cookie with the user's username. 
- Create a logout button (if there is an existing cookie, delete it). `GET /logout` should just remove the `"username"` cookie and redirect to the `GET /login` page. 
- Make sure that `GET projects/new` route only renders a form if there is a `"username"` cookie
- `GET projects/:id` should only show a donate button if the username cookie !== the owner of the Project :). 
- Add a `owner` property to the Project Model. This will store the _id of the User that creates a project.
- To keep track of the which projects a user has donated too: 
	- Add a Donations array to the User model. This should store id's of Projects the User has donated too. 
	- Edit the `/donate/:id` route to update the Donations array whenever a user donates.
- Create an admin page for a user `GET admin`. Note there is not ID on this route. Instead the admin page looks at the username cookie to find the user we care about. 
    - Show each project the user owns
    - How much each project has in donations 

## Step 3: Bonus. You asked for it.

Update your admin page. See if you can display: 
	- Which projects a user donated too, and *how much* she/he donated per project!
	- Which users donated to each the admin user's projects, and *how much* was donated per project! 


