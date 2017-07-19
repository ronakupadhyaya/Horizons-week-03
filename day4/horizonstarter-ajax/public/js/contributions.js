/*jshint esversion: 6 */
$(document).ready(function() {

  $('#contributionForm').submit(function(e) {
    e.preventDefault();

    var project_id = $(this).attr('data-project-id');
    myAjaxPOST(`/api/project/${project_id}/contribution`, this, function(res) {
      console.log("errors in ajax", res.errors);
      $("#alert-placeholder").empty();

      if (res.errors) {
        res.errors.forEach(function(error) {
          console.log(error.msg);
          showAlert(error.msg);
        });
      } else {
        $('#alert-placeholder').append(`<div class="alert alert-success"><p class="text-center">Thank you for your contribution!</p></div>`);
        $('#contributors-list').append(`<li class="list-group-item">${res.name} contributed $${res.amount}</li>`);
        $("#contributions").html(`<span><strong>Total Contributions:</strong></span> $${res.totalContributions}`);
        var prog = `<div id="contr-progress-bar" class="progress-bar" role="progressbar" aria-valuenow="${res.percentage}" aria-valuemin="0" aria-valuemax="99999" style="width:${res.percentage}%">
          ${res.percentage}%
        </div>`;
        $(".progress").html(prog);
      }
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

// showFlashMessage("Thanks for your contribution! You rock!", 'success');
//
function showAlert(message) {
  $('#alert-placeholder').append(`<div class="alert alert-danger"><p class="text-center">${message}</p></div>`);
}
