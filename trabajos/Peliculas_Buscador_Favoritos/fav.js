const movieInfo = document.querySelector("#movies-container");

const getFavorites = () => {
    let favs = [];
    if (localStorage["favorites"] != undefined) {
        favs = localStorage["favorites"].split(',');
    }
    return favs;
};

if (localStorage["favorites"] == undefined) {
    var movieCard = `
              <div class="movie-card">
                <h2>Nada que ver</h2>
                <p>ve a la <a href="buscador.html">seccion de busqueda</a> o a la <a href="principal.html">pagina principal</a> para encontrar peliculas y agregarlas a favorito</p>
              </div>
            `;
    $("#movies-container").append(movieCard);

} else {
    let favoritos = getFavorites();
    favoritos.forEach(element => {
        fetch(`https://api.themoviedb.org/3/movie/${element}?api_key=433dc46d016e3d1127f8f04959e9a42a&language=es-ES`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          console.log("hola");
          var movieCard = `
                <div class="movie-card">
                  <h2>${data.title}</h2>
                  <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}">
                  <div class="movie-details">
                    <p>Fecha de lanzamiento: ${data.release_date}</p>
                    <p>Valoración: ${data.vote_average}</p>
                    <p>Idioma original: ${data.original_language}</p>
                  </div>
                  <p>Descripción: ${data.overview}</p>
                  <input name="favourite" type="button" id="${data.id}" onclick="favourite(${data.id})" value=❤>
                </div>
              `;
            $("#movies-container").append(movieCard);
        });
    })
}

function favourite(id) {
    if (document.getElementById(id).value == "❤") {
        document.getElementById(id).value = "🤍";
        deleteFromFavorites(id);
        location. reload();
    } else {
        document.getElementById(id).value = "❤";
        addToFavorites(id);
    }
}

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