let posterID = document.getElementById("Poster");

const APIKey = "42f640bb5d98e41dd2c5c48527c1b3fd";
var welcomeQueryURL =
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
      movieresults[Math.floor(Math.random() * movieresults.length) + 1];
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
        runtime = data.runtime + " minutes";
        document.getElementById("shortSynop").append(runtime);
      });
  });
