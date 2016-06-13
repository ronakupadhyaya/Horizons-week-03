// {
//   "success": true,
//   "response": {
//     "id": "575ebd6c8b59dd6e29d7af05",
//     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNwYXJrNEB3ZWxsZXNsZXkuZWR1In0.HEreN7EPyQcLUncG11YHV-9X5Gwf3x0uMu46FJe-Uh4"
//   }
// }
var baseURL = "https://fb.horizonsbootcamp.com/api/1.0";


// function checks to see that the inputs are not empty
function validateInput(str) {
	var joinedStr = str.join(' ');
	if(joinedStr !== '') {
		return true;
	}return false;
};


var email = '';
var pass = '';

// obtains information from input
$('#reg-sign-up').click(function(evt){

	var firstname = $('#reg-fname').val();
	var lastname = $('#reg-lname').val();
	email = $('#reg-email1').val();
	var email2 = $('#reg-email2').val();
	pass = $('#reg-pass').val();
	var bMonth = String($('#reg-bMonth').val());
	var bDay = String($('#reg-bDate').val());
	var bYear = String($('#reg-bYear').val());

	// validates that the input does not consist of empty strings
	var arr = [firstname, lastname, email, email2, pass, bMonth, bDay, bYear];
	var valid = true;
	arr.forEach(function(str) {
		if (!validateInput(str)) {
			valid = false;
		}
	})

	// checks to see that the email is typed in correct
	if (email !== email2) {
		valid = false;
	}

	if (!valid) {
		throw "Please provide all information";
	}

	// registers user with given information
	$.ajax({
		method: "POST",
		url: baseURL + "/users/register",
		data : {
			email: email,
			password: pass,
			fname: firstname,
			lname: lastname,
			birthMonth: bMonth,
			birthDay: bDay,
			birthYear: bYear
		},
		success: function(response){
			console.log(response),
			$('#registration-panel').css('display', 'none'),
			$('#successful-msg').css('display', 'block')
		},
		error: function(error) {
			throw error
		}
	});
});





