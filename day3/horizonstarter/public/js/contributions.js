$(document).ready(function(){
  $('#send-contribution').on('click', function(event){
    event.preventDefault();
    sendContribution();
  });

  var sendContribution = function() {
    var id = $('#send-contribution').value;
    console.log(id);
    var newContribution = {
      name: $('#contribution-name').value,
      amount: $('#contribution-amount').value
    }
    $.ajax({
      url: '/api/project/'+id+'/contribution',
      method: 'POST',
      data: newContribution,
      success: function(res){
        $('#contribution-name').value = '';
        $('#contribution-amount').value = '';
        showFlashMessage("Thanks for your contribution! You rock!", 'success');
      },
      error: function(err){
        showFlashMessage('An error ocurred', 'danger');
      }
    });
  }

  var showFlashMessage = function(msg, type){
    $('#contribute').append('<div class="alert alert-'+type+'">' + msg + '</div>');
  }




});
