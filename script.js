//Script to pick movie that will welcome you 

const APIKey = "42f640bb5d98e41dd2c5c48527c1b3fd"
var welcomeQueryURL = "https://api.themoviedb.org/3/movie/popular?api_key=" + APIKey + "&language=en-US&page=1"


//fetching 20 popular movies

fetch(welcomeQueryURL)
    .then(function (responce){
        return responce.json();
    })
    .then(function (data){
        return data.results;
    })
    .then(function(movieresults){
        let randommovie = movieresults[Math.floor(Math.random() * movieresults.length) + 1];
        let movieID = String(randommovie.id)
        
        let selectedMovieURL = "https://api.themoviedb.org/3/movie/" + movieID +"?api_key=" + APIKey +
            "&language=en-US&append_to_response=release_dates,watch/providers";
            
            fetch(selectedMovieURL)
                .then(function (responce){
                    return responce.json();
                })
                .then(function (data){
                    console.log(data);

                    let posterPath = data.poster_path
                        console.log(posterPath)
                    let selectedMoviePoster = "https://image.tmdb.org/t/p/w500" + posterPath
                        console.log(selectedMoviePoster)
                        
                    let posterIMG = document.createElement('img');
                        posterIMG.src = selectedMoviePoster ;
                        document.getElementById("poster").append(posterIMG)
                        
                    let title = document.createElement('h3')
                        title.textContent = data.title
                        document.getElementById("movieTitle").append(title)

                    let synopsis = document.createElement('p')
                        synopsis.textContent = data.overview
                        document.getElementById("shortSynop").append(synopsis)

                    let genre = document.createElement('h6')
                        genre = data.genres[0].name
                        document.getElementById("shortSynop").append(genre)

                    let runtime = document.createElement('h6')
                        runtime = data.runtime + " minutes"
                        document.getElementById("shortSynop").append(runtime)
                    
                })            
    })

// Form objects with url values
const genre ={
    Comedy:"&with_genres=35",
    Drama:"&with_genres=18",
    Horror:"&with_genres=27",
    Sci-Fi:"&with_genres=878",
    Action:"&with_genres=28",
    Family:"&with_genres=14",
    Documentary:"&with_genres=99",
}

const StreamingService = {
    Netflix:"&with_watch_providers=8",
    Hulu:"&with_watch_providers=15",
    HBOMax:"&with_watch_providers=384",
    Shudder:"&with_watch_providers=99",
    Disney+:"&with_watch_providers=377|390",
    AppleTV+:"&with_watch_providers=350",
    PrimeVideo:"&with_watch_providers=9|119",
}

const rating ={
    G:"certification_country=US&certification=G",
    PG:"certification_country=US&certification=PG",
    PG-13:"certification_country=US&certification=PG-13",
    R:"certification_country=US&certification=R",
}

let customFormResults = []

let formQueryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + APIKey +
                   "&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1" + 
                   customFormResults
   
   
    function formSearch(){

   }