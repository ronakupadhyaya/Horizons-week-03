# Your Playbook

Okay, so now you are all setup! 

Below is a playbook for you to follow to walk you through building kickstarter and help you prioritize which features you build and give you guidance on how you build them! 

Everyone should seek to get through the steps below. If you do, pat yourself on the back!

## Kickstarter with no users 

In step 1, we will build Kickstarter without any users. This would kind of suck, but it's a great starting point and introduction to databases. Here are the features you will implement: 

- A front page which lists all projects (perhaps with a set of featured projects
  on top, like on Kickstarter)
- A page that lets you view a project, and donate to that project
- A page that lets you create a new project
- The ability to filter the list of projects on front page using query parameters. Create the ability to filter the page by projects that are fully funded (`/projects?funded=true`) and projects looking to raise over a certain amount of money (`/projects?goal_greater_than=10000` should return all projects) [not implemented in prototype/solutions]
- A page that let's you bulk edit projects [not implemented in prototype/solutions]


This means that you will need the following: 
- A project Model (`/model/project`) with the following properties.
	- Title: String
	- Goal: Number // Amount this project seeks to raise
	- Raised: number
	- Category: String
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