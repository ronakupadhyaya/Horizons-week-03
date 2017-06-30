$(document).ready(function() {
  $('#showall').on('click', function(evt) {
    evt.preventDefault();
    $.ajax({
      url: '/api/projects',
      method: 'get',
      success: function(resp) {
      //  console.log("Show all SUCCESS");
        $('#projects').empty();
        resp.forEach(function(item) {
          var string = `<div class="panel panel-info" style="width:70%; padding:10px">
            <div class="panel-heading">
              <div style="font-size: 20px;">
                ${item.title}
              </div>
               ${item.start}-${item.end}
            </div>
            <div class="panel-body">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:${item.percentage}%">
                </div>
              </div>
              Goal: $${item.goal}
              <br/>
              ${item.description}
            </div>
            <a href="http://localhost:3000/project/${item._id}" class="btn btn-info" role="button">Donate</a>
          </div>`;
          $('#projects').append(string);
        });
      }
    });
  });

  $('#fullyfunded').on('click', function(evt) {
    evt.preventDefault();
    $.ajax({
      url: '/api/projects',
      method: 'get',
      data: {
        funded:true
      },
      success: function(resp) {
      //  console.log("Show all SUCCESS");
        $('#projects').empty();
        resp.forEach(function(item) {
          var string = `<div class="panel panel-info" style="width:70%; padding:10px">
            <div class="panel-heading">
              <div style="font-size: 20px;">
                ${item.title}
              </div>
               ${item.start}-${item.end}
            </div>
            <div class="panel-body">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:${item.percentage}%">
                </div>
              </div>
              Goal: $${item.goal}
              <br/>
              ${item.description}
            </div>
            <a href="http://localhost:3000/project/${item._id}" class="btn btn-info" role="button">Donate</a>
          </div>`;
          $('#projects').append(string);
        });
      }
    });
  });

  $('#notfullyfunded').on('click', function(evt) {
    evt.preventDefault();
    $.ajax({
      url: '/api/projects',
      method: 'get',
      data: {
        funded:false
      },
      success: function(resp) {
      //  console.log("Show all SUCCESS");
        $('#projects').empty();
        resp.forEach(function(item) {
          var string = `<div class="panel panel-info" style="width:70%; padding:10px">
            <div class="panel-heading">
              <div style="font-size: 20px;">
                ${item.title}
              </div>
               ${item.start}-${item.end}
            </div>
            <div class="panel-body">
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:${item.percentage}%">
                </div>
              </div>
              Goal: $${item.goal}
              <br/>
              ${item.description}
            </div>
            <a href="http://localhost:3000/project/${item._id}" class="btn btn-info" role="button">Donate</a>
          </div>`;
          $('#projects').append(string);
        });
      }
    });
  });
});
