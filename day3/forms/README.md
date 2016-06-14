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
  1. [**Express-Validator**](https://github.com/ctavan/express-validator) - for validating our form inputs


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
      <td> User Registration Date </td>
      <td> Y </td>
      <td> text *(Hidden)* </td>
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
  <table>

  Create a form with these fields using Bootstrap and Handlebars. Similarly, create a separate page that 

  If all data is valid, render a profile page using this information after submit.

  If not, render form back with error messages on validation errors.

1. Write your `app.js` file

  You will need to define two `routes` in your file: One to enter the user data, and one to return the proper response to the users.

1. Set up form validation
