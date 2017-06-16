//JS file for jQuery and Ajax stuffs
$(document).ready(function() {
  $('#contrib-form').on('submit', function(event) {
    event.preventDefault();
    // debugger;
    //ajax call: this refers to form, serialie gets all values
    //can reference these values in express with:
    //get  request
    //post  reqrest.body
    //url  request.params
    $.ajax({
      url: "/api/project/594365577a692031e5208983/contribution",
      data: $(this).serialize(),
      method: "post",
      success: function(response) { //this function only runs when url goes through and status is in 200
        console.log(response);
        $('#contributors').append("<li><h5>"+response.name+"</h5></li>");
      }
    })
  })

})
