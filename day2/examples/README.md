# Day 2 Self Directed Examples

You __MUST__ do the following examples in the order specified below. Note that some videos are followed by examples that you have to finish.

1. [Express + Postman Self Directed Examples](#express--postman-self-directed-examples)
    1. [Watch me: Express Introduction](#watch-me-express-introduction)
    1. [Watch me: HTTP Introduction + Postman](#watch-me-http-introduction--postman)
    1. [Postman (Setup)](#postman-setup)
    1. [Postman (Query Parameters)](#postman-query-parameters)
    1. [Postman (Methods, Request body, and Content type)](#postman-methods-request-body-and-content-type)
    1. [Postman (Delete)](#postman-delete)
    1. [HTTP GET Routes Examples](#http-get-routes)
    1. [Watch me: HTTP Queries and Parameters](#watch-me-http-queries-and-parameters)
    1. [Watch me: Status Codes](#watch-me-status-codes)
1. [Handlebars Self Directed Examples](#handlebars-self-directed-examples)
    1. [Watch me: Express Templating](#watch-me-express-templating)
    1. [Watch me: If-Else Handlebars](#watch-me-if-else-handlebars)
    1. [Watch me: Looping in Handlebars](#watch-me-looping-in-handlebars)
1. [HTML Forms Self Directed Examples](#html-forms-self-directed-examples)
    1. [Watch Me: Input Fields & Names](#watch-me-input-fields--names)
    1. [Watch Me: Actions](#watch-me-actions)
    1. [Watch Me: Method](#watch-me-method)
    1. [Watch Me: `express-validator`](#watch-me-express-validator)

# Express + Postman Self Directed Examples

- **All videos have the password `horizonites`**
- Before you jump in
- Keep [lesson slides](http://lessons.horizonsbootcamp.com/lessons/week03/day2.html)
  open in your browser. Lesson slides contain code samples and links to
  essential documentation.
- You can write all your solutions in the same project. You don't need to
  create a new React Native project for each secion.
- Ask for help early and often! 🙋

### Disclaimer

In terminal navigate to the `/week03/day2/examples/` folder and run the command `npm install`.

### [Watch me: Express Introduction](https://vimeo.com/212322872)
### [Watch me: HTTP Introduction + Postman](https://vimeo.com/212950789)

### Postman (Setup)

[Install Postman](https://www.getpostman.com/) and make a `GET` request to
`https://horizons-postman.herokuapp.com/`

When you are successful you will see a message in the output panel:

```
Great, you're starting the Postman warmup exercise!
```

### Postman (Query Parameters)

First, we're going to get our feet wet by using request parameters and a `GET` request.

Make a `GET` request to `https://horizons-postman.herokuapp.com/1`
(**note the `/1` at the end**) with the request parameter
`postman` set to `excellent`.

You can do this by either editing the URL directly or clicking on `Params` and adding a key and value.

Success message:

```
Success. Part 1 complete
```

![](img/postman1.png)

### Postman (Methods, Request body, and Content type)

Now we can make a `PUT` request with some JSON contents. We put the contents of the request in the Body section and change the `Content-Type` header so the server knows how to interpret the data.

Make a request to `https://horizons-postman.herokuapp.com/2` using Postman:

1. Set method to `PUT`
1. Set the body to be `raw` add the content `{ "foods": ["bacon", "lettuce", "tomato"] }`
  ![](img/postman2a.png)
1. Set header `Content-Type` to `application/json`
  ![](img/postman2b.png)

Success message:

```
Success. Part 2 complete
```

### Postman (Delete)

Finally, we will `DELETE` `https://horizons-postman.herokuapp.com/3/your/worries` by using HTTP Basic Authentication.

1. Set the method to `DELETE`
1. Open the `Authorization` tab and set mode to `Basic Auth`
1. Set username to `user` and password to `pass`

![](img/postman3.png)

Success message:

```json
{
  "you": "success",
  "exercise": "complete"
}
```

### HTTP GET Routes

Open `/week03/day2/examples/routes.js` in your favourite text editor and follow these steps:

1. require the `express` library
1. initiaize your express app instance (`var app = express()`)
1. create the following routes:
    - __`GET /`__: Send the string `"The Horizons Poet API v1.0"`.
	- __`GET /api/*`__: Send the string `"We couldn’t find any routes matching this endpoint"`.
	    - `*` denotes any string (i.e. `/api/anything`, `/api/unicorn`, /api/p/r/a/t/h`, etc.)
		- you will need to use `app.use()` for this
	- __`GET /api/poem`__: Send the text from the file `/week03/day2/examples/poem.txt`
	    - use the following code to read `poem.txt`
		    ```js
			var fs = require('fs');
			var poem = fs.readFileSync('./poem.txt', 'utf8');
			```
	- __`POST /api/success`__: Send the json `{success: true}` using [`res.json()`](http://expressjs.com/en/api.html#res.json)
1. listen on port __3000__

__TESTING:__ Use Postman to test your solution!

### [Watch me: HTTP Queries and Parameters](https://vimeo.com/212995568)
### [Watch me: Status Codes](https://vimeo.com/213017476)

1. Open this folder (`week03/day2/examples/express_echo`) in your Terminal on Mac or PowerShell on Windows.
1. Install dependencies with NPM:
	```bash
	npm install
	```
1. Open `app.js` in your editor of choice and add an express http endpoint so that it prints correctly on step 5 (follow the directions in the `app.js` file).
1. Start your server. **Note**: When you change `app.js` you have to restart it to see your changes!
	```bash
	npm start
	```
1. Verify that your code is working correctly by opening [http://localhost:3000/hello?name=Simba](http://localhost:3000/hello?name=Simba) in Chrome. It should print:

	```
	Hello there Simba!
	```
1. Stop your server with <kbd>Control</kbd>+<kbd>C</kbd> in your Terminal/PowerShell.

# [Handlebars](http://handlebarsjs.com/) Self Directed Examples

### [Watch me: Express Templating](https://vimeo.com/213161919)

The following set of tasks will require setting up your own express app with handlebars templating. You should refer back to the video if you get stuck on a task.

1. Navigate to `/week03/day2/examples/handlebars_examples/hello_world/`: This is the folder you will be working in
1. Start your Node App (you can use `npm init`)
1. Install the required packages
    - `express`
	- `express-handlebars`
1. Create an `app.js` file: This is where you will set up express to use handlebars
1. Create the following routes:
    - `/`: Displays the text `"Hello World"` from a `.hbs` file
	- `/:error`: Displays the text `"<error> page not found, did you enter the correct url?"` where `<error>` is the text entered as a param.
	    - __Example:__ `/about` will render a handlebars page with the text `about page not found, did you enter the corrent url?`.
1. Run your node app and make sure the above routes work!

### [Watch me: If-Else Handlebars](https://vimeo.com/213165829)

- Open `/week03/day2/examples/handlebars_examples/conditional/views/condition.hbs`
    - This file is rendered at route `/:word`
	- It is passed in the following object
	```js
	{
	  isEven: Boolean, // true if word has even number of letters
	  word: String // the word entered at :word
	}
	```
- Based on whether or not the word is even, you should write one of the following sentences in an `<h1>` tag
    - `"The word <entered-word-here> has an odd number of letters!"`
    - `"The word <entered-word-here> has an even number of letters!"`

#### Example Screenshots
![odd]
![even]

[odd]: ../img/odd.png
[even]: ../img/even.png

### [Watch me: Looping in Handlebars](https://vimeo.com/213169153)

- Open `/week03/day2/examples/handlesbars_examples/profiles/`: This is the folder you will be working in.
    - Take a look at `data.json`; this is a list of student info that contians `first_name`, `last_name`, `email`, and `gender`.
	- Don't forget to do `npm install`
- __Goal:__ You are to create a `handlebars` page to display all students. Create the following routes:
    - `/`: A directory of __ALL__ students (you __must__ display their first name, last name, and email
	- `/male`: A directory of __ALL MALE__ students
	- `/female`: A directory of __ALL FEMALE__ students
- Run `node app.js` to serve your handlebars files on `localhost:3000`
- Make sure your above routes work as intended!

# HTML Forms Self Directed Examples

### [Watch Me: Input Fields & Names](https://vimeo.com/213177057)

1. Open `/week03/day2/examples/forms_examples/`: For this example you will write code in the following files
    - `example1.js`
    - `views/example1.hbs`
1. Create a `GET /` route that renders a page with a header and a form.
	- `h1`: A heading tag that's text is based on the input box (in the form).
	- `form`: A form with an `input` box and a submit button
1. Test your route by running `npm install` then `node example1.js` in the terminal. Th
e following steps should work:
    1. Open your favourite web browser and navigate to `localhost:3000`
    1. You should see a heading titled __Default Header__ and a input box with a submit button (like below)
        ![form_1_1]
    1. Type __Change The Header__ into the input box and press submite
    1. The heading should change to __Change The Header__ like below
	![form_1_2]

### [Watch Me: Actions](https://vimeo.com/213177626)

In this example you are to make a register form. Make sure that when you press submit, the form data does not change (use the `value` attribute).

1. Open `/week03/day2/examples/forms_examples/`: For this example you will write code in the following files
        - `example2.js`
    	- `views/example2.hbs`
1. Create a register form (in `views/example2.hbs`) with the following inputs:
    - username (text input box)
	- password (password input box)
	- name (text input box)
	- gender: male/female/other (radio buttons)
	- state (dropdown)
1. Add logic in `example2.js` to make sure the data in your form will __NOT__ be cleared when you press _Register_.
1. `npm install && node example2.js` to test your app.
1. Fill in the form (it should look something like the one below once filled) and click register. Make sure the form stays filled.
    ![form_2_1]

### [Watch Me: Chrom DevTools Network Tab](https://vimeo.com/213266902)

### [Watch Me: Method]()

Now for this example we're going to implement login functionality for our users. You are to create a __Login Form__ which contains an `email` and `password` field. The list of accounts (along with their passwords) are stored as `JSON` in accounts.js.

1. Open `/week03/day2/examples/forms_examples/`: For this example you will write code in the following files
    - `example3.js`
    - `views/example3.hbs`
1. Create a login form (in `views/example3.hbs`) with the following inputs:
    - email (text input field)
	- password (password input field)
1. Add functionality for your form to `POST` to `/login` on submit
1. In `example3.js` create a `POST` route at `/login` which uses `req.body` to check if the entered email/password fields are in `accounts.js`
    - Given __correct__ credentials render a `h1` tag that says `"Hi [insert-first-name-here]!"` (example below). __NOTE__ that first name can be found in `accounts.json`
	- Given __incorrect__ credentials render a _RED_ error message on your page.
    ![form_3_1]
1. Fill in the form with random credentials and make sure the error message pops up
1. Fill in the form with someone's credentials from `accounts.js` and press Login. You should see the correct heading for that person pop up!

### [Watch Me: `express-validator`]()

For the next few examples we will be building upon one file. This series of examples will walk you through setting up a complete registration/login system.

#### Setting Up Views for Login/Register Forms

1. Open `/week03/day2/examples/forms_examples/`: For this example you will write code in the following files
    - `example4.js`
    - `views/login.hbs`
    - `views/register.hbs`
1. Create a register form (in `views/register.hbs`) with the following inputs:
    - email (text input box)
	- password (password input box)
	- confirm password (password input box)
	- date of birth (type date input field)
1. Once a user successfully registers, you should display a success message underneath the form and clear its' values.
1. Create a login form (in `views/login.hbs`) with the following inputs:
    - email (text input field)
	- password (password input field)
	![form_3_1]
1. Add a blank heading to the `login.hbs` page (this will render `"Hi [insert-first-name-here]!"` on successful login)
1. Make sure on submit the forms perform `POST` requests to their corresponding endpoints (`/login` or `/register`)

#### Storing Data

1. When a user posts to register, you should add their information to `accounts.js`. This will store your information, allowing you to successfully login.
1. When a user posts to login with their credentials (email/password), check if it's in `accounts.js`.
    - Given __correct__ credentials render a `h1` tag that says `"Hi [insert-first-name-here]!"` in `login.hbs` (example above). __NOTE__ that first name can be found in `accounts.json`
	- Given __incorrect__ credentials render a _RED_ error message on your page.

#### Validation
You will be using `express-validator` for the rest of the parts in this series of exampes. If any of the following validation rules aren't met, you must display errors on their corresponding `.hbs` page. Errors should be displayed in a box at the top of your form.

##### Part 1: Username
1. Use `express-validator ` to check if the __email__ field is blank in both `login/register.hbs`
1. Make sure that the __email__ field begins with a letter in `register.hbs`

##### Part 2: Passwords
1. Use `express-validator` to check if the __password__ field in `register.hbs` follows the following rules:
    - at least 5 characterds
	- has __BOTH__ letters and numbers
	- has at least one capital letter
1. Use `express-validator` to make sure that __password__ and __confirm_password__ match

##### Part 3: Date of Birth
1. Use `express-validator` to make sure that the user is _at least_ 18 years old

#### Verify your work!
1. `npm install && node example4.js`
1. Navigate to `localhost:3000/register`
    1. Fill the form out incorrectly and make sure all validation errors show up
	1. Fill the form out correctly and make sure the success message shows up
1. Navigate to `localhost:3000/login`
    1. Fill the form out incorrectly and make sure all validation errors show up
	1. Fill the form out correctly and make sure the corresponding name shows up in the heading.

Congratulations! You have successfully set up a working registration/login system.

[form_1_1]: ../img/form_1_1.png
[form_1_2]: ../img/form_1_2.png
[form_2_1]: ../img/form_2_1.png
[form_3_1]: ../img/form_3_1.png
