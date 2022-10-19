let posterID = document.getElementById("Poster");

const APIKey = "42f640bb5d98e41dd2c5c48527c1b3fd";
var welcomeQueryURL =
  localStorage.getItem("lastUrl") ??
  "https://api.themoviedb.org/3/movie/popular?api_key=" +
    APIKey +
    "&language=en-US&page=1";

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

        let posterPath = data.poster_path;
        console.log(posterPath);
        let selectedMoviePoster =
          "https://image.tmdb.org/t/p/w500" + posterPath;
        console.log(selectedMoviePoster);

        let posterIMG = document.createElement("img");
        posterIMG.src = selectedMoviePoster;
        document.getElementById("poster").append(posterIMG);

        let title = document.createElement("h3");
        title.textContent = data.title;
        document.getElementById("movieTitle").append(title);

        let synopsis = document.createElement("p");
        synopsis.textContent = data.overview;
        document.getElementById("shortSynop").append(synopsis);

        let genre = document.createElement("h6");
        genre = data.genres[0].name;
        document.getElementById("shortSynop").append(genre);

        let runtime = document.createElement("h6");
        runtime = " " + data.runtime + " minutes";
        document.getElementById("shortSynop").append(runtime);
      });
  });

$("#findMovie").click(function (event) {
  event.preventDefault();
  $("#poster").empty();
  $("#movieTitle").empty();
  $("#shortSynop").empty();

  //streaming
  let streamTest = "";
  let inputs = $("#searchStreamingService input:checked");

  for (let i = 0; i < inputs.length; i++) {
    streamTest += "," + inputs.eq(i).val();
  }

  streamTest = "&with_watch_providers=" + streamTest;
  streamChoices = streamTest.replace(",", "");
  console.log(streamChoices);

  // genre

  let genreTest = "";
  let genreinputs = $("#searchGenre input:checked");

  for (let i = 0; i < genreinputs.length; i++) {
    genreTest += "," + genreinputs.eq(i).val();
  }

  genreTest = "&with_genres=" + genreTest;
  genreChoices = genreTest.replace(",", "");
  console.log(genreChoices);

  //rating

  let ratingTest = "";
  let ratinginputs = $("#searchRatings input:checked");

  for (let i = 0; i < ratinginputs.length; i++) {
    ratingTest += "," + ratinginputs.eq(i).val();
  }

  ratingTest = "&certification_country=US&certification=" + ratingTest;
  ratingChoices = ratingTest.replace(",", "");
  console.log(ratingChoices);

  let customFormResults = ratingChoices + genreChoices + streamChoices;

  console.log(customFormResults);

  let formQueryURL =
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
    APIKey +
    "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1" +
    customFormResults;

  console.log(formQueryURL);

  localStorage.setItem("lastUrl", formQueryURL);
  fetch(formQueryURL)
    .then(function (responce) {
      return responce.json();
    })
    .then(function (data) {
      return data.results;
    })
    .then(function (movieresults) {
      let index = Math.floor(Math.random() * movieresults.length);
      let randommovie = movieresults[index];
      let movieID = String(randommovie.id);

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

          let posterPath = data.poster_path;
          console.log(posterPath);
          let selectedMoviePoster =
            "https://image.tmdb.org/t/p/w500" + posterPath;
          console.log(selectedMoviePoster);

          let posterIMG = document.createElement("img");
          posterIMG.src = selectedMoviePoster;
          document.getElementById("poster").append(posterIMG);

          let title = document.createElement("h3");
          title.textContent = data.title;
          document.getElementById("movieTitle").append(title);

          let synopsis = document.createElement("p");
          synopsis.textContent = data.overview;
          document.getElementById("shortSynop").append(synopsis);

          let genre = document.createElement("h6");
          genre = data.genres[0].name;
          document.getElementById("shortSynop").append(genre);

          let runtime = document.createElement("h6");
          runtime = " " + data.runtime + " minutes";
          document.getElementById("shortSynop").append(runtime);
        });
    });
});
