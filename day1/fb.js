    // "id": "575ebd221fc741fd28d1b582",
    // "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFzY2h1Z2FydEBjb2xsZWdlLmhhcnZhcmQuZHUifQ.kbP5e0_cJFpyCOwQRetoK8aW1BR6wj-BsLC-Sz5Exd0"

var apiURL = "https://fb.horizonsbootcamp.com/api/1.0"

$.ajax(apiUrl + "/users/register", {
      method: "POST",
      data: {
        email: horello.apiKey,
        password: horello.apiToken,
        fname: name,
        lname: desc,
        birthMonth: this.getId(),
        birthDay: ,
        birthYear:
      },
      success: function (data) {
      },
      error: function (err) {
        console.error("Error");
      }
    }