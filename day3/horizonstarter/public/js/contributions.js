$(document).ready(function() {

  $('#send-contribution').on('click', function(event) {
    event.preventDefault();
    var name = $("#contribution-name").val();
    var amount = $("#contribution-amount").val();
    function sendContribution() {
      $.ajax({
        url: '/api/project/:projectId/contribution',
        method: 'GET',
        data: {
          name: name,
          amount: amount,
        },
        success: function() {
          
        }
      })
    }
  })

})
