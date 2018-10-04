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
        //Lines below empty out the Holders on a new search, so that things don't stack
        //This way we don't get more than 1 twitch stream at a time, taking up too many resources
    }).then(function (response) {
        $("#testsearch").val("");
        $("#gameNameHolder").empty();
        $("#gameCover").empty();
        $("#gameRating").empty();
        $("#gameSummary").empty();
        //Creating new Divs to store things in
        var gameName = $("<p>");
        picUrl = response[0].cover.url;
        var gamePic = $("<img>").attr("src", picUrl);
        var gameRatingJS = $("<p>");
        //variable to make the bar
        var makeProgress = $("#barHolder").addClass("progress");
        var gameSummaryJS = $("<p>");
        number = response[0].total_rating;
        newNumber = Math.round(number); 

        //Dynamically creating a bootstrap progress bar
        makeProgress.addClass("progress-bar progress-bar-striped progress-bar-animated");
        makeProgress.attr("role", "progressbar");
        makeProgress.attr("aria-valuenow", newNumber);
        makeProgress.attr("aria-valuemin", "0");
        makeProgress.attr("aria-valuemax", "100");
        makeProgress.css({"width": "75%"});
        //Styling the Divs and storing the content inside them
        gamePic.css({"width": "200px", "height": "200px", "border-radius": "12px"});
        gameName.html(response[0].name);
        gameName.css({"font-size": "200%", "font-weight": "bold"});
        gameRatingJS.html(response[0].total_rating);
        gameSummaryJS.html(response[0].summary);
        $("#gameRating").css({"font-size": "175%"});
        $("#gameSummary").css({"font-size": "105%", "font-weight": "bold"});
        //Appending them to make them show up
        $("#gameNameHolder").append(gameName);
        $("#gameCover").append(gamePic);
        $("#gameRating").append("Rating out of 100: " + newNumber);
        $("#barholder").append(makeProgress);
        $("#gameSummary").append(gameSummaryJS);

        //test
        console.log(response);
        console.log(response[0].name);
        console.log(response[0].cover.url);
        console.log(response[0].total_rating);
        console.log(response[0].summary);
    });
})

//For some reason, the Img url does NOT work locally, but it does work on the github pages io link
