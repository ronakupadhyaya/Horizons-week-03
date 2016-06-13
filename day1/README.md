# Day 1 - Building Facebook

At this point, you've learned about JavaScript essentials, HTML and CSS with Bootstrap, DOM manipulation with jQuery, and API usage with AJAX. It's time to put all these skills into action. Ready?

**Instructions:**

1. Build Facebook

...okay, we'll give you a _little_ more than that.

## Introduction

Building Facebook is your first test of design patterns and skills in DOM manipulation and AJAX requests in a less guided scenario. 

_Focus on implementing the core functionality first, and worry about styling and CSS later._ Making it work is more important than making it look good. If you are spending most of your time writing your CSS, you are not using it in the best way. Form follows function!

_Use the design patterns you know, but make sure you understand what you are building._ You will find that many of the skills you learned in building Horello will apply here: creating data models and rendering HTML bits in jQuery for each component are good ideas to tackle this exercise. At the same time, this doesn't mean you necessarily need all the complexity of Horello within your initial attempts at building Facebook. If it makes more sense to you to view the problem with a different approach, use it. 

_Stay organized._ Outlining the flow of your Facebook implementation or taking each component below one-by-one is a good idea. Well-structured code is easier to debug, easier to write, and easier for other people to understand.

That's all. Move fast and break things! *

<sub>_* not the server though, thanks_</sub>

## Required Components

The components we want you to build are below. We recommend you approach each one as a step building off the other, but you may take the components in any order you'd like. Keep in mind that many of these components rely on your implementation of registering and authenticating a user.

1. **Registration**: You will need to allow a user to fill out a form to register with email, password, first and last name, and birthday. 
2. **Login**: You will need to present existing users with a login that authenticates with email and password. Upon successful login, our server will return you a token to pass into subsequent requests. 
3. **Posts**: For authenticated users, you will need to present a Newsfeed with Post objects returned by our server and a component to allow users to submit posts to the Newsfeed. Posts are plain-text and only have information on the poster's name and time submitted.
4. **Likes**: Each post will need to have a Like button to allow authenticated users to Like posts on the Newsfeed. Likes are stored as an array on each Post object and have information on the user who Liked the post.
5. **Comments**: Each post will also need to allow users to Comment on Post objects - comments will also be stored as an array on each Post object and contain the comment contents and information on the commenter.  
6. **Chat**: See *Using Sockets* for more information on how to implement Chat. You will be adding a chat section to your Facebook site to have a central chat feature for all users on your site.
7. **Bonus: Infinite Scrolling**: Using what you learned on Saturday, automatically load posts when users scroll past the bottom.

Yes, it's a lot - but if Mark Zuckerberg can do it, you can too! 

## Server Specifications
Below are the live server specifications for accessing our "Facebook" API. All routes marked by **"Authentication required"** require you to pass in the token that you receive upon successful login. This token changes across users and sessions! Store it for authenticating each request as necessary. All authenticated requests are also rate-limited to 60/minute. _If you exceed the rate limit, please check the amount of requests you are sending._

####Base URL: [https://fb.horizonsbootcamp.com/api/1.0](https://fb.horizonsbootcamp.com/api/1.0)

####POST `/users/register`

You must create your own account before accessing the login routes. The `/register` route takes the following required parameters:

* `email`: The email of the registering user, used for later authentication. Must not be the email of an existing user.
* `password`: The plaintext password of the registering user, used for later authentication. Don't worry, we've enforced strict HTTPS over the API and we hash and salt your password.
* `fname`: The first name of the registering user. 
* `lname`: The last name of the registering user.
* `birthMonth`: The month of the user's birthday (1-12).
* `birthDay`: The day of the user's birthday (1-31).
* `birthYear`: The year of the user's birthday (0-2016).

**Success Response**: 200 - `{success: true}`

**Failure Responses**:

* 400 - `{error: "Incomplete register definition."}` - You may have forgotten to pass in one or more of the required fields for registration. Check the spelling of your fields and make sure you are sending all your information in non-undefined values.
* 500 - `{error: "Failed to hash password."}` - Call a TA over. The password you sent is having issues being hashed on our server.
* 500 - `{error: "Failed to save the new user."}` - Call a TA over. You may be malformatting your request or the database may be overloaded.


