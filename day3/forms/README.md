# Pair Programming Exercise: Forms

## Goal

TODO

## Instructions

TODO

Use Bootstrap to create a user registration form:

Create user registration form. User schema:

<table>
  <tr>
    <th>
      Field name
    </th>
    <th>
      Required
    </th>
    <th>
      Form field type
    </th>
    <th>
      Validation rules
    </th>
  <tr>
  <tr>
    <td>First Name</td>
    <td>Y</td>
    <td>text</td>
    <td>Must not be empty</td>
  </tr>
  <tr>
    <td>Middle initial</td>
    <td>N</td>
    <td>text</td>
    <td>Single letter</td>
  </tr>
  <tr>
    <td colspan="4" style="font-weight: bold;">FILL THIS IN!</td>
  </tr>
<table>

1. First name (required)
1. Middle initial (optional)
1. Last name (required)
1. Date of birth (required): validate that the user is over 13 years old
1. Place of birth (optional)
1. Password (required): password must be at least 6 characters long,
1. Password repeat (required): should be same as the password field
1. User registration date (required): set this via JavaScript as a hidden form field
1. Gender (required): Male/Female/Rather not say (radio selector)
1. Sign up for newsletter: Checkbox
1. Bio: textarea

Create a form with these fields using Express and Handlebars

1. Hidden
1. Password
1. Picklist
1. Multi picklist
1. Checkbox
1. Radio
1. Textarea

If all data is valid, render a profile page using this information after submit.

If not, render form back with error messages on validation errors.
