// this code require to be first
require("dotenv").config();

//create the variables for each ones that will need
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify); 
var moment = require("moment");
var fs = require("fs");
var axios = require("axios");
var command = process.argv[2];
var query = process.argv.slice(3).join(""); //.slice(3) for title like " Star wars"



function switchCase() {
// console.log('switching case'
  switch (command) {

    case 'concert-this':
      getConcert(query);                   
      break;                          

    case 'spotify-this-song':
      getSong(query);
      break;

    case 'movie-this':
      getMovie(query);
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
        if(response.data.length > 0){
            
            for(var i=0; i<response.data.length; i++){
              if (response.data[i]) {
                console.log(artist); 
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.region);
                console.log(moment(response.data[i].datetime).format("MM-DD-YYYY hh:mm A"));
                console.log("\n...........................\n");
          };
          // create the details for the new file log.txt
          var addLog = [
            "name :" + response.data[i].venue.name ? response.data[i].venue.name : '',
            "location: " + response.data[i].venue.region ? response.data[i].venue.region : '',
            "date: " + response.data[i].datetime ? response.data[i].datetime : '',
            "time: " + response.data[i].datetime ? response.data[i].datetime : '',
          ];
        
            fs.appendFileSync("log.txt", JSON.stringify(addLog, null, 2), function(err) {
              if (err) {
              console.log(err);
              return;
              } else {  
              console.log("concert-this added!");
              }
            });
            }
        }else{
          console.log("Band in Town Artist not found!"); 
        }
    });

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
      console.log("\n...........................\n");
      }
    
 // create the details for the new file log.txt
      var addLog = [
        "Artist:" + data.tracks.items[0].artists[0].name,
        "sngName:" + data.tracks.items[0].name,
        "preview:" + data.tracks.items[0].album.external_urls.spotify,
        "album: " +  data.tracks.items[0].album.name
      ];

      fs.appendFileSync("log.txt", JSON.stringify(addLog, null, 2), function(err) {
         if (err) {
            console.log(err);
            // Log the error and send a message to the user here
            return;
          } else {    
            console.log("spotify-this-song added!");
          }
        });
})
}
// 'movie-this'
function getMovie(movieName){
  if(movieName === undefined){
    movieName = "Mr. Nobody";
  }
  var URL = "http://www.omdbapi.com/?t="+ movieName + "=&plot=short&apikey=trilogy";
  axios.get(URL).then(function(response) {
    console.log(response.data);
    
    // Then we print out the imdbRating
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings.length >0 ? response.data.Ratings[1].Value : 'NA'); 
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log("\n---------------------------------------------------\n");
      
  // create the details for the new file log.txt
        var addLog = [
                "Title: " + response.data.Title,
                "Year: " + response.data.Year,
                "imdbRating: " + response.data.imdbRating,
                "rottenTomatoesRating: " + response.data.Ratings.length > 0 ? response.data.Ratings[1].Value : 'NA',
                "countryProduced: " + response.data.Country,
                "Language: " + response.data.Language,
                "plot :" + response.data.Plot,
                "actors: " + response.data.Actors,
        ];
        fs.appendFileSync("log.txt", JSON.stringify(addLog, null, 2), function (err) {
            if (err) {
                console.log(err);
             } else {  // if no error is experienced
          console.log("movie-this added!.");
         }
      });
      
    });
}
    // do-what-it-says
function getIt(){
  fs.readFileSync('random.txt', "utf8", function(error, data){

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

