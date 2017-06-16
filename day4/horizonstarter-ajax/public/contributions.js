$('#amountContributed').on('click', function(event){
  event.preventDefault();
  var self = $(this);
  sendContribution();
});
function sendContribution(o) {
  $.ajax({
    method:'post',
    url:'/api/project/' + o.val() + '/contribution',
    data:{
      name: o.siblings('#name').val(),
      amount: o.siblings('#amount').val()
    },
    success:function(res) {
      
    }
  })
}

function showFlashMessage(msg, type) {
  var display = `<div class="alert alert-danger alert-dismissable fade in">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    <strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
  </div>`
  $('.h1').append(display)
};
