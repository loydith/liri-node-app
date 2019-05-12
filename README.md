1. One
2. Two
3. Three

Sometimes you want bullet points:

* Start a line with a star
* Profit!

Alternatively,

- Dashes work just as well
- And if you have sub points, put two spaces before the dash or star:
  - Like this
  - And this

# liri-node-app

#WELCOME TO MY LIRI Node App!

LIRI is a Language Interpretation and Recognition Interface, a command line node app.

LIRI can search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

# Instructions
------------

1. Navigate to the root of my project and run npm init -y — this will initialize a package.json file for my project. The package.json file is required for installing third party npm packages and saving their version numbers. 

2. I created a .gitignore file and add 

{node_modules
.DS_Store
.env}
3. I created a JavaScript file named keys.js. inside I put his code with the Spotify ID:

console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

4. Next, I created a file named .env, then put this code that it will replace the values with my API keys (no quotes):


# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret


This file will be used by the dotenv package to set what are known as environment variables to the global process.env object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github — keeping our API key information private.


5. I created a file called random.txt.

Inside of random.txt put the following in with no extra characters or white space:


spotify-this-song,"I Want it That Way"


6. I created a JavaScript file named liri.js.
At the top of the liri.js file, added code to read and set any environment variables with the dotenv package:


require("dotenv").config();

Add the code required to import the keys.js file and store it in a variable.

  	//create the variables for each ones that will need
	var keys = require("./keys.js");
	var Spotify = require("node-spotify-api");
	var spotify = new Spotify(keys.spotify); 
	var moment = require("moment");
	var fs = require("fs");
	var axios = require("axios");
	var command = process.argv[2];
	var query = process.argv.slice(3).join(""); //.slice(3) for title like " Star wars"
	Make it so liri.js can take in one of the following commands:

	Function that made for this App:

7. Node-Spotify-API ==> Function getArtist(artist)

	7.1 Axios ==> "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
		[ * Name of the venue,
			* Venue location,
			* Date of the Event (use moment to format this as "MM/DD/YYYY")]

	7.2 www.moment.com ==> moment().format("MM/DD/YYYY")
	7.3 fs.appendFileSync ==> log.txt

8. Spotify-this-song ==> Function getSong(songName)
	
	8.1 spotify.search
		[Artist(s),
			The song's name,
			A preview link of the song from Spotify,
			The album that the song is from]
	
	8.2 fs.appendFileSync ==> ("log.txt")

9. Movie-this ==> function getMovie(movieName){
   
 	9.1 URL = "http://www.omdbapi.com/?t="+ movieName + "=&plot=short&apikey=trilogy";
		[  * Title of the movie.
   		* Year the movie came out.
  		 * IMDB Rating of the movie.
  		 * Rotten Tomatoes Rating of the movie.
  		 * Country where the movie was produced.
   		* Language of the movie.
   		* Plot of the movie.
   		* Actors in the movie.]

	9.2 fs.appendFileSync ==> log.txt

10. do-what-it-says == > Function getIt()
	
	10.1 fs.appendFileSync ==> ("log.txt")
	
# run ==> concert-this

<img width="1680" alt="Screen Shot - concert-this" src="https://user-images.githubusercontent.com/47442758/57576840-5c293480-742f-11e9-8526-ecbdd623947b.png">
	
# run ==> spotify-this-song

<img width="1680" alt="Screen Shot - spotify-this-song" src="https://user-images.githubusercontent.com/47442758/57576877-38b2b980-7430-11e9-934e-42a4e8b0a84c.png">

# run ==> movie-this

<img width="1680" alt="Screen Shot - Movie-this" src="https://user-images.githubusercontent.com/47442758/57576875-2d5f8e00-7430-11e9-803f-e4778836576d.png">





