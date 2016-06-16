"use strict";

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
  // strings but we just brute force it for now to keep it simple.
  var
    status1 = $('#status1'),
    status2 = $('#status2'),
    status3 = $('#status3');

  // Ideally we should keep track of whether we've already fired off a request,
  // and whether or not it has returned, so that we don't allow two requests to
  // overlap, but we're keeping things simple here. I know. ¯\_(ツ)_/¯
  status1.click(function() {
    reloadWithFilter('');
  });
  status2.click(function() {
    reloadWithFilter('funded=0');
  });
  status3.click(function() {
    reloadWithFilter('funded=1');
  });
});
