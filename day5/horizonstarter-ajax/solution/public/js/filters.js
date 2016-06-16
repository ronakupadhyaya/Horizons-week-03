"use strict";

/**
 * Frontend filter logic. We keep this super simple for now. E.g., we do not
 * allow filter classes to be combined.
 */

var apiUrl = '/api/1/project';

function renderProject(project) {
  var wrapper = $('<div class="well"></div>');
  var title = $('<h2>Title: ' + project.title + '</h2>');
  var desc = $('<h3>Description: ' + project.description + '</h3>');
  var link = $('<a href="/project/' + project.id + '">View project</a>');
  wrapper.append(title, desc, link);
  return wrapper;
}

function renderProjects(projects) {
  // Remove existing data.
  $('#projectsAnchor').empty();

  // Check if no results.
  if (!projects.length) {
    $('#projectsAnchor').append($('<h4>No matching projects found.</h4>'));
  }

  // Render new data.
  projects.forEach(function (proj) {
    $('#projectsAnchor').append(renderProject(proj));
  });
}

function reloadWithFilter(filter) {
  console.log("Attempting to reload data with filter: " + filter);
  $.ajax(apiUrl + '?' + filter, {
    success: function(data) {
      console.log("Successfully fetched " + data.length + " projects, rendering");
      renderProjects(data);
    },
    error: function(err) {
      console.error(err);
      alert('An unknown error occurred, please try again later.');
    }
  })
}

// jQuery document.ready shortcut: this code will run AFTER the body loads!
$(function() {
  // We could do something much clever here to map our filters to our query
  // strings but we just brute force it for now to keep it simple. E.g., we
  // could attach the query string or the goal value as a data attr on the
  // buttons in the DOM.
  var
    status1 = $('#status1'),
    status2 = $('#status2'),
    status3 = $('#status3'),
    goal1   = $('#goal1'),
    goal2   = $('#goal2'),
    goal3   = $('#goal3'),
    goal4   = $('#goal4'),
    goal5   = $('#goal5');

  // Ideally we should keep track of whether we've already fired off a request,
  // and whether or not it has returned, so that we don't allow two requests to
  // overlap, but we're keeping things simple here. I know. ¯\_(ツ)_/¯
  status1.click(function() {
    // Clear filter/get all
    reloadWithFilter('');
  });
  status2.click(function() {
    reloadWithFilter('funded=0');
  });
  status3.click(function() {
    reloadWithFilter('funded=1');
  });
  goal1.click(function() {
    // Clear filter/get all
    reloadWithFilter('');
  });
  goal2.click(function() {
    reloadWithFilter('goalAbove=10');
  });
  goal3.click(function() {
    reloadWithFilter('goalAbove=100');
  });
  goal4.click(function() {
    reloadWithFilter('goalAbove=1000');
  });
  goal5.click(function() {
    reloadWithFilter('goalAbove=10000');
  });
});
