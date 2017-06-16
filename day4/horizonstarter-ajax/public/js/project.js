$(document).ready(function() {


$('#filter').on('click', function(event) {
  event.preventDefault();
  var sort = $('#sort').val();
  var sortDirection=$('#sortDirection').val();
  var funded=$('#funded').val();
  console.log(sort, sortDirection, funded);
  var url = `/api/projects?sort=${sort}&sortDirection=${sortDirection}&funded=${funded}`;
  $.ajax({
    url: url,
    method: 'get',
    success: function(res) {
      $('#posts').empty();
      for(var i=0; i<res.length; i++) {
        var id = res[i]._id;
        var image = res[i].image;
        var title = res[i].title;
        $('#posts').append(`<div class="">
          <a class="btn-block btn-group-vertical" href="/project/${id}" >
              <button class = "btn btn-success" type="submit" name="button"> <img src="${image}" style="width: 20%; height: 20%;"> ${title}</button> </a>
        </div>`)
      }
    },
  })
})


$('#showAll').on('click', function(event) {
  event.preventDefault();
  var url = `/api/projects`;
  $.ajax({
    url: url,
    method: 'get',
    success: function(res) {
      $('#posts').empty();
      for(var i=0; i<res.length; i++) {
        var id = res[i]._id;
        var image = res[i].image;
        var title = res[i].title;
        $('#posts').append(`<div class="">
          <a class="btn-block btn-group-vertical" href="/project/${id}" >
              <button class = "btn btn-success" type="submit" name="button"> <img src="${image}" style="width: 20%; height: 20%;"> ${title}</button> </a>
        </div>`)
      }
    },
  })
})

// $('#showAll').on('click', function(event) {
//   event.preventDefault();
//   $.ajax({
//     url: var,
//     method: 'get',
//     success: function(res) {
//
//     },
//   })
// })


})
