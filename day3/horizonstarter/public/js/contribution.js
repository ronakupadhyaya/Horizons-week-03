$('#contributionForm').on('submit', function(event) {
	event.preventDefault(); 
	console.log("SENDING");
	var project_id = $(this).attr('data-project-id');
	// postAjax(
	// 	`/api/project/${project_id}/contribution`, 
	// 	this, 
	// 	function(res){
	// 		console.log("Success: AJAX call to send contribution");
	// 		swal("Good job!", "Thanks for your contribution! You rock!", "success")
	// 	}
	// );
	$.ajax({
		url: `/api/project/${project_id}/contribution`,
		method: 'POST',
		data: $(this).serialize(),
		success: function(res){
			console.log("Success: AJAX call to send contribution");
			$('#contributions-list').append(`<li>${res.name}: $${res.amount}</li>`);
		},
		error: function(err){
			console.log("Error: AJAX call to send contribution failed", err)
		}
	});
});

// function postAjax(URL, form, successFn, errorFn) {
// 	var defaultErrFn = function(err){
// 		console.log("Error: AJAX call to send contribution failed", err)
// 		swal("Oops...", "Something went wrong!", "error");
// 	}
// 	$.ajax({
// 		url: URL,
// 		method: 'POST',
// 		data: $(form).serialize(),
// 		success: successFn,
// 		error: errorFn || defaultErrFn
// 	});
// }

// function sendContribution() {
// 	console.log("SENDING");
// 	$.ajax({
// 		url: `/api/project/${this}/contribution`,
// 		method: 'POST',
// 		data: {
// 			name: $('#contribution-name').val(),
// 			amount: $('#contribution-amount').val()
// 		},
// 		success: function(res){
// 			console.log("Success: AJAX call to send contribution");
// 			showFlashMessage("Thanks for your contribution! You rock!", 'success');
// 		},
// 		error: function(err){
// 			console.log("Error: AJAX call to send contribution failed", err)
// 			showFlashMessage("An error occurred", 'danger');
// 		}
// 	});
// }
