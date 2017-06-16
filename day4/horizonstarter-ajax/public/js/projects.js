$("#funded").on("click", function (event) {
  $.ajax({
    url: "/api/projects?funded=true",
    success: function (res) {
      $("#projectList").empty();
      res.forEach(function (item) {
        var tmp = `<span>Title: </span>
        <span>${item.title}</span>
        <div>
        <a href="http://localhost:3000/project/${item.id}">go to project</a>
        </div>
        </div>`
        $("#projectList").append(tmp);
        $("#funded").text("by amountFunded");
        $("#not-funded").text("by %");
      });
      console.log(res);
    },
    error: function (res) {
      console.log("error in funded click")
    }
  });
});

$("#not-funded").on("click", function (event) {
  if ($("#not-funded").text() === "by %") {

    $.ajax({
      url: "/api/projects?funded=false&sort=percentageFunded",
      success: function (res) {
        $("#projectList").empty();
        res.forEach(function (item) {
          var tmp = `<span>Title: </span>
        <span>${item.title}</span>
        <div>
        <a href="http://localhost:3000/project/${item.id}">go to project</a>
        </div>
        </div>`
          $("#projectList").append(tmp);
          $("#funded").text("asc");
          $("#not-funded").text("dec");

        });
        console.log(res);
      },
      error: function (res) {
        console.log("error in fnot-funded click")
      }
    });

  }
  if ($("#not-funded").text() === "asc") {
    $.ajax({
      url: "/api/projects?funded=false&sort=percentageFunded&sortDir=asc",
      success: function (res) {
        $("#projectList").empty();
        res.forEach(function (item) {
          var tmp = `<span>Title: </span>
        <span>${item.title}</span>
        <div>
        <a href="http://localhost:3000/project/${item.id}">go to project</a>
        </div>
        </div>`
          $("#projectList").append(tmp);
          $("#funded").text("asc");
          $("#not-funded").text("dec");

        });
        console.log(res);
      },
      error: function (res) {
        console.log("error in fnot-funded click")
      }
    });
  } else {
    $.ajax({
      url: "/api/projects?funded=false",
      success: function (res) {
        $("#projectList").empty();
        res.forEach(function (item) {
          var tmp = `<span>Title: </span>
        <span>${item.title}</span>
        <div>
        <a href="http://localhost:3000/project/${item.id}">go to project</a>
        </div>
        </div>`
          $("#projectList").append(tmp);
          $("#funded").text("by amountFunded");
          $("#not-funded").text("by %");

        });
        console.log(res);
      },
      error: function (res) {
        console.log("error in fnot-funded click")
      }
    });
  }
});

$("#all").on("click", function (event) {
  $.ajax({
    url: "/api/projects",
    success: function (res) {
      console.log(res);
    },
    error: function (res) {
      console.log("error in funded click")
    }
  });
});
