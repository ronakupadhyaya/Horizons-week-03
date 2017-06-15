# Facebook Exercise

Last week, we built the [frontend](https://github.com/horizons-school-of-technology/week02/blob/master/day5/README.md) of our version of Facebook and made AJAX requests to the given API server at [https://horizons-facebook.herokuapp.com/](https://horizons-facebook.herokuapp.com/).

We hoped you enjoyed that!

Today, we'll be building the backend API server of our version of Facebook using Mongo and Express.

These instructions are very minimal in nature and should only be used **as a guide** to creating your Facebook newsfeed (they should not be followed religiously as the final app should be your own creation).

Also, remember we had something like this for our backend?

```
https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/:post_id
```

For this exercise, *you do not need to implement versioning*. This means that your routes should not include the **1.0**.

**READ** the whole readme and try to understand how it works before writing any code. Clarify with TAs if you are unsure of anything.

> HINT: When building an application like this, try to imagine the flow of the entire application. Perhaps drawing a diagram might help.

> Tip of the day: Indent your code! #bestpractices 😄

## Guidelines

### Setup project
1. `npm init` in a **new** folder to create a project
1. Install nodemon: `npm install -g nodemon` (if you haven't already done so)
1. Next, add a start script in your `package.json` so that you can run nodemon by doing `npm start`:

	```
	"start": "nodemon app.js"
	```
1. Create a new `app.js` file and this is where you will write your code
1. You will need to `npm install` dependencies as you come across them

### Create Mongo database

##### Option 1 (Recommended): Use your existing mlab account

- Create a new database
- Create a user for this database
- Use the new mongo URI connection string for the mongoose connection

##### Option 2 (Advanced): If you already have mongodb installed on your machine, feel free to use that!


### Connect using mongoose
- Make a connection to your database and test that you are able to connect, read, and write.

### Create models

> TIP: Remember to use singular form of words when creating models. e.g. `mongoose.model('SINGULAR', mySchema)`

- We will create three different files:
	- `token.js`: mongoose model definition for tokens. Here's the schema for the mongoose model `token`:

	  ```javascript
	  {
	      userId: String,
	      token: String,
	      createdAt: Date
	  }
	  ```
	- `user.js`: mongoose model definition for users. Here's the schema for the mongoose model `user`:


	  ```javascript
	  {
	      fname: String,
	      lname: String,
	      email: String,
	      password: String
	  }
	  ```
	- `post.js`: mongoose model definition for posts. Here's the schema for the mongoose model `post`:


	  ```javascript
	  {
	      poster: Object,
	      content: String,
	      likes: Array,
	      comments: Array,
	      createdAt: Date
	  }
	  ```
- Place the three files in a folder called `/models` in your node project
- Remember to require these files correctly in order for you to access these model definitions

### Tokenization (Implement this after you are done with /api/users/register)
You will use tokens to authenticate users. Recall `/week02/day5` where we received a unique token from the `POST /api/users/login` route and stored it in `localStorage` on the browser. Once the token was stored, we included it in every request that required authentication (annotated by the 🔒 symbol).

To add tokenization functionality follow these recommended steps:

##### Login
1. In the `POST /api/users/login` callback function, add logic to create a unique token for the user currently logging in.
  	- A token contains user information so that a username does not have to be passed through every time a request is made.
  	- We suggest making your `token` field in your Token object `username + new Date()` to guarantee uniqueness.
  	- Set the `userId` field on the Token object to the `_id` of the user that is currently logging in.
1. Save this `token` to your mongo database.

##### Logout
1. In the `POST /api/users/logout` callback function you should search for the given token and remove it from the database to prevent further use of this particular token.

##### Using the token
1. For all routes requiring authentication (marked by 🔒) we advise looking up the user based on the `userId` field on the received token.

### Create Routes for User
Create the following routes for user functionality:

- `POST /api/users/register`
- `POST /api/users/login`
- `POST /api/users/logout` (🔒)

**Note**: Refer to the [API Documentation](https://horizons-facebook.herokuapp.com/) to look up what each route is supposed to do. Again, as a reminder, *you do not need to implement versioning*. This means that your routes should not include the **1.0** as shown in the documentation. Finally, you should not worry about the field `__v` in your responses (All responses in the documentation does not have the `__v` field).

> TIP: We are storing our password as plaintext. Do refer to part 2 bonus if you want to implement a secure user authentication system. #bestpractices

### Create Routes for Posts
Create the following routes to allow posting/commenting/liking:

- `GET /api/posts/` (🔒)
- `GET /api/posts/:page` (🔒)
- `POST /api/posts/` (🔒)
- `GET /api/posts/comments/:post_id ` (🔒)
- `POST /api/posts/comments/:post_id ` (🔒)
- `GET /api/posts/likes/:post_id ` (🔒)

**Note**: Refer to the [API Documentation](https://horizons-facebook.herokuapp.com/) to look up what each route is supposed to do. Again, as a reminder, *you do not need to implement versioning*. This means that your routes should not include the **1.0** as shown in the documentation. Finally, you should not worry about the field `__v` in your responses (All responses in the documentation does not have the `__v` field).

### Bonus
1. Add edit and delete functionality for user posts. Only the post owner can edit or delete his or her own posts.
   - `PUT /api/posts/:post_id` (🔒)
   - `DELETE /api/posts/:post_id` (🔒)
1. Previously we are storing the password as plain text. This is not a good practice. Let's use the node module `bcrypt` ([https://github.com/kelektiv/node.bcrypt.js](https://github.com/kelektiv/node.bcrypt.js)) to hash the user's password before saving a new user to the database in `/api/users/register`. You will also need to change how the login method (`/api/users/login`) verifies the credentials. The document for a user should now look like this:

	```javascript
	{
		"_id" : ObjectId("588be6f0c09e860011b5a60f"),
		"fname" : "Darwish",
		"lname" : "Gani",
		"email" : "prepwork-enquiries@joinhorizons.com",
		"password" : "$2a$08$pyOMWJDSa.MMxXO8ZwFEFueh2LnuU8tgqTbcuqm.zTEVgl8OGDh",
		"__v" : 0
	}
	```

	> TIP: After implementing this, it would be recommended to delete old documents which do not have the hashed password.
1. Reimplement the entire login system and tokenization using [passport](https://github.com/jaredhanson/passport) and [passport-jwt](https://github.com/themikenicholson/passport-jwt). Reading up about how JSON Web Tokens (JWT) work will help a lot!
1. Push your code onto [Heroku](https://www.heroku.com/). You will get a link like the following: `https://my-project.herokuapp.com`. Share the URL with your friends! [Hint: [https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction). Use it wisely.]
1. [Double Bonus] Design & implement backend functionality for Facebook reactions.

## Code Reviews

So, how can we do better? Any best practices?

Well, if you've completed everything (excluding the bonuses), feel free to grab a TA for code reviews! 😄🎉