####POST `/users/login`
This is the route you use for authentication. The `/login` route takes the following parameters:

* `email`: Email that identifies the user, set upon registration.
* `password`: Password that verifies the user, set upon registration.

**Success Response**: 200 - `{success: true, response: {id: USER_ID, token: AUTH_TOKEN}}`

**Failure Responses**:

* 301 - Redirect to `GET /login` - `{error: "Login failed."}` - One or more of your authentication details was incorrect. Make sure you are sending the correct email and password you set upon registration and that these values are defined.
* 500 - `{error: "Failed to serialize user."}` - Call a TA over. There is an issue with your user account in the database.


####GET `/users/login`

**This route will always return an error**; it is the URL that you are redirected to upon an unsuccessful login. If you are getting this every time, make sure that **a)** you are sending the correct email and password and **b)** you are POSTing login information to the login route.

**Response**: 401 - `{error: "Login failed."}`


####GET `/posts/error`
You should not be calling this request manually; you will be redirected to this route if any of your `/posts` requests fail or you are not authorized to access the post routes.

**Response**: 401 - `{error: "Action not allowed. Please authenticate."}`

### ⚠️ All requests below require authentication. 
You must pass the `AUTH_TOKEN` you receive upon login to the request body. Your authorization token you get on login will automatically identify your user account on our system; as long as you are passing in your `AUTH_TOKEN`, there is no need to send extra details such as your user ID. 

_Read more about `AUTH_TOKEN` above, in `POST /users/login`._

---

####GET `/posts` - Authentication required 🔒

Returns the 10 most recent posts posted by users from the site. This is equivalent to `/posts/1`. The format for posts you will get back looks like the following:

**Success Response**: 200

```
{	
	success: true,
	response: [
		{	
			"_id":"575a52ce522dc9a46ba7c4bc", 
			"poster": {
				"id":"575a169772363372474bf5aa",
				"name":"Ethan Lee"
			},
			"content":"Test post!",
			"createdAt":"2016-06-10T05:40:30.503Z",
			"__v":0,
			"comments":[
				{
                   "poster": {
                       "id": "575a169772363372474bf5aa",
                       "name": "Ethan Lee"
                   },
                   "content": "What a great post!",
                   "createdAt": "2016-06-10T05:50:30.503Z"
                }
			],
			"likes":[
				{
                    "id": "575a169772363372474bf5aa"
                    "name": "Ethan Lee"
                }
			]
		}
	]
}
	
```

This is an example of a response with one post that has one comment and one like. The `response` property, and each `comments` and `likes` property of a Post object are arrays. Make sure you manage this when handling the response of posts!

**Schema/Breakdown of `response`:**

* Response is an array of objects representing posts, all of which have:
	* `_id`:  The ID of the post.
	* `poster`: An object representing a user, which has:
		* `id`: The ID of the user/poster.
		* `name`: The first and last name of the user/poster.
	* `content`: The text content of the post.
	* `createdAt`: A date string representing the time the post was posted.
	* `__v`: You may safely ignore `__v`.
	* `comments`: An array of objects representing comments, which have:
		* `poster`: An object representing a user, which has: 
			* `id`: The ID of the user/poster.
			* `name`: The first and last name of the user/poster.
		* `content`: The text content of the comment.
		* `createdAt`: A date string representing the time the comment was posted.
	* `likes`: An array of objects representing users that have liked the post, all of which have:
		* `id`: The ID of the user that liked the post.
		* `name`: The first and last name of the user that liked the post.
		
Both `comments` and `likes` could be empty arrays!

**Failure Responses**: 

* 500 - `{error: "Failed to query posts."}` - Call a TA over. There is an issue in retrieving posts from our database.

####GET `/posts/:x` - Authentication required 🔒
This route returns post objects in the same format as the GET `/posts` request above, but in a way that allows you to select a particular amount of posts from history. 

`:x` represents a number that paginates your selection of a group of 10 posts. For example, `/posts/1` will return you the first 10 posts, `/posts/2` will return you the next 10 posts, and `/posts/3` will return you the next 10 posts after that. Posts are sorted by time and higher numbers for `:x` represent posts from longer ago. 

