window.fakebook = {}
var baseURL = 'https://fb.horizonsbootcamp.com/api/1.0'

// $('#account-create')
// $('#login')
// $('#talk-about-ur-kids')
// $('#like')
// $('#comment')
fakebook.mount = function() {
	$('#account-create').click(function(e) {
		e.preventDefault();
		console.log('click detected')
		$.ajax(baseURL+'/users/register', {
			data: {
				email: $('#new-email'),
				password: $('#new-pass'),
				fname: $('#new-first'),
				lname: $('#new-last'),
				birthMonth: $('#new-month'),
				birthDay: $('#new-day'),
				birthYear: $('#new-year'),
			},
			method: "POST",
			success: function() {
				console.log('new user created!!')
				console.log(this)
			}
		})
	})
}
fakebook.mount()
// fakebook.mount = function() {
// 	$('#account-create').click(function() {
// 		// $.
// 	})
// }