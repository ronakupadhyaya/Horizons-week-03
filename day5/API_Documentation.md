# API Reference

Below are the live server specifications for accessing your Facebook API. All routes marked by a lock symbol (🔒) require you to pass in the token in the request body that you receive upon a successful login. This token changes across users and sessions. Store it for authenticating each request as necessary.

⚠️ All requests below with a 🔒 next to the title require authentication.

### `POST` Register User
`url: /api/users/register`

You must create your own account before accessing the login routes. In order to create a new user you should submit a `POST` request to the given url. The request must have the following information:
```javascript

{
  "fname": String, // The first name of the registering user
  "lname": String, // The last name of the registering user
  "email": String, // The email of the registering user, used for later authentication. Must not be the email of an existing user
  "password": String // The plaintext password of the registering user, used for later authentication. Don't worry, we've enforced strict HTTPS over the API and we hash and salt your password
}
```
Note that you can not make multiple user accounts with the same email, and all above information must be present in the request. If you do either of those things then the request will return a `400 Bad Request` error.

A successful user account registration request will result in the following **success** response:

```javascript

{
  "success": true,
  "response": {
    "__v": 0, // You may safely ignore __v
    "fname": String, // first name
    "lname": String, // last name
    "email": String, // email address
    "token": null, // unique token
    "password": String, // password
    "_id": String
  }
}
```

**Success Response**: 200 - `{success: true}`

**Failure Responses**:

* 400 - `{error: "Incomplete register definition."}` - You may have forgotten to pass in one or more of the required fields for registration. Check the spelling of your fields and make sure you are sending all your information in non-undefined values.

### `POST` Login
`url: /api/users/login`

This is the route you use for authentication. To login to your Horizons Facebook account you should submit a `POST` request the the above endpoint. The body of your request should contain the `email` and the `password` of the user that wants to login.

```javascript

{
  "email": String, // Email that identifies the user, set upon registration.
  "password": String // Password that verifies the user, set upon registration.
}
```

**Success Response**: 200 - `{success: true, response: {id: USER_ID, token: AUTH_TOKEN}}`

**Failure Responses**:

* 301 - Redirect to `GET /login` - `{error: "Login failed."}` - One or more of your authentication details was incorrect. Make sure you are sending the correct email and password you set upon registration and that these values are defined.

### `GET` Login
**Note that this is a `GET` request while the one above is a `POST` request**

`url: /api/users/login`

**This route will always return an error**; it is the URL that you are redirected to upon an unsuccessful login. If you are getting this every time, make sure that **a)** you are sending the correct email and password and **b)** you are POSTing login information to the login route.

**Response**: 401 - `{error: "Login failed."}`

### `GET` Posts Error
`url: /api/posts/error`

You should not be calling this request manually; you will be redirected to this route if any of your `/posts` requests fail or you are not authorized to access the post routes.

**Response**: 401 - `{error: "Action not allowed. Please authenticate."}`

### `GET` Posts 🔒
`url: /api/posts`


Returns the 10 most recent posts posted by users from the site. This is equivalent to `/posts/1`. The format for posts you will get back looks like the following:

**Success Response**: 200

```javascript

{
  "success": true,
  "response": [
    {
      "_id": "588afdbd7f87100011bce3f6",
      "poster": {
        "id": "588ab0967f87100011bce3f1",
        "name": "prath desai"
      },
      "content": "testing123",
      "createdAt": "2017-01-27T07:58:53.757Z",
      "__v": 0,
      "comments": [],
      "likes": []
    }
  ]
}
```

This is an example of a response with one post that has no comments and no likes. The `response` property, and each `comments` and `likes` property of a Post object are arrays. Make sure you manage this when handling the response of posts!

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

### `POST` New Facebook Post (a.k.a. post a post) 🔒
`url: /api/posts`

This route posts a new post to the central Newsfeed. This route takes the following required parameters:

```javascript

{
  "token": String, // AUTH_TOKEN
  "content": String // The text content of the new post.
}
```

If the request goes through successfully the API endpoint should respond with `JSON` that looks like this:

```javascript

{
  "success": true,
  "response": {
    "__v": 0,
    "poster": {
      "name": "prath desai",
      "id": "588ab0967f87100011bce3f1"
    },
    "content": "testing123",
    "createdAt": "2017-01-27T07:58:53.757Z",
    "_id": "588afdbd7f87100011bce3f6",
    "comments": [],
    "likes": []
  }
}
```

**Success Response**: 200 - `{success: true}`

**Failure Responses**:

* 400 - `{error: "No post content."}` - Your request did not include the `content` field correctly or you attempted to submit a blank post. Please check your AJAX request and make sure that you are sending your post contents correctly.

