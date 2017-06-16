$(document).ready(function() {

  // $('input').on("click", ".btn", function(e) {
  //   e.preventDefault();
  //   alert("hi");
  //   console.log("hi");
  // });
  //
  // $('.btn').on("click", function(e) {
  //   e.preventDefault();
  //   alert("hi");
  //   console.log("hi");
  // });

  $('#contributionForm').submit(function(e) {
    e.preventDefault();

    var project_id = $(this).attr('data-project-id');
    myAjaxPOST(`/api/project/${project_id}/contribution`, this, function(res) {
      $('#contributors-list').append(`<li>${res.name} contributed ${res.amount}</li>`);
    });
  });

  function myAjaxPOST(URL, curr, cb) {
    $.ajax({
      url: URL,
      data: $(curr).serialize(),
      method: "POST",
      success: cb
    });
  }
});
