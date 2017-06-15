$("#send-contribution").on('click',function(event) {
  console.log("con");
  event.preventDefault();

  sendContribution();
})

function sendContribution() {
  $.ajax({
    method:'post',
    url:'/api/project/'+$(this).val() +'/contribution',
    data: {
      name: $(this).siblings('#name').val(),
      amount: $(this).siblings('#amount').val()
    },
    success:function() {
      showFlashMessage("Thanks for your contribution! You rock!",'success')
    },
    error: function() {
      showFlashMessage("An error occurred", 'danger');
    }
  })
}

function showFlashMessage(msg,type) {
  var flashMeg = $(`<div class="alert alert-${type}">
                    ${msg}
                    </div>`);
  console.log(flashMeg)
  $('h1').after(flashMeg)
  console.log($('h1'))
}
