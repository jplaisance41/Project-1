// Variables
var movies;
var genres;
var streamingServices;
var actors;

//Variables for id's
var watchBtn = document.querySelector("#watch-btn")

// Function for "Lets's watch this!" button click
function init() {
    watchBtn.addEventListener("click", streamingServices)
}

// Function to 
function streamingServices() {
fetch("https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key=42f640bb5d98e41dd2c5c48527c1b3fd"
)
}