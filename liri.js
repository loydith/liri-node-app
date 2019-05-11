// this code require to be first
require("dotenv").config();

//create the variables for each ones that will need
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify); // access spotify key info
var moment = require("moment");
var fs = require("fs");
var axios = require("axios");
let command = process.argv[2];


function switchCase() {

  switch (command) {

    case 'concert-this':
      getConcert(artist);                   
      break;                          

    case 'spotify-this-song':
      getSong(songName);
      break;

    case 'movie-this':
      getMovie(movieName);
      break;

    case 'do-what-it-says':
      getIt();
      break;
  }
};


// concert-this 
function getConcert(artist){
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
          // console.log(queryUrl);
      axios.get(queryUrl)
        .then(function (response){
        if(response.data.length <= 10){
            for(var i=2; i<response.data; i++){
            console.log(response.data[i].venue.name);
            console.log(response.data[i].venue.region);
            var concertDate = moment(response.data[i]).format("MM/DD/YYYY");
            console.log("Date of the Event :" + concertDate);
          };

        }else{
          console.log("Band in Town Artist not found!"); 
        }
    });
    // create the details for the new file log.txt
    var addLog = {
      name: response.data[i].venue.name,
      location: response.data[i].venue.region,
      date: momentmoment(response.data[i]).format("MM/DD/YYYY")
  };
  
    fs.appendFile("log.txt", JSON.stringify(addLog, null, 2), function(err) {
      if (err) {
      console.log(err);
      return;
      } else {  
      console.log("concert-this added!");
      }
    });
  //   .catch(function (error) {
  //     console.log(error);
  // });

}
// spotify-this-song
function getSong(songName){
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }else{
      console.log(songName); 
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Preview: " + data.tracks.items[0].album.external_urls.spotify);
      console.log("Album: " + data.tracks.items[0].album.name);
      }
    
 // create the details for the new file log.txt
      var addLog = {
        artist: data.tracks.items[0].artists[0].name,
        songName: data.tracks.items[0].name,
        preview: data.tracks.items[0].album.external_urls.spotify,
        album: data.tracks.items[0].album.name
      };

      fs.appendFile("log.txt", JSON.stringify(addLog, null, 2), function(err) {
         if (err) {
            console.log(err);
            // Log the error and send a message to the user here
            return;
          } else {    
            console.log("spotify-this-song added!");
          }
        });
}
// movie-this
function getMovie(movieName){
  axios.get("http://www.omdbapi.com/?t= + movieName + =&plot=short&apikey=trilogy")
  .then(function(response) {
    // Then we print out the imdbRating
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value); 
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log("\n---------------------------------------------------\n");
  });
  // create the details for the new file log.txt
        var addLog = {
                title: response.data.Title,
                year: response.data.Year,
                imdbRating: response.data.imdbRating,
                rottenTomatoesRating: response.data.Ratings[1].Value,
                countryProduced: response.data.Country,
                language: response.data.Language,
                plot: response.data.Plot,
                actors: response.data.Actors,
                };
        fs.appendFileSync("log.txt", JSON.stringify(addLog, null, 2), function (err) {
            if (err) {
                console.log(err);
             } else {  // if no error is experienced
          console.log("movie-this added!.");
         }
      });
    }
        .catch(function (error) {
        console.log(error);
      });

}

// do-what-it-says
function getIt(){
  fs.readFile('random.txt', "utf8", function(error, data){

    if (error) {
        return display(error);
      }
    var dataArr = data.split(",");
    
    if (dataArr[0] === "spotify-this-song") {
        
      var songcheck = dataArr[1].trim().slice(1, -1);
      spotifySong(songcheck);
    } 
   
    });

}
switchCase();



// set any environment variables with the dotenv package

