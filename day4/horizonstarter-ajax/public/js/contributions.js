var self;

$("#contributionForm").on('submit',function(event) {
  event.preventDefault();

  var self = $(this);
  $.ajax({
    method:'post',
    url:'/api/project/'+ $(this).attr('data-project-id') +'/contribution',
    data: $(this).serialize(),
    success:function(res) {
      self[0].reset();
      var newest = res.contributions.reduce(function(a, b) {
        return a + (+b.amount);
      }, 0)
      $('#contriNum').text(newest)
      swal("Good job!", "Thanks for your contribution. You rock!", "success")
      // showFlashMessage("Thanks for your contribution! You rock!",'success')
    },
    error: function(err,res) {
      // showFlashMessage(err.responseJSON[0].msg, 'danger');
      sweetAlert("Oops...", err.responseJSON[0].msg, "error");
    }
  })
});

function showFlashMessage(msg,type) {
  var flashMeg = $(`<div class="alert alert-${type}">
                    ${msg}
                    </div>`);
  $('h1').after(flashMeg)
};

function pollContribution() {
  $.ajax({
    method:'get',
    url:'/api/project/'+ $('.project').attr('id'),
    success:function(res) {
      var newestTotal = res.contributions.reduce(function(a,b){
                          return a+b.amount
                        },0)
      $('#contriNum').text(newestTotal)
      if (newestToal >= res.goal) {
        clearInterval(currentInterval)
      }
    }
  })
}

var currentInterval = setInterval(pollContribution,5000)
