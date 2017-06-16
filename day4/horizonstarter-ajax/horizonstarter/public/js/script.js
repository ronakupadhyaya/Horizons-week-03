//JQUERY
$(document).ready(function() {

$('#contributionsForm').on('submit', function(event) {
  event.preventDefault();
  // debugger;

//url request.params
//get request.query
//post request.body

  $.ajax({
    url: "/api/project/5942f832f41e6ad8a21e6a2b/contribution",
    method: "post",
    data: $(this).serialize(),//only works for form
    success: function(response) { //only if 200 OK
      console.log(response);
      $("#listOfContributors").append(`<p>${response.name} contributed: ${response.amount}</p>`)
    },
    error: function(response) {
      console.log("error")
      console.log(response)
    }
  })
})



})