### `GET` Post, limit amount 🔒
`url: /api/posts/:numberOfPosts`

This route returns post objects in the same format as the GET `/posts` request above, but in a way that allows you to select a particular amount of posts from history.

`:numberOfPosts` represents a number that paginates your selection of a group of 10 posts. For example, `/posts/1` will return you the first 10 posts, `/posts/2` will return you the next 10 posts, and `/posts/3` will return you the next 10 posts after that. Posts are sorted by time and higher numbers for `:numberOfPosts` represent posts from longer ago.

Note that if fewer than 10 posts exist, requesting `/posts/2/` will give you back an empty array. The same applies for fewer than 20 posts and `/posts/3` and so on. Any `GET` request for posts from the server will return you a maximum of 10 posts.

**Success Response**: 200 - See above for schema/example of a posts response.

### `GET` Comments of a Post 🔒
`url: /api/posts/comments/:id`

This route gets all comments of a post by an ID (**of the post**, not the poster's user ID!). You get the post's ID through `GET /posts`, which is returned in each object representing a post as `_id`.

`:id` in this URL represents a 24-character long string that represents a post.

**Success Response**: 200

```javascript

{
  "success": true,
  "response": [
    {
      "_id": "588afdbd7f87100011bce3f6",
      "poster": {
        "id": "588ab0967f87100011bce3f1",
        "name": "prath desai"
      },
      "content": "testing123",
      "createdAt": "2017-01-27T07:58:53.757Z",
      "__v": 1,
      "comments": [
        {
          "createdAt": 1485505479658,
          "content": "this is a comment!",
          "poster": {
            "name": "prath desai",
            "id": "588ab0967f87100011bce3f1"
          }
        }
      ],
      "likes": []
    }
  ]
}
```

**Schema/Breakdown of `response`**:

* `response`: An array of objects representing comments, which have:
* `poster`: An object representing a user, which has:
* `name`: The first and last name of the user/poster.
* `id`: The ID of the user/poster.
* `content`: The text content of the comment.
* `createdAt`: A date string representing the time the comment was posted.


Note: This could return an empty array as the `response`! Also note that you may not need this route, as `GET /posts` will already return you the comments associated with each post.

### `POST` Comments 🔒
`url: /api/posts/comments/:id`

This POST route is used to post comments to a post by a post ID (that's a lot of posting). Posting a comment with this route takes the following required parameters:

* `token`: Your `AUTH_TOKEN`
* `content`: The text content of the comment you are posting.

Note: The `:id` you specify must refer to a valid post ID - pass it in as part of the URL, not in the request body. This endpoint expects a `token` and `content`. This is what a successful response should look like:

```javascript
{
  "success": true,
  "response": {
    "_id": "588afdbd7f87100011bce3f6",
    "poster": {
      "id": "588ab0967f87100011bce3f1",
      "name": "prath desai"
    },
    "content": "testing123",
    "createdAt": "2017-01-27T07:58:53.757Z",
    "__v": 1,
    "comments": [
      {
        "createdAt": 1485505479658,
        "content": "this is a comment!",
        "poster": {
          "name": "prath desai",
          "id": "588ab0967f87100011bce3f1"
        }
      }
    ],
    "likes": []
  }
}
```

**Success Response**: 200 - `{success: true}`

### `GET` Likes 🔒
`url: /api/posts/likes/:id`

Liking a post always uses `GET` - there is no POSTing likes. Requesting this route will NOT return the existing likes on a post - it will toggle the existing state of whether the currently authenticated user has liked the post corresponding to `:id` or not.

Notice the difference in the new response from the `API` once the `/posts/likes/:id` endpoint has been hit:

```javascript
{
  "success": true,
  "response": {
    "_id": "588afdbd7f87100011bce3f6",
    "poster": {
      "id": "588ab0967f87100011bce3f1",
      "name": "prath desai"
    },
    "content": "testing123",
    "createdAt": "2017-01-27T07:58:53.757Z",
    "__v": 2,
    "comments": [
      {
        "createdAt": 1485505479658,
        "content": "this is a comment!",
        "poster": {
          "name": "prath desai",
          "id": "588ab0967f87100011bce3f1"
        }
      }
    ],
    "likes": [
      {
        "name": "prath desai",
        "id": "588ab0967f87100011bce3f1"
      }
    ]
  }
}
```

### `POST` Logout
`url: /api/users/logout`

This endpoint allows you to safely logout and destroy the token you received on login. The request should pass in the `token` you want to delete. If the request is successful, you should get a `{success: true}` response.
