//create the variables for each ones that will need
var spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
//  required to import the keys.js 
var keys = require("./keys.js");
 
// access spotify key info
var spotify1 = new spotify(keys.spotify1);

// concert-this 
function getConcert(artist){
  var appId = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  // Make a request for a user with a given ID
      axios.get(appId)
        .then(function (response) {
          if(response.data.length >= 15){
          }
          console.log(response.data);
});
}

// spotify-this-song
// movie-this
// do-what-it-says


// set any environment variables with the dotenv package
// require("dotenv").config();
