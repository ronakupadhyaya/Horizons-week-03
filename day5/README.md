# Facebook Exercise

### Setup project
1. `npm init` in a new folder to create a project
1. create a new `app.js` file
1. you will need to `npm install` dependencies as you come across them
1. for now install nodemon using npm and add a start script similar to the following: `"start": "nodemon app.js"`

### Create Mongo database
1. using your existing mlab account
- create a new database
- create a user for this database
- use the new mongo uri connection string for the mongoose connection

### Connect using mongoose
- make a connection to your database and test that you are able to connect, read, and write.

### Create models
- we will create three different files
- `token.js`: mongoose model definition for tokens

  ```javascript
  {
    userId: String,
    token: String,
    createdAt: Date
  }
  ```
- `user.js`: mongoose model definition for users

  ```javascript
  {
    fname: String,
    lname: String,
    email: String,
    password: String
  }
  ```
- `post.js`: mongoose model definition for posts

  ```javascript
  {
    poster: Object,
    content: String,
    likes: Array,
    comments: Array,
    createdAt: Date
  }
  ```
- place the three files in a folder called `/models` in your node project
- remember to require these files correctly in order for you to access these model definitions

### Implement Tokenization
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
- `GET /api/users/login`
- `POST /api/users/login`
- `POST /api/users/logout`
- `POST /api/users/register`

**Note**: Refer to the [API Documentation](./API_Documentation.md) to look up what each route is supposed to do.

### Create Routes for Posts
Create the following routes to allow posting/commenting/liking:
- `GET /api/posts/`
- `GET /api/posts/:x`
- `POST /api/posts/`
- `GET /api/posts/comments/:id`
- `POST /api/posts/comments/:id`
- `GET /api/posts/likes/:id`

**Note**: Refer to the [API Documentation](./API_Documentation.md) to look up what each route is supposed to do.

### Bonus
1. Add edit and delete functionality for user posts.
1. Design & implement backend functionality for Facebook reactions.
