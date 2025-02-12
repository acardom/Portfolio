$(document).ready(function () {
    $.ajax({
      url: "https://api.themoviedb.org/3/trending/movie/week?api_key=433dc46d016e3d1127f8f04959e9a42a&language=es-ES",
      success: function (data) {
        var movies = data.results;

        for (var i = 0; i < movies.length; i++) {
          var movie = movies[i];

          var movieCard = `
              <div class="movie-card">
                <h2>${movie.title}</h2>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div class="movie-details">
                  <p>Fecha de lanzamiento: ${movie.release_date}</p>
                  <p>Valoración: ${movie.vote_average}</p>
                  <p>Idioma original: ${movie.original_language}</p>
                </div>
                <p>Descripción: ${movie.overview}</p>
                <input name="favourite" type="button" id="${movie.id}" onclick="favourite(${movie.id})" value=🤍>
              </div>
            `;
          $("#movies-container").append(movieCard);
          
          if (localStorage["favorites"] != undefined) {
            let favoritos = getFavorites();
            favoritos.forEach(element => {
              if(element == movie.id){
                document.getElementById(movie.id).value = "❤";
              }
            });
        }
        }
      }
    });
  });

  function favourite(id) {
    if (document.getElementById(id).value == "❤") {
      document.getElementById(id).value = "🤍";
      deleteFromFavorites(id);
    } else {
      document.getElementById(id).value = "❤";
      addToFavorites(id);
    }
  }
  const getFavorites = () => {
    let favs = [];
    if (localStorage["favorites"] != undefined) {
      favs = localStorage["favorites"].split(',');
    }
    return favs;
  };

  const addToFavorites = (id) => {
    let favs = getFavorites();
    if (favs.indexOf(id) < 0) {
      favs.push(id);
    }
    localStorage["favorites"] = favs.toString();
    console.log(localStorage["favorites"]);
  }

  const deleteFromFavorites = (id) => {
    let favs = getFavorites();
    favs = favs.filter(function (value, index, arr) {
      return value != id;
    });
    (favs.length === 0) ? delete localStorage["favorites"] : localStorage["favorites"] =
      favs.toString();
      console.log(localStorage["favorites"]);
  }
