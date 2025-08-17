const searchBox = document.querySelector("#searchBox");
const results = document.querySelector("#results");
const movieInfo = document.querySelector("#movieInfo");

searchBox.addEventListener("input", function () {
    const searchTerm = searchBox.value.trim();
    if (searchTerm.length > 2) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=433dc46d016e3d1127f8f04959e9a42a&query=${encodeURIComponent(searchTerm)}&language=es-ES`)
            .then(response => response.json())
            .then(data => {
                results.innerHTML = "";
                movieInfo.innerHTML = "";

                if (data.results.length === 0) {
                  results.innerHTML = `<li style="color:#ccc;cursor:default;">Sin resultados</li>`;
                  return;
                }

                data.results.slice(0, 8).forEach(movie => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                      <div style="display:flex;align-items:center;gap:15px;">
                        <img src="https://image.tmdb.org/t/p/w92${movie.poster_path || ''}" alt="${movie.title}" style="width:40px;height:60px;object-fit:cover;border-radius:6px;background:#333;">
                        <span>${movie.title}</span>
                      </div>
                    `;
                    listItem.addEventListener("click", function () {
                        showMovie(movie.id);
                        results.innerHTML = "";
                    });
                    results.appendChild(listItem);    
                });
            });
    } else {
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
                <div class="movie-card" style="max-width:400px;margin:0 auto;">
                  <h2 style="text-align:center;">${data.title}</h2>
                  <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}" style="margin:0 auto;display:block;border-radius:10px;">
                  <div class="movie-details" style="text-align:center;">
                  <br/>
                    <p><strong>Fecha de lanzamiento:</strong> ${data.release_date}</p>
                    <p><strong>Valoración:</strong> ${data.vote_average}</p>
                    <p><strong>Idioma original:</strong> ${data.original_language}</p>
                  </div>
                  <p style="padding:10px 15px;text-align:justify;">${data.overview}</p>
                  <div style="display:flex;justify-content:center;gap:20px;margin-bottom:10px;">
                    <input name="favourite" type="button" id="${data.id}" onclick="favourite(${data.id})" value="🤍" style="font-size:2rem;background:none;border:none;cursor:pointer;color:#e50914;transition:transform 0.2s;">
                  </div>
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