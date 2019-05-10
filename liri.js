// this code require to be first
require("dotenv").config();

//create the variables for each ones that will need
var spotify = require("node-spotify-api");
var spotify = new spotify(keys.spotify); // access spotify key info
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var nodeArg = process.argv[2];
var search = "";


// concert-this 
function getConcert(artistName){
  var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
          console.log(queryUrl);
      axios.get(queryUrl)
        .then(function (response){
        if(response.data.length >= 10){
            for(var i=2; i<respond.data; i++){
            console.log(respond.data[i].venue.name);
            console.log(data[i].venue.city + ", " + response.data[i].venue.region);
            };
            var concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY hh:00:A");
            console.log("Date and time: + ${concertDate}\n\n - - - - -");
        }else{
          console.log("Band or concert not found!"); 
        }
    }
}
// spotify-this-song
function getSpotify(songName){
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var spotifyArr = data.tracks.items;
    for(i=0, i < spotifyArr.length; i++){
      console.log(songName); 
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Preview: " + data.tracks.items[0].album.external_urls.spotify);
      console.log("Album: " + data.tracks.items[0].album.name);
    };
  });
}
// movie-this





// do-what-it-says




// set any environment variables with the dotenv package

