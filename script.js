
//API Key for Movie Database
const APIKey = "42f640bb5d98e41dd2c5c48527c1b3fd";
//Query Url for the welcome movie
var welcomeQueryURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=" +
  APIKey +
  "&language=en-US&page=1";

//Calling the movie dadbase API > returning just the results > getting movie ID for mor indepth search
fetch(welcomeQueryURL)
  .then(function (responce) {
    return responce.json();
  })
  .then(function (data) {
    return data.results;
  })
  .then(function (movieresults) {
    let randommovie =
      movieresults[Math.floor(Math.random() * movieresults.length)];
    let movieID = String(randommovie?.id);

//url call for movie that will be displayed
    let selectedMovieURL =
      "https://api.themoviedb.org/3/movie/" +
      movieID +
      "?api_key=" +
      APIKey +
      "&language=en-US&append_to_response=release_dates,watch/providers";

// fetching dada from Movie database      
    fetch(selectedMovieURL)
      .then(function (responce) {
        return responce.json();
      })
      .then(function (data) {
        console.log(data);

//parcing and creating poster url for display
        let posterPath = data.poster_path;
        console.log(posterPath);
        let selectedMoviePoster =
          "https://image.tmdb.org/t/p/w500" + posterPath;
        console.log(selectedMoviePoster);

//parcing movie data(poster img, title, synopsis, genre, runtime) to be displayed on site        
        let posterIMG = document.createElement("img");
        posterIMG.src = selectedMoviePoster;
        document.getElementById("poster").append(posterIMG);

        let title = document.createElement("h1");
        title.textContent = data.title;
        document.getElementById("movieTitle").append(title);

        let synopsis = document.createElement("p");
        synopsis.textContent = data.overview;
        document.getElementById("shortSynop").append(synopsis);

        let genre = document.createElement("h6");
        genre = data.genres[0].name+ "/" + data.genres[1].name;
        document.getElementById("shortSynop").append(genre);

        let runtime = document.createElement("h6");
        runtime = " " + data.runtime + " minutes";
        document.getElementById("shortSynop").append(runtime);
      });
  });

//Main form functionality made to generate a custom URL for API to parse data and display on site all from clicking a button 

$("#findMovie").click(function (event) {
  event.preventDefault();

//emptying previvously dynamicly generated divs
  $("#poster").empty();
  $("#movieTitle").empty();
  $("#shortSynop").empty();

//Scrolling to top of page to see result  
  $('html, body').animate({
    scrollTop: $("#TopofPage").offset().top
    }, 1000);

  //looking through streaming service div and retrieving the values of checked boxes to store in custom streaming service string
  let streamTest = "";
  let inputs = $("#searchStreamingService input:checked");

  for (let i = 0; i < inputs.length; i++) {
    streamTest += "|" + inputs.eq(i).val();
  }

  streamTest = "&with_watch_providers=" + streamTest +"&watch_region=US&with_watch_monetization_types=flatrate";
  streamChoices = streamTest.replace("|", "");
  console.log(streamChoices);

  // looking through genre div and retrieving the values of checked boxes to store in custom genre string

  let genreTest = "";
  let genreinputs = $("#searchGenre input:checked");

  for (let i = 0; i < genreinputs.length; i++) {
    genreTest += "," + genreinputs.eq(i).val();
  }

  genreTest = "&with_genres=" + genreTest;
  genreChoices = genreTest.replace(",", "");
  console.log(genreChoices);

  //looking through Rating div and retrieving the values of checked boxes to store in custom rating string

  let ratingTest = "";
  let ratinginputs = $("#searchRatings input:checked");

  for (let i = 0; i < ratinginputs.length; i++) {
    ratingTest += "|" + ratinginputs.eq(i).val();
  }

  ratingTest = "&certification_country=US&certification=" + ratingTest;
  ratingChoices = ratingTest.replace("|", "");
  console.log(ratingChoices);

  // combining the custom genre, streaming, and rating strings into one string varible
  let customFormResults = ratingChoices + genreChoices + streamChoices;

  console.log(customFormResults);

  // pluging in custom results into form Query template
  let formQueryURL =
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
    APIKey +
    "&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1" +
    customFormResults;

  console.log(formQueryURL);

//using the finished form query template to get data from API to be parsed
  fetch(formQueryURL)
    .then(function (responce) {
      return responce.json();
    })
    .then(function (data) {
        console.log(data.results)
      return data.results;
    })

//Calling the movie dadbase API > returning just the results > getting movie ID for more indepth search
    .then(function (movieresults) {
      let randommovie =
        movieresults[Math.floor(Math.random() * movieresults.length)];
      let movieID = String(randommovie?.id);

      let selectedMovieURL =
        "https://api.themoviedb.org/3/movie/" +
        movieID +
        "?api_key=" +
        APIKey +
        "&language=en-US&append_to_response=release_dates,watch/providers";

      fetch(selectedMovieURL)
        .then(function (responce) {
          return responce.json();
        })
        .then(function (data) {
          console.log(data);

//parcing and creating poster url for display
          let posterPath = data.poster_path;
          console.log(posterPath);
          let selectedMoviePoster =
            "https://image.tmdb.org/t/p/w500" + posterPath;
          console.log(selectedMoviePoster);

          let posterIMG = document.createElement("img");
          posterIMG.src = selectedMoviePoster;
          document.getElementById("poster").append(posterIMG);

//parcing movie data(title, synopsis, genre, runtime) to be displayed on site 
          let title = document.createElement("h1");
          title.textContent = data.title;
          document.getElementById("movieTitle").append(title);

          let synopsis = document.createElement("p");
          synopsis.textContent = data.overview;
          document.getElementById("shortSynop").append(synopsis);

          let genre = document.createElement("h6");
          genre = data.genres[0].name + "/" + data.genres[1].name;
          document.getElementById("shortSynop").append(genre);

          let runtime = document.createElement("h6");
          runtime = " " + data.runtime + " minutes";
          document.getElementById("shortSynop").append(runtime);
        });
    });
});
