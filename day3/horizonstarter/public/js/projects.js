"use strict";

var displayProjects = function(projects) {
  $('#projectsContainer').empty()

  var projectCall = function(project) {
    return `<div>
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <p>${project.start}</p>
      <p>${project.end}</p>
      <p>${project.goal}</p>
      <a href="/project/${project.id}">View project</a>
      <a href="/project/${project.id}/edit">Edit project</a>
    </div>
    <hr>`
  }

  $('#projectsContainer').append(projects.map(projectCall));
  console.log('append')
};

var finalSort = function(filter) {
  var urlTrack = '/api/project'
  $.ajax({
    url: urlTrack + useFilter() +,
    method: 'GET',
    success: function(data) {
      console.log(data);
      displayProjects(data)
    },
    error: function(response) {
      console.log(response);
    }
  });
}

var useFilter = function(filter) {
  return '&' + filter;
}

var useSort = function(sort) {
  return '&' + sort;
}

var useSortDirection = function(sortDirection) {
  return '&' + sortDirection;
}

$(document).ready(function(){
  $('#sortFunded').click(function() {
    finalSort('?funded=true');
  })
  $('#sortNotFunded').click(function() {
    finalSort('?funded=false')
  })
  $('#sortShowAll').click(function() {
    finalSort('')
  })
});
