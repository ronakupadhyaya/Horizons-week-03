# Pair Programming Exercise: Guestbook

## Goal

The goal of this exercise is to create a basic web application that allows users
to login, view posts and create new posts.

## Instructions

We have created for you a basic express app. It already handles the basics like
server creation and using a couple of templates. Now, you have to fill in the routes
and templates to build the Guestbook.

We start by logging in our
http://localhost:3000/login

### Functional requirements

Actions:

1. View posts: When the user visits the `/posts URL`, they must be see all the posts
on the system. Fill out the code for the routes and the post.hbs view.
1. View posts from one guest: If the user wants to see the posts from user named
Steven, they visit `/posts?username=steven` This uses the same routes and templates
as the above.
1. Sort posts by date: passing a new parameter to the url: `/posts?order=descending`,
should display all the posts ascending/descending order.
1. Login: When the user navigates to `/login` from a browser (thus making a GET
request), a form must be displayed. After filling and sending the form, they should
receive a cookie so they know they are logged in (POST request). In this case, we'll
just the username as a cookie and no password.
1. Create Post: If a user is logged in, meaning they have a cookie, they must be
able to create posts. Navigating to `/posts/new` should display a form. Sending the
form creates a new post.

Post schema: A post must contain
1. Author
1. Post date
1. Post title
1. Post body

### Styling requirements

Use bootstrap to create all the pages.
* Hint: Download the bootstrap library and add the javascript/css files to their
respective folders inside the public/ folder.
add them by linking them on the header partial for all pages, available at
`views/layouts/partials/head.hbs`. Link them in the format:
`<link rel="stylesheet" href="/stylesheets/style.css"></link>`

Views:

1. Login view -> login.hbs
1. View posts view -> posts.hbs
1. Create post view -> post_form.hbs

For login + create post forms use validation and display errors.

### Bonus Section:

Render markdown posts using [Marked](https://github.com/chjj/marked)

Guestbook admin page
1. Edit post
1. Delete single post
1. Delete all posts by author
