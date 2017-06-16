$(document).ready();

$("#caret-btn").on('click', function(event) {
  var selection = $("#select").val();
  var direction = -1;
  event.preventDefault();
  $("#caret-icon").toggleClass("caret-reversed");
  if($("#caret-icon").hasClass("caret-reversed")) {
    direction = 1;
  }
  $.ajax({
    url: `/?sort=${selection}&sortDirection=${direction}`,
    method: 'get',
    success: function(res) {
      console.log("res", res);
    }
  })
})
