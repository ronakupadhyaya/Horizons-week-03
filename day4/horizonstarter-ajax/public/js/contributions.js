$("#send-contribution").on('click',function(event) {
  event.preventDefault();
  var self = $(this);
  sendContribution(self);
});

function sendContribution(self) {
  $.ajax({
    method:'post',
    url:'/api/project/'+ self.val() +'/contribution',
    data: {
      name: self.siblings('#name').val(),
      amount: self.siblings('#amount').val()
    },
    success:function(res) {
      var newest = parseInt($('#contriNum').text()) + parseInt(self.siblings('#amount').val());
      self.siblings('#name').val("");
      self.siblings('#amount').val("")
      $('#contriNum').text(newest)
      showFlashMessage("Thanks for your contribution! You rock!",'success')
    },
    error: function(err,res) {
      showFlashMessage(err.responseJSON[0].msg, 'danger');
    }
  })
};

function showFlashMessage(msg,type) {
  var flashMeg = $(`<div class="alert alert-${type}">
                    ${msg}
                    </div>`);
  $('h1').after(flashMeg)
};
