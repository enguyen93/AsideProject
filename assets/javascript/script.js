// AJAX Call for the IGDB API
$.ajax({
    url: "https://api-endpoint.igdb.com/games/?search=fifa 17&fields=*&limit=1",
    method: "GET",
    headers: {
    "user-key": "22d06d3a0ff901d9650f3de64e9a8e42",
    Accept: "application/json",
    'Access-Control-Allow-Origin': 'https://enguyen93.github.io/AsideProject/'
  }
  }).then(function(response) {
    console.log(response);
  });

  
  //CORS with igdb api req
//   $.ajax({
//     type: 'GET',
//     url: "https://api-endpoint.igdb.com/games/?search=fifa 17&fields=*&limit=!",
//     contentType: 'text/plain',
//     xhrFields: {
//       withCredentials: false
//     },
//     headers: {
//       'Access-Control-Allow-Origin': true,
//       "user-key": "22d06d3a0ff901d9650f3de64e9a8e42",
//       Accept: "application/json"
//     }, 
//     success: function(response) {
//       console.log(response);
//     },  
//     error: function() {
//     }
//   });




// AJAX Call for GiantBomb API
// $.ajax({
//     url: "http://www.giantbomb.com/api/game/3030-4725/?api_key=[ee3742a57f440a418aa47f74420db3332c56ae4d]",
//     method: "GET",
//     'Access-Control-Allow-Origin': '*'
//   }).then(function(response) {
//     console.log(response);
//   });


//cors with giantbomb api req
//   $.ajax({
//     type: 'GET',
//     url: "http://www.giantbomb.com/api/game/3030-4725/?api_key=[ee3742a57f440a418aa47f74420db3332c56ae4d]",
//     contentType: 'text/plain',
//     xhrFields: {
//       withCredentials: false
//     },
//     headers: {
//       'Access-Control-Allow-Origin': true
//     }, 
//     success: function(response) {
//       console.log(response);
//     },  
//     error: function() {
//     }
//   });








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
