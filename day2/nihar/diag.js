
var dotArr = [];
var counter = 0;
var num = 1;
var color = {
  "1" : "blue",
  "2" : "white",
  "3" : "green",
  "0" : "red"
}

$(document).ready(function() {
  for (var i = 0; i < 20; i++) {
    dotArr.push([]);
    for (var j = 0; j < 20; j++) {
      dotArr[i].push('<div class="red circle"></div>');
    }
  }

  paintDots();

  var clickListener = function () {
    $("#outer").on("click", ".circle", function() {
      $(this).attr("class", counter + "")
      var chil = $(this).parent().children();
      var index;
      for (var i = 0; i < chil.length; i++) {
        if ($(chil[i]).attr("class") === counter + "") {
          index = i;
        }
      }
      counter++;
      console.log(index);
      var column = (index) % 20;
      var row = parseInt(index / 20);
      console.log(column);
      console.log(row);
      if (counter % 4 === 1) {
        dotArr[row][column] = '<div class="blue circle"></div>';
        paintDots();
        setInterval(function() {
          changeColors(row, column, num, "blue");
          num += 1;
        },100);
      }
    })
  }

  var clickListenerGreen = function () {
    $("#outer").on("click", ".circle", function() {
      $(this).attr("class", counter + "")
      var chil = $(this).parent().children();
      var index;
      for (var i = 0; i < chil.length; i++) {
        if ($(chil[i]).attr("class") === counter + "") {
          index = i;
        }
      }
      counter++;
      console.log(index);
      var column = (index) % 20;
      var row = parseInt(index / 20);
      console.log(column);
      console.log(row);
      if (counter % 4 === 1) {
        dotArr[row][column] = '<div class="green circle"></div>';
        paintDots();
        setInterval(function() {
          changeColors(row, column, num, "green");
          num += 1;
        },100);
      }
    })
  }

  clickListener();
})

var changeColors = function(row, column, num, color) {
  for (var i = row - num; i <= row + num; i++) {
    for (var j = column - num; j <= column + num; j++) {
      if (i < 20 && j < 20 && i >= 0 && j >= 0) {
        var string = "";
        string += "<div class=";
        string += color;
        string += ` circle"></div>`;
        dotArr[i][j] = string;
      }
    }
  }
  if ((row + num) < 20 && column < 20) {
    dotArr[row + num][column] = '<div class="blue circle"></div>';
  }
  if ((row - num) >=0 && column < 20) {
    dotArr[row - num][column] = '<div class="blue circle"></div>';
  }
  if (row < 20 && (column + num) < 20) {
    dotArr[row][column + num] = '<div class="blue circle"></div>';
  }
  if (row < 20 && (column - num) >= 0) {
    dotArr[row][column - num] = '<div class="blue circle"></div>';
  }
  paintDots();
  // changeColors(row + 1, column);
  // changeColors(row - 1, column);
  // changeColors(row, column + 1);
  // changeColors(row, column - 1);
}

var paintDots = function() {
  $("#outer").html("");
  console.log(dotArr);
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      $("#outer").append(dotArr[i][j]);
    }
  }
}
