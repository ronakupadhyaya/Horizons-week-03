// Filter by Funding
// When form is submitted, call the AJAX request
$('#select-form').on('submit', function(event) {
	event.preventDefault();
	// Get value of selection
	var funded = $('#funded-select').val();
	var sort = $('#sort-select').val();
	var sortDirection = $('#sort-select-direction').val();
	$.ajax({
		url: '/api/projects',
		method: 'GET',
		// Must send form data with request
		data: {
			funded: funded,
			sort: sort,
			sortDirection: sortDirection
		},
		// On success, send response that emptys and re-appends all the projects
		success: function(res) {
			$('#all-projects-wrapper').empty();
			res.forEach(function(project) {
				$('#all-projects-wrapper').append(`<div class="all-projects-box-outer col-sm-6 col-md-4">\
					<div class="all-projects-box-inner">\
						<img src=${project.imageURL} class="all-projects-image">\
						<div class="projects-info">\
							<h3>${project.title}</h3>\
							<h4>Goal: ${project.goal}</h4>\
							<p>Description: ${project.description}</p>\
							<p>Start Date: ${project.start}</p>\
							<p>End Date: ${project.end}</p>\
							<p>Category: ${project.category}</p>\
						</div>\
						<a type="button" href="/project/{{this._id}}">\
							<div class="view-button">View Project</div>\
						</a>\
					</div>\
				</div>`);
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
});

// Sort projects
// // When form is submitted, call the AJAX request
// $('#sort-select-form').on('submit', function(event) {
// 	event.preventDefault();
// 	// Get value of selection
// 	var sort = $('#sort-select').val();
// 	var sortDirection = $('#sort-direction-select').val();
// 	$.ajax({
// 		url: '/api/projects',
// 		method: 'GET',
// 		// Must send form data with request
// 		data: {
// 			sort: sort,
// 			sortDirection: sortDirection
// 		},
// 		// On success, send response that emptys and re-appends all the projects
// 		success: function(res) {
// 			$('#all-projects-wrapper').empty();
// 			res.forEach(function(project) {
// 				$('#all-projects-wrapper').append(`<div class="all-projects-box-outer col-sm-6 col-md-4">\
// 					<div class="all-projects-box-inner">\
// 						<img src=${project.imageURL} class="all-projects-image">\
// 						<div class="projects-info">\
// 							<h3>${project.title}</h3>\
// 							<h4>Goal: ${project.goal}</h4>\
// 							<p>Description: ${project.description}</p>\
// 							<p>Start Date: ${project.start}</p>\
// 							<p>End Date: ${project.end}</p>\
// 							<p>Category: ${project.category}</p>\
// 						</div>\
// 						<a type="button" href="/project/{{this._id}}">\
// 							<div class="view-button">View Project</div>\
// 						</a>\
// 					</div>\
// 				</div>`);
// 			});
// 		},
// 		error: function(err) {
// 			console.log(err);
// 		}
// 	});
// });