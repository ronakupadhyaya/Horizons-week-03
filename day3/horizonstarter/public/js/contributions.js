$('#send-contribution')
  .on('click', function(event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/project/:projectId/contribution",
      data: {
        contributor: $('#contributor')
          .val(),
        amount: $('#amount')
          .val()
      },
      success: function(response) {

      }
    });
  });
