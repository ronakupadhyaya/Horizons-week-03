var poster = null;
var pages = 1;

$('#login-btn').click(function() {
  var email = $('#email-input').val();
  var pw = $('#password-input').val();
  if (email.length > 0 && pw.length > 0) {
    poster = new facebook.User(email, pw);
    poster.login();
    setInterval(function() {
      poster.updateFeed();
    }, 2000);
    var email = $('#email-input').val('');
    var pw = $('#password-input').val('');
  }
});

$('#post-btn').click(function() {
  var content = $('#post-content').val();
  if (content.length > 0) {
    poster.publishPost(content);
    $('#post-content').val('');
  }
});

var bottomOnce = false;
window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && (!bottomOnce)) {
    console.log(pages);
    pages++ ? pages < 3: pages;
    poster.loadPosts(pages);

    bottomOnce = true;
    setTimeout(function() {
      bottomOnce = false;
    }, 1000);
  }
};
