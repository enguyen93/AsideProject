jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

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
        $("#twitch-embed").empty();
        console.log(response.streams[0].channel.display_name)
        var twitchDisplayName = response.streams[0].channel.display_name;
        new Twitch.Embed("twitch-embed", {
            width: 854,
            height: 480,
            channel: twitchDisplayName //search input goes here
        });
    });
})

// AJAX Call for GiantBomb API
$("#test-Btn").on("click", function () {
    event.preventDefault();
    var input = $("#testsearch").val().trim();
    $.ajax({
        url: "https://api-endpoint.igdb.com/games/?search=" + input + "&fields=*&limit=1",
        method: "GET",
        headers: {
            "user-key": "64bac0cd3f7f63493f86d418dc5f3363",
            Accept: "application/json"
        }
    }).then(function (response) {
        $("#testsearch").val("");
        $("#gameNameHolder").empty();
        $("#gameCover").empty();
        $("#gameRating").empty();
        $("#gameSummary").empty();
        var gameName = $("<p>");
        //Line Associated with the Image

        picUrl = response[0].cover.url;
        var gamePic = $("<img>").attr("src", picUrl);

        var gameRatingJS = $("<p>");
        var gameSummaryJS = $("<p>");

        //Line Associated with the Image
        gamePic.css({"width": "200px", "height": "200px", "border-radius": "12px"});

        gameName.html(response[0].name);
        gameName.css({"font-size": "200%"});
        gameRatingJS.html(response[0].total_rating);
        gameRatingJS.css({"font-size": "250%"});
        gameSummaryJS.html(response[0].summary);
        number = response[0].total_rating;
        newNumber = Math.round(number);
        $("#gameNameHolder").append(gameName);

        //Line Associated with the Image
        $("#gameCover").append(gamePic);

        $("#gameRating").append("Rating out of 100: " + newNumber);
        $("#gameSummary").append(gameSummaryJS);
        console.log(response);
        console.log(response[0].name);
        console.log(response[0].cover.url);
        console.log(response[0].total_rating);
        console.log(response[0].summary);
    });

})

