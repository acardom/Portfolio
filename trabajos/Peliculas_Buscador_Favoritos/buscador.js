const searchBox = document.querySelector("#searchBox");
const results = document.querySelector("#results");
const movieInfo = document.querySelector("#movieInfo");

searchBox.addEventListener("input", function () {
    const searchTerm = searchBox.value;
    if (searchTerm.length > 2) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=433dc46d016e3d1127f8f04959e9a42a&query=${searchTerm}&language=es-ES`)
            .then(response => response.json())
            .then(data => {

                results.innerHTML = "";
                movieInfo.innerHTML = "";

                data.results.forEach(movie => {
                    const listItem = document.createElement("li");
                    listItem.innerText = movie.title;
                    listItem.addEventListener("click", function () {
                        showMovie(movie.id);
                        results.innerHTML = "";
                    });
                    results.appendChild(listItem);    
                });
            });
    }else{
        results.innerHTML = "";
        movieInfo.innerHTML = "";
    }

});


function showMovie(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=433dc46d016e3d1127f8f04959e9a42a&language=es-ES`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            movieInfo.innerHTML = `
                <div class="movie-card">
                  <h2>${data.title}</h2>
                  <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}">
                  <div class="movie-details">
                    <p>Fecha de lanzamiento: ${data.release_date}</p>
                    <p>Valoración: ${data.vote_average}</p>
                    <p>Idioma original: ${data.original_language}</p>
                  </div>
                  <p>Descripción: ${data.overview}</p>
                  <input name="favourite" type="button" id="${data.id}" onclick="favourite(${data.id})" value=🤍>
                </div>
              `;
        
        searchBox.value = "";

        if (localStorage["favorites"] != undefined) {
            let favoritos = getFavorites();
            favoritos.forEach(element => {
              if(element == data.id){
                document.getElementById(data.id).value = "❤";
              }
            });
        }

    });
}

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