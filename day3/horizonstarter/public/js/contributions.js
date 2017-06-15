$(document).on('ready', function(){
  $('#send-contribution').on('click', function(event){
    sendContribution();
  })

var sendContribution = function(){
  var newContribution = {
    name: $('#name').val(),
    amount: $('#amount').val()
  };
  $.ajax({
    url: '/api/project/:projectid/contribution',
    method: 'post',
    success: function(res){

    }
  })
}



})
