$('#funded').on('click', function(e) {
  e.preventDefault();
  $.ajax('/api/project?funded=true', {
    success: function(data) {
      handleProjSuccess(data);
    }, error: function(error) {
      handleProjError(error)
    }
  });
});

$('#not-funded').on('click', function(e) {
  e.preventDefault();
  $.ajax('/api/project?funded=false', {
    success: function(data) {
      handleProjSuccess(data);
    }, error: function(error) {
      handleProjError(error);
    }
  });
});

$('#all-projects').on('click', function(e) {
  e.preventDefault();
  $.ajax('/api/project/', {
    success: function(data) {
      handleProjSuccess(data);
    }, error: function(error) {
      handleProjError(error);
    }
  });
});


var handleProjSuccess = function(data) {
  // clear projects div

  //turn each project into an HTML and append to projects div

$('.projects').empty();
console.log(data);
  data.forEach(function(item) {

    var projectHTML = $('<div><a href="/project/' + item._id+'"</a>'+item.title+'</div>');
    $('.projects').append(projectHTML);
  })

  // show flashmessage
  //showFlashMessage(true, 'Filtered!');
};

var handleProjError = function(error) {
  // show flashmessage
  var responseText = JSON.parse(error.responseText);
  showFlashMessage(false, responseText.message);
};
