$(document).ready(function(){
  $('#send-contribution').on('click',function(event){
    // alert(this);
    var url = window.location.pathname;
    // alert(window.location.pathname);
    console.log("Add contrib clicked");
    event.preventDefault();
    sendContribution.bind(this)(url);

  })


  function sendContribution(url){
    event.preventDefault();
    var buttonthis = this;
    // alert(buttonthis);
    var newContribution = {
      name: $('#contribnamefield').val(),
      amount: $('#contribamountfield').val()
    }
    $.ajax({
      url: '/api'+url+'/contribution',
      method: 'post',
      data: {
        contribution: newContribution
      },
      success: function(resp){
        $('#contribnamefield').val("");
        $('#contribamountfield').val("");
        showFlashMessage('thanks for your contribution','success');
        console.log("contribution successful");
      },
      error: function(err){
        showFlashMessage('an error occured','danger');
        console.log("failed");
      }
    })
  }

  function showFlashMessage(msg,style){
    // alert(this);
    $(`<div class='alert alert-${style}'>${msg}</div>`).insertBefore('#projectheader');
  }
})
