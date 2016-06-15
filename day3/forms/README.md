# Pair Programming Exercise: Forms

## Goal

The goal of this exercise if to familiarize yourself with a few key concepts: **server-side rendering w/ templating** and **form validation**.

In comparison to everything we've done before, this will feel a little bit different. Typically, we fetch data and then render new items on a page client-side (that is, the browser # TODO). In this case, we're going to be sending *static* pages - pages that you won't have to render anything on, ***because it's already done on the server*** before it's sent.

At the end of this, you should be a bit more comfortable with using templates to render a page and validating form input.

## Instructions

1. Install your dependencies. In this exercise, we're going to be needing:

  1. [**Bootstrap**](https://www.npmjs.com/package/bootstrap) - for building the UI
  1. [**Handlebars**](https://www.npmjs.com/package/handlebars) - for rendering our pages server-side
  1. [**Express**](https://www.npmjs.com/package/express) - our web server framework


1. Use **Bootstrap** to create a user registration form:

  Create user registration form according to this specification:

  <table>
    <tr>
      <th> Field name </th>
      <th> Required </th>
      <th> Form field type </th>
      <th> Validation rules </th>
    <tr>
    <tr>
      <td> First Name </td>
      <td> Y </td>
      <td> text </td>
      <td> Must not be empty </td>
    </tr>
    <tr>
      <td> Middle initial </td>
      <td> N </td>
      <td> text </td>
      <td> Single letter </td>
    </tr>
    <tr>
      <td> Last name </td>
      <td> Y </td>
      <td> text </td>
      <td> Must not be empty </td>
    </tr>
    <tr>
      <td> DOB Month </td>
      <td> N </td>
      <td> select </td>
      <td> Must be an integer between [1, 12] </td>
    </tr>
    <tr>
      <td> DOB Day </td>
      <td> N </td>
      <td> select </td>
      <td> Must be an integer between [1, 31] </td>
    </tr>
    <tr>
      <td> DOB Year </td>
      <td> N </td>
      <td> select </td>
      <td> Must be a non-negative integer </td>
    </tr>
    <tr>
      <td> Password </td>
      <td> Y </td>
      <td> password </td>
      <td> Must not be empty </td>
    </tr>
    <tr>
      <td> Repeat Password </td>
      <td> Y </td>
      <td> password </td>
      <td> Must not be empty and match the password field </td>
    </tr>
    <tr>
      <td> Gender </td>
      <td> Y </td>
      <td> radio </td>
      <td> Male/Female/Rather not say </td>
    </tr>
    <tr>
      <td> Sign-up for newsletter </td>
      <td> Y </td>
      <td> checkbox </td>
      <td> Must not be blank </td>
    </tr>
    <tr>
      <td> Bio </td>
      <td> Y </td>
      <td> textarea </td>
      <td> Must not be blank </td>
    </tr>
    <tr>
      <td> User Registration Date </td>
      <td> Y </td>
      <td> text *(Hidden)* </td>
      <td> Must not be empty and match the password field </td>
    </tr>
  <table>
  
  You will be creating two page: a registration form page and a 
  Create a form with these fields using Bootstrap and Handlebars. Similarly, create a separate page for displaying all this information once you've successfully registered.
  
  If all data is valid, render a profile page using this information after submit.

  If not, render form back with error messages on validation errors.

1. Implement the `/register` route
  
  Make a `/register` route in your express app. The `/register` route should respond to 2 http methods: **GET** and **POST**. It should do two things:
    1. if it's a **GET** request, it should return the handlebars-compiled empty form
    2. if it's a **POST** request, it should validate the post data, and if the post data is:
      + **valid**, it should send the handlebars-compiled profile page
      + **invalid**, it should send the handlebars-compiled registration form with an error message about which form fields are invalid.
  
  Using [**Handlebars**](http://handlebarsjs.com) is pretty simple. First you need need to put your Handlebars template (the *html-y* stuff) into a separate file (i.e. `someTemplate.hbl`). Then you need to read the full file out using `fs.readFileSync` and use handlebars to convert it into a template object. Finally, you render the template with the data it needs by calling the template on the data you want it to display.
  
  Your process is going to look something like this:
  ```javascript
  var hbl = require('handlebars');
  ...
  var tplString = fs.readFileSync('someTemplate.hbl').toString();
  var someTpl = hbl(tpString);
  ...
  var data = { name : "Jebediah Ezekiel Mordecai" }
  var page = someTpl(data); // -> <!DOCTYPE html><html...
  ```
