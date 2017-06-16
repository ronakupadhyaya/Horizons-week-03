// Make an AJAX request to GET /api/projects. Remember to send the correct params.
// For example: If the "funded" button was clicked, perform the following request
// GET localhost:3000/api/projects?funded=true . console.log your posts on the
// success callback of the AJAX request to make sure you are getting the correct posts.

$(document).ready(function() {
  $("#funded").on("click", function(event) {
    console.log("hi");
    event.preventDefault();
    $.ajax({
      url: "/api/projects?funded=true",
      method: "GET",
      success: function(data) {
        $(".inner").empty();
        console.log(data);
        data.array.forEach(function(elem){
          var contr = elem.contributions;
          var totString = "";
          contr.forEach(function(contribution) {
            totString += `<p>Name: `+ contribution.name +` Amount:`+ contribution.amount +`</p>`;
          })
          var pic = "";
          if (elem.url) {
            pic = `<li><img src="`+ elem.url +`"></li>`;
          }
          $(".inner").append(`
            <div class="project dropdown">
              <button data-toggle="dropdown" type="button" class="title-button dropdown-toggle"><h3>` + elem.title + `</h3><span class="caret"></span></button>

              <ul id="` + elem.title + `" class="dropdown-menu dropmenu">
                <li><p><strong>Description</strong>: ` + elem.description + `</p></li>
                <li><p><strong>Id</strong>: ` + elem._id + `</p></li>
                <li><p><strong>Goal</strong>: ` + elem.goal + `</p></li>
                <li><p><strong>Category</strong>: ` + elem.category + `</p></li>
                <li><p><strong>Contributions</strong>:
                ` + totString + `</p></li>
                ` + pic + `
              </ul>
            </div>
            `)
        })
      },
      error: function(err) {
        console.log(err);
      }
    })
  })
  $("#not-funded").on("click", function(event) {
    event.preventDefault();
    $.ajax({
      url: "/api/projects?funded=false",
      method: "GET",
      success: function(data) {
        $(".inner").empty();
        console.log(data);
        data.array.forEach(function(elem){
          var contr = elem.contributions;
          var totString = "";
          contr.forEach(function(contribution) {
            totString += `<p>Name: `+ contribution.name +` Amount:`+ contribution.amount +`</p>`;
          })
          var pic = "";
          if (elem.url) {
            pic = `<li><img src="`+ elem.url +`"></li>`;
          }
          $(".inner").append(`
            <div class="project dropdown">
              <button data-toggle="dropdown" type="button" class="title-button dropdown-toggle"><h3>` + elem.title + `</h3><span class="caret"></span></button>

              <ul id="` + elem.title + `" class="dropdown-menu dropmenu">
                <li><p><strong>Description</strong>: ` + elem.description + `</p></li>
                <li><p><strong>Id</strong>: ` + elem._id + `</p></li>
                <li><p><strong>Goal</strong>: ` + elem.goal + `</p></li>
                <li><p><strong>Category</strong>: ` + elem.category + `</p></li>
                <li><p><strong>Contributions</strong>:
                ` + totString + `</p></li>
                ` + pic + `
              </ul>
            </div>
            `)
        })
      },
      error: function(err) {
        console.log(err);
      }
    })
  })
  $("#show-all").on("click", function(event) {
    event.preventDefault();
    $.ajax({
      url: "/api/projects",
      method: "GET",
      success: function(data) {
        $(".inner").empty();
        console.log(data);
        data.array.forEach(function(elem){
          var contr = elem.contributions;
          var totString = "";
          contr.forEach(function(contribution) {
            totString += `<p>Name: `+ contribution.name +` Amount:`+ contribution.amount +`</p>`;
          })
          var pic = "";
          if (elem.url) {
            pic = `<li><img src="`+ elem.url +`"></li>`;
          }
          $(".inner").append(`
            <div class="project dropdown">
              <button data-toggle="dropdown" type="button" class="title-button dropdown-toggle"><h3>` + elem.title + `</h3><span class="caret"></span></button>

              <ul id="` + elem.title + `" class="dropdown-menu dropmenu">
                <li><p><strong>Description</strong>: ` + elem.description + `</p></li>
                <li><p><strong>Id</strong>: ` + elem._id + `</p></li>
                <li><p><strong>Goal</strong>: ` + elem.goal + `</p></li>
                <li><p><strong>Category</strong>: ` + elem.category + `</p></li>
                <li><p><strong>Contributions</strong>:
                ` + totString + `</p></li>
                ` + pic + `
              </ul>
            </div>
            `)
        })
      },
      error: function(err) {
        console.log(err);
      }
    })
  })
  $("#amt-asc").on("click", function(event) {
    event.preventDefault();
    $.ajax({
      url: "/api/projects?sort=amountFunded",
      method: "GET",
      success: function(data) {
        $(".inner").empty();
        console.log(data);
        data.array.forEach(function(elem){
          var contr = elem.contributions;
          var totString = "";
          contr.forEach(function(contribution) {
            totString += `<p>Name: `+ contribution.name +` Amount:`+ contribution.amount +`</p>`;
          })
          var pic = "";
          if (elem.url) {
            pic = `<li><img src="`+ elem.url +`"></li>`;
          }
          $(".inner").append(`
            <div class="project dropdown">
              <button data-toggle="dropdown" type="button" class="title-button dropdown-toggle"><h3>` + elem.title + `</h3><span class="caret"></span></button>

              <ul id="` + elem.title + `" class="dropdown-menu dropmenu">
                <li><p><strong>Description</strong>: ` + elem.description + `</p></li>
                <li><p><strong>Id</strong>: ` + elem._id + `</p></li>
                <li><p><strong>Goal</strong>: ` + elem.goal + `</p></li>
                <li><p><strong>Category</strong>: ` + elem.category + `</p></li>
                <li><p><strong>Contributions</strong>:
                ` + totString + `</p></li>
                ` + pic + `
              </ul>
            </div>
            `)
        })
      },
      error: function(err) {
        console.log(err);
      }
    })
  })
  $("#amt-des").on("click", function(event) {
    event.preventDefault();
    $.ajax({
      url: "/api/projects?sort=amountFunded&sortDirection=descending",
      method: "GET",
      success: function(data) {
        $(".inner").empty();
        console.log(data);
        data.array.forEach(function(elem){
          var contr = elem.contributions;
          var totString = "";
          contr.forEach(function(contribution) {
            totString += `<p>Name: `+ contribution.name +` Amount:`+ contribution.amount +`</p>`;
          })
          var pic = "";
          if (elem.url) {
            pic = `<li><img src="`+ elem.url +`"></li>`;
          }
          $(".inner").append(`
            <div class="project dropdown">
              <button data-toggle="dropdown" type="button" class="title-button dropdown-toggle"><h3>` + elem.title + `</h3><span class="caret"></span></button>

              <ul id="` + elem.title + `" class="dropdown-menu dropmenu">
                <li><p><strong>Description</strong>: ` + elem.description + `</p></li>
                <li><p><strong>Id</strong>: ` + elem._id + `</p></li>
                <li><p><strong>Goal</strong>: ` + elem.goal + `</p></li>
                <li><p><strong>Category</strong>: ` + elem.category + `</p></li>
                <li><p><strong>Contributions</strong>:
                ` + totString + `</p></li>
                ` + pic + `
              </ul>
            </div>
            `)
        })
      },
      error: function(err) {
        console.log(err);
      }
    })
  })
  $("#per-asc").on("click", function(event) {
    event.preventDefault();
    $.ajax({
      url: "/api/projects?sort=percentageFunded",
      method: "GET",
      success: function(data) {
        $(".inner").empty();
        console.log(data);
        data.array.forEach(function(elem){
          var contr = elem.contributions;
          var totString = "";
          contr.forEach(function(contribution) {
            totString += `<p>Name: `+ contribution.name +` Amount:`+ contribution.amount +`</p>`;
          })
          var pic = "";
          if (elem.url) {
            pic = `<li><img src="`+ elem.url +`"></li>`;
          }
          $(".inner").append(`
            <div class="project dropdown">
              <button data-toggle="dropdown" type="button" class="title-button dropdown-toggle"><h3>` + elem.title + `</h3><span class="caret"></span></button>

              <ul id="` + elem.title + `" class="dropdown-menu dropmenu">
                <li><p><strong>Description</strong>: ` + elem.description + `</p></li>
                <li><p><strong>Id</strong>: ` + elem._id + `</p></li>
                <li><p><strong>Goal</strong>: ` + elem.goal + `</p></li>
                <li><p><strong>Category</strong>: ` + elem.category + `</p></li>
                <li><p><strong>Contributions</strong>:
                ` + totString + `</p></li>
                ` + pic + `
              </ul>
            </div>
            `)
        })
      },
      error: function(err) {
        console.log(err);
      }
    })
  })
  $("#per-asc").on("click", function(event) {
    event.preventDefault();
    $.ajax({
      url: "/api/projects?sort=percentageFunded",
      method: "GET",
      success: function(data) {
        $(".inner").empty();
        console.log(data);
        data.array.forEach(function(elem){
          var contr = elem.contributions;
          var totString = "";
          contr.forEach(function(contribution) {
            totString += `<p>Name: `+ contribution.name +` Amount:`+ contribution.amount +`</p>`;
          })
          var pic = "";
          if (elem.url) {
            pic = `<li><img src="`+ elem.url +`"></li>`;
          }
          $(".inner").append(`
            <div class="project dropdown">
              <button data-toggle="dropdown" type="button" class="title-button dropdown-toggle"><h3>` + elem.title + `</h3><span class="caret"></span></button>

              <ul id="` + elem.title + `" class="dropdown-menu dropmenu">
                <li><p><strong>Description</strong>: ` + elem.description + `</p></li>
                <li><p><strong>Id</strong>: ` + elem._id + `</p></li>
                <li><p><strong>Goal</strong>: ` + elem.goal + `</p></li>
                <li><p><strong>Category</strong>: ` + elem.category + `</p></li>
                <li><p><strong>Contributions</strong>:
                ` + totString + `</p></li>
                ` + pic + `
              </ul>
            </div>
            `)
        })
      },
      error: function(err) {
        $(".inner").append(
          `<div class="alert alert-danger">` + err + `</div>`
        );
      }
    })
  })

  $("#go").on("click", function() {
    var text = $("#txt").val();
    $.ajax({
      url: "/api/projects",
      method: "GET",
      success: function(data) {
        var array = data.array;
        array = array.filter(function(elem) {
          console.log(elem.title.indexOf(text));
          if (elem.title.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
            return true;
          }
          return false;
        })
        $(".inner").empty();
        console.log(data);
        array.forEach(function(elem){
          var contr = elem.contributions;
          var totString = "";
          contr.forEach(function(contribution) {
            totString += `<p>Name: `+ contribution.name +` Amount:`+ contribution.amount +`</p>`;
          })
          var pic = "";
          if (elem.url) {
            pic = `<li><img src="`+ elem.url +`"></li>`;
          }
          $(".inner").append(`
            <div class="project dropdown">
              <button data-toggle="dropdown" type="button" class="title-button dropdown-toggle"><h3>` + elem.title + `</h3><span class="caret"></span></button>

              <ul id="` + elem.title + `" class="dropdown-menu dropmenu">
                <li><p><strong>Description</strong>: ` + elem.description + `</p></li>
                <li><p><strong>Id</strong>: ` + elem._id + `</p></li>
                <li><p><strong>Goal</strong>: ` + elem.goal + `</p></li>
                <li><p><strong>Category</strong>: ` + elem.category + `</p></li>
                <li><p><strong>Contributions</strong>:
                ` + totString + `</p></li>
                ` + pic + `
              </ul>
            </div>
            `)
          })
          $("#txt").val("");
      },
      error: function(err) {
        console.log(err);
      }
    })
  })
})