Note that if fewer than 10 posts exist, `:x` for all x will not return an empty response; it will simply give you the most recent posts. Use Post ID's to make sure you are not storing or rendering duplicates!

Any `GET` request for posts from the server will return you a maximum of 10 posts.

**Success Response**: 200 - See above for schema/example of a posts response.

**Failure Responses**: 

* 500 - `{error: "Failed to query posts."}` - Call a TA over. There is an issue in retrieving posts from our database.

####POST `/posts` - Authentication required 🔒
This route posts a new post to the central Newsfeed. This route takes the following required parameters:

* `content`: The text content of the new post.

**Success Response**: 200 - `{success: true}`

**Failure Responses**: 

* 400 - `{error: "No post content."}` - Your request did not include the `content` field correctly or you attempted to submit a blank post. Please check your AJAX request and make sure that you are sending your post contents correctly.
* 500 - `{error: "Failed to save the new post."}` - Call a TA over. There is an issue in saving posts to our database.

####GET `/posts/comments/:id` - Authentication required 🔒
This route gets all comments of a post by an ID (**of the post**, not the poster's user ID!). You get the post's ID through `GET /posts`, which is returned in each object representing a post as `_id`.

`:id` in this URL represents a 24-character long string that represents a post. 

**Success Response**: 200 

```
{	
	success: true,
	response: [
		{
		   "poster": {
		       "id": "575a169772363372474bf5aa",
		       "name": "Ethan Lee"
		   },
		   "content": "What a great post!",
		   "createdAt": "2016-06-10T05:50:30.503Z"
		}
	]
}

```

**Schema/Breakdown of `response`**:

* `response`: An array of objects representing comments, which have:
	* `poster`: An object representing a user, which has: 
		* `id`: The ID of the user/poster.
		* `name`: The first and last name of the user/poster.
	* `content`: The text content of the comment.
	* `createdAt`: A date string representing the time the comment was posted.
	
	
Note: This could return an empty array as the `response`! Also note that you may not need this route, as `GET /posts` will already return you the comments associated with each post.

**Failure Responses**: 

* 500 - `{error: "Failed to get comments on a post."}` - This may mean that you are passing in an invalid ID for a post. Check to make sure that you are passing the `:id` as part of the URL and that you are passing in the ID for a post, not of a user.

####POST `/posts/comments/:id` - Authentication required 🔒
This POST route is used to post comments to a post by a post ID (that's a lot of posting). Posting a comment with this route takes the following required parameters:

* `content`: The text content of the comment you are posting.

Note: The `:id` you specify must refer to a valid post ID - pass it in as part of the URL, not in the request body.

**Success Response**: 200 - `{success: true}`

**Failure Responses**: 

* 500 - `{error: "Failed to post comments on post."}` - This may mean that you are passing in an invalid ID for a post. Check to make sure that you are passing the `:id` as part of the URL and that you are passing in the ID for a post, not of a user.

####GET `/posts/likes/:id` - Authentication required 🔒
Liking a post always uses `GET` - there is no POSTing likes. Requesting this route will NOT return the existing likes on a post - it will toggle the existing state of whether the currently authenticated user has liked the post corresponding to `:id` or not. 


##Using Sockets

Read this when you are working on your Chat component! Implementing Chat will require you to use a protocol you have not used before: WebSockets. WebSockets is a realtime, event-driven protocol that allows us to create applications like chat that are extremely responsive. We will interface with WebSockets using a client library called [Socket.IO](http://socket.io) - import their library to your page with the following line:

**NOTE:** Learning to use the Sockets library will be an exercise in reading documentation and determining how to use it successfully. 

`<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>`

Our Sockets server lives on port 3000 of the base API URL, which means it can be accessed at https://fb.horizonsbootcamp.com/socket.io. 

Upon connecting successfully to the Sockets server, please emit a new `authentication` event in the following format: `{token: AUTH_TOKEN}`. You have 5 seconds after connecting to the Sockets server to present your authorization token you received upon login, or you will be disconnected from the server. If you successfully authenticate, you will receive the `authenticated` event and will be ready to begin sending messages.

All new messages are sent by emitting the `message` (send the message you are sending in plain text, without an object); if you are authorized, our Sockets server will broadcast the new message in the following form: `{username: *username*, message: *the message*}`.




