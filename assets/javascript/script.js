//Testing and figuring out how the AJAX call for the twitch API works
//If it errors 400, check Client ID(update)

$("#test-Btn").on("click", function () {
    event.preventDefault();
    var input = $("#testsearch").val().trim();
    $.ajax({

        type: "GET",
        url: "https://api.twitch.tv/kraken/streams/?game=" + input,
        headers: {
            "Client-ID": "3h185ufea6321xhqh2fawi17uy1uoy",
            "Accept": "application/vnd.twitchtv.v5+json"
        },
    }).then(function (response) {
        console.log(response);
    });

})

