$(document).ready(function(){

  function showFlashMessage(msg, status){
    var successFlashHtml = `<div class="alert alert-success">
    <strong>Success!</strong> `+ msg + `
    </div>`;
    var failureFlashHtml = `<div class="alert alert-danger">
     `+ msg + `
    </div>`
    if(status === 'success'){
      $('.container-fluid').prepend(successFlashHtml);
    }
    if(status === 'danger'){
      $('.container-fluid').prepend(failureFlashHtml);
    }

  }
  function renderNewContribution(newContribution){
    var total = parseInt($('.total').attr('id'));
    total = total + parseInt(newContribution.amount);
    $('.total').attr('id', total);
    $('.total').html('$' + total + ' raised so far');
  }

  function sendContribution(projectId){
    var newContribution = {
      name: $('#name').val(),
      amount: $('#amount').val()
    };

    $.ajax({
      url: '/api/project/' + projectId + '/contribution',
      data: newContribution,
      method: 'POST',
      success: function(resp){
        showFlashMessage("Thanks for your contribution! You rock!", 'success');
        renderNewContribution(newContribution);
        $("html, body").animate({ scrollTop: 0 }, "slow");
      },
      error: function(err){
        showFlashMessage(err.responseJSON[0].msg, 'danger');
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }
    })
  }

  $('#send-contribution').click(function(e){
    e.preventDefault();

    var projectId = $(this).parent().attr('id')
    sendContribution(projectId);
  })
});
