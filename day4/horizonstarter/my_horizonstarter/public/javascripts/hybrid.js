console.log("here")
var url = '/api/projects/' + projectId + '/contributions';

function getContributions() {
    // check for new contributions
    $.ajax(url, {

        success: function(e) {
        console.log("worked!")
        $("#contributions").empty();

        e.forEach(function(elem) {
            var wrapper = $('<div class = "elem"></div>');
            var title = $('<h4>' + elem.name + ' contributed $' + elem.donation + '</h4>');
            var comment = $('<p>Commented ' + elem.comment +'</p>');
            title.append(comment);
            wrapper.append(title);
            $('#contributions').append(wrapper);
            })
        }
    })

}

$(function() {
 // Attach the form event handler and block default submit action.
 // $('#submit').click(function(event) {
 //   event.preventDefault();
 //   newContribution();
 // });

 // Poll for new updates every 10 seconds.
 setInterval(getContributions, 10000);
});