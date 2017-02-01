# Inline exercise: Handlebars Partials

## Time limit: 10 minutes

## Goal

Re-use Bootstrap components more easily using partials.

## Instructions

1. Install dependencies with `npm install`
1. There's a partial for success notifications in `views/partials/success.hbs`.
  <br>Add a success notification to `index.hbs` using the `{{> partial arg="val"}}` syntax.
1. Create a partial `views/partials/warning.hbs` that generates
  a Bootstrap warning notification.
  <br>
  See [info on Bootstrap notifications](http://www.w3schools.com/bootstrap/bootstrap_alerts.asp) for how to render warnings with bootstrap.
1. Add a warning notification to `index.hbs` using `warning.hbs`.
1. Start your app with `npm start` and verify.
1. [http://localhost:3000/](http://localhost:3000/) should look like this when
  you're done:
  ![](img/done.png)
