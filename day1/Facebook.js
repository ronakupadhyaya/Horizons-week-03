

// registration
var baseURL = 'https://fb.horizonsbootcamp.com/api/1.0';

$("#submitReg").click(function(e) {
	var email = $("#Email").val();
	var password = $("#Password").val();
	var fName = $("#FirstName").val();
	var lName = $("#LastName").val();
	var bMonth = $("#BirthMonth").val();
	var bDay = $("#BirthDay").val();
	var bYear = $("#BirthYear").val();

	var reg = $.ajax({
		url: baseURL + '/users/register',
		method: 'POST',
		success: function(e) {
			console.log('true');
		},
		data: {
			email: email,
			password: password,
			fname: fName,
			lname: lName,
			birthMonth: bMonth,
			birthDay: bDay,
			birthYear: bYear
		}
	})

	console.log(reg);
})