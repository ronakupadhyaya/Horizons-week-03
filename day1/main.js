"use strict";
window.fb = window.fb || {};

fb.url = "https://fb.horizonsbootcamp.com/api/1.0";

fb.Person = function(id, token, fname, lname) {
    this.id = id || '';
    this.token = token || '';
    this.fname = fname || '';
    this.lname = lname || '';
}

fb.invalid = function(id, msg) {
    $(id).text(msg);
    return false;
};

fb.register = function() {
    var email = $('#reg_email').val();
    var password = $('#reg_password').val();
    var fname = $('#reg_fname').val();
    var lname = $('#reg_lname').val();
    var bd = $('#reg_birthday').val();
    if (!email.length || !password.length || !fname.length || !lname.length) {
        fb.invalid("#invalid_reg", "All entries required");
        return false;
    }
    bd = bd.split("/");
    if (!fb.checkBDay(bd)) return false;
    $.ajax({
        url: fb.url + "/users/register",
        method: "POST",
        data: {
            email: email,
            password: password,
            fname: fname,
            lname: lname,
            birthMonth: bd[0],
            birthDay: bd[1],
            birthYear: bd[2]
        },
        success: function(data) {
            $('#register').modal('hide');
            fb.login(email, password);
        },
        error: function(err) {
            fb.invalid('#invalid_reg', JSON.parse(err.responseText).error);
        }
    });
}

fb.login = function(email, password) {

    $.ajax({
        url: fb.url + "/users/login",
        method: "POST",
        data: {
            email: email,
            password: password
        },
        success: function(data) {
            var person = new fb.Person(data.response.id, data.response.token, data.response.user.fname, data.response.user.lname);
            $('#register').modal('hide');
            fb.main(person);

        },
        error: function(err) {

            fb.invalid('#invalid_login', JSON.parse(err.responseText).error);
        }
    });
};

fb.newPost = function(string, person) {
    if (string.length < 1) return fb.invalid("#invalid_post", "Please enter a valid post");
    $.ajax({
        url: fb.url + "/posts",
        method: "POST",
        data: {
            token: person.token,
            content: string
        },
        success: function(data) {
            $('#input_post').val("");
        },
        error: function(err) {
            fb.invalid('#invalid_login', JSON.parse(err.responseText).error);
        }
    });
};

fb.loadPosts = function(person) {

    $.ajax({
        url: fb.url + "/posts",
        method: "GET",
        data: {
            token: person.token
        },
        success: function(data) {
            data.response.forEach(function(item) {
                fb.renderPosts(item);
            })
        },
        error: function(err) {
            console.error(JSON.parse(err.responseText).error);
        }
    });

};

fb.renderPosts = function(item) {
    var name = item.poster.name;
    var content = item.content;
    var stamp = item.createdAt;
    var contentId = item._id;

    _.templateSettings.variable = "rc";

    // Grab the HTML out of our template tag and pre-compile it.
    var template = _.template(
        $("script.post").html()
    );
    // Define our render data (to be put into the "rc" variable).
    var templateData = {
        name: name,
        stamp: stamp,
        contentId: contentId,
        content: content
    };
    console.log(template(templateData));
    $('#postbox').after(
        template(templateData)
    );
}


fb.checkBDay = function(arr) {
    if (arr.length !== 3 || _.map(arr, isNaN).indexOf(true) > -1 || _.range(1900, 2017).indexOf(arr[2]) > -1) {
        return fb.invalid('#invalid_reg', 'Invalid Birthday format. Use MM/DD/YYYY');
    }
    if ([1, 3, 5, 7, 8, 10, 12].indexOf(arr[0]) > 0) {
        if (_.range(1, 32).indexOf(arr[1]) < 0) return fb.invalid('#invalid_reg', 'invalid day in month');
    } else if ([4, 6, 9, 11].indexOf(arr[0]) > 0) {
        if (_.range(1, 31).indexOf(arr[1]) < 0) return fb.invalid('#invalid_reg', 'invalid day in month');
    } else if (arr[0] === 2) {
        if (arr[2] % 400 === 0 && arr[1] !== 29) return fb.invalid('#invalid_reg', 'invalid day in month');
        if (arr[2] % 100 === 0 && arr[1] !== 28) return fb.invalid('#invalid_reg', 'invalid day in month');
        if (arr[2] % 4 === 0 && arr[1] !== 29) return fb.invalid('#invalid_reg', 'invalid day in month');
        if (arr[2] % 4 !== 0 && arr[1] !== 28) return fb.invalid('#invalid_reg', 'invalid day in month');
    } else if (arr[0] < 1 || arr[0] > 12) {
        return fb.invalid('#invalid_reg', 'invalid month');
    } else {
        return true;
    }
};

$(window).load(function(e) {
    e.preventDefault();
    $('#register').modal('show');
});

$('#nav_register').click(function(e) {
    e.preventDefault();
    $('#register').modal('show');
});

$('#nav_login').click(function(e) {
    e.preventDefault();
    $('#register').modal('show');
});

$('#btn_register').click(function(e) {
    e.preventDefault();
    fb.invalid("#invalid_reg", "");
    fb.register();
    

});
$('#btn_login').click(function(e) {
    e.preventDefault();
    fb.invalid("#invalid_login", "");
    var email = $('#login_email').val();
    var password = $('#login_password').val();
    fb.login(email, password);
    
});



fb.main = function(person) {
    $('#input_post').on('keydown', function(e) {
        e.preventDefault();
        if (e.keyCode === 13) {
            fb.newPost($('#input_post').val(), person)
        }
    });
    fb.loadPosts(person);

}
