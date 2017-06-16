$(document).ready(function() {

  $('#send-contribution').on('click', function(event){
    event.preventDefault(); // I THINK
    sendContribution();
  })


}


function sendContribution(){
  var name = $('#contributor').val();
  var amount = $('#contribution-amount').val();

  // $.ajax({
  //   url: '/up',
  //   method: 'post',
  //   success: function(res){
  //     //console.log('success', res);
  //     $('#count').text(res.count);
  //   }
  // })

  $.ajax({
    url: "/api/project/:projectid/contribution",
    method: 'post',
    body: {
      name: name,
      amount: amount
    }
    success: function(res){
      showFlashMessage('Thanks for your contribution', 'success');
      console.log('SUCCESS MFER', res);

    },
    error: function(err){
      showFlashMessage('Something went wrong', 'danger');
      console.log('FAILURE', err);

    }

  })

}

function showFlashMessage(msg, type){

  console.log("showFlashMessage in here");

  var alert;
  if(type === 'success'){
    alert = `<div class = "alert alert-success"> ${msg} </div>`;
  }else{
    alert = `<div class = "alert alert-wanring"> ${msg} </div>`;
  }

  $('body').append(alert);
}
