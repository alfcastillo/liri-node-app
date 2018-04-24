// ** DEPENDECIES **

require("dotenv").config();
var Twitter = require('twitter');
var keys = require("./keys");
var request = require("request");
var Spotify = require('node-spotify-api');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// var spotify = keys.spotify;
// var client = keys.twitter;
// console.log("Spotify Keys: " + spotify.id);
// console.log("Twitter Keys: " + client.consumer_key);

// console.log(spotify.id);
// console.log(client.consumer_key);

// ** TWEETS STUFF
let getMyTweets = function () {
    var client = new Twitter(keys.twitter);
    let params = { screen_name: "alfcastillo100" }
    // console.log(client);
    // console.log(client.Twitter.)
    // client.get('favorites/list', params,function(error, tweets, response) {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) console.log(error);
        // console.log(tweets);  // The favorites. 
        // console.log(JSON.stringify(tweets, null, 2));
        console.log(tweets.length);
        for (var i = 0; i < tweets.length; i++) {
            console.log("\n-----------------")
            console.log("Tweet:"
                + "\nCreated at: " + tweets[i].created_at
                + "\nText: " + tweets[i].text);
        }

        // console.log(response);  // Raw response object. 
    });
}

// ** SPOTIFY STUFF
let getThisSong = function (songName) {
    var Spotify = require('node-spotify-api');
    if (songName) {
        console.log("Hey Spotify this Song: " + songName)
    }
    else{
        console.log("No Song was defined...so now you'll learn about My favorite band: SODA STEREO")
        songName="De Musica Ligera"
    }

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data);
        // console.log(JSON.stringify(data, null, 2));
        console.log("\nSONG INFO");
        console.log("---------------------");
        console.log("Artist: " + data.tracks.items[0].artists[0].name
            + "\nSong's name: " + songName
            + "\nSpotify Preview: " + data.tracks.items[0].album.artists[0].external_urls.spotify
            + "\nAlbum: " + data.tracks.items[0].album.name);
        console.log("---------------------");


    });
    // spotify
    //     .search({ type: 'track', query: songName })
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     });
}

// ** MOVIE STUFF
let getThisMovie = function (movieName) {
    // var request = require("request");
    // var movieName = process.argv.slice(2).join("+");
    if (movieName) {
        console.log("Movie Name: " + movieName);
        //run a request to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        // console.log(queryUrl);
    }
    else {
        console.log("No Movie Name was defined. Now you will see Mr. Nobody");
        var queryUrl = "http://www.omdbapi.com/?t=Mr. Nobody&y=&plot=short&apikey=trilogy";
    }


    // ...
    request(queryUrl, function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {


            // console.log(body);
            // console.log(JSON.parse(body));
            console.log("\nMOVIE INFO");
            console.log("---------------------");
            console.log("Movie Title: " + JSON.parse(body).Title
                + "\nThe movie's year is: " + JSON.parse(body).Year
                + "\nRating of the Movie: " + JSON.parse(body).imdbRating
                + "\nCountry where the movie was produced: " + JSON.parse(body).Country
                + "\nLanguage of the movie: " + JSON.parse(body).Language
                + "\nPlot of the Movie: " + JSON.parse(body).Plot
                + "\nActors in the movie: " + JSON.parse(body).Actors);
            console.log("---------------------");
        }
    });
}

// ** DO AS IT SAYS STUFF
let doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // console.log(data);
        var dataArray = data.split(",");
        // console.log(dataArray);
        // console.log("Do What it Says")
        commandProcessing(dataArray[0], dataArray[1]);
        // itemName = 'I Want it That Way';
        // getThisSong(dataArray[1]);

    });
};


// ** Commands Processing
let commandProcessing = function (argument1, argument2) {
    if (argument1 == "my-tweets") {
        getMyTweets();
    }
    else if (argument1 == "movie-this") {
        getThisMovie(argument2);
    }
    else if (argument1 == "spotify-this-song") {
        getThisSong(argument2);
    }
    else if (argument1 == "do-what-it-says") {
        doWhatItSays();
    }
}

// ** Command Arguments
var argument1 = process.argv.slice(2, 3).join("+");
var argument2 = process.argv.slice(3).join("+");
console.log("Liri Command: " + argument1);
commandProcessing(argument1, argument2);
