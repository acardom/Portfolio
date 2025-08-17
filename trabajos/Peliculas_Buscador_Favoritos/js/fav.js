$(document).ready(function () {
  const API_KEY = '433dc46d016e3d1127f8f04959e9a42a';

  // Obtener favoritos desde localStorage
  const getFavorites = () => {
    let favs = [];
    if (localStorage['favorites'] !== undefined) {
      favs = localStorage['favorites'].split(',').filter(id => id !== '');
    }
    return favs;
  };

  // Obtener vistos desde localStorage
  const getWatched = () => {
    let watched = [];
    if (localStorage['watched'] !== undefined) {
      watched = localStorage['watched'].split(',').filter(id => id !== '');
    }
    return watched;
  };

  // Añadir a vistos
  const addToWatched = (id) => {
    let watched = getWatched();
    if (!watched.includes(id.toString())) {
      watched.push(id);
      localStorage['watched'] = watched.toString();
    }
  };

  // Eliminar de vistos
  const deleteFromWatched = (id) => {
    let watched = getWatched();
    watched = watched.filter(value => value !== id.toString());
    if (watched.length === 0) {
      delete localStorage['watched'];
    } else {
      localStorage['watched'] = watched.toString();
    }
  };

  // Mostrar mensaje si no hay favoritos
  if (!localStorage['favorites'] || getFavorites().length === 0) {
    const noFavoritesMessage = `
      <div class="no-favorites text-center py-5">
        <h3 class="text-white mb-3">No tienes películas favoritas</h3>
        <p class="text-gray-400 mb-4">Explora y añade películas a tus favoritas desde la página principal o el buscador.</p>
        <a href="index.html" class="btn btn-danger me-2">Ir a Principal</a>
        <a href="buscador.html" class="btn btn-outline-light">Ir a Buscador</a>
      </div>
    `;
    $('#movies-container').append(noFavoritesMessage);
  } else {
    // Cargar películas favoritas y dividir en vistos/no vistos
    const favoritos = getFavorites();
    const vistos = getWatched();

    // Contenedores para vistos y no vistos
    const vistosContainer = $('<div class="favoritos-seccion mb-5"></div>');
    const noVistosContainer = $('<div class="favoritos-seccion mb-5"></div>');
    vistosContainer.append('<h2 class="section-title">Vistos</h2><div class="movies-grid" id="vistos-grid"></div>');
    noVistosContainer.append('<h2 class="section-title">No vistos</h2><div class="movies-grid" id="novistos-grid"></div>');
    $('#movies-container').append(vistosContainer, noVistosContainer);

    favoritos.forEach(id => {
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES`)
        .then(response => response.json())
        .then(data => {
          if (data.success === false) {
            console.error(`Película con ID ${id} no encontrada`);
            return;
          }
          const isFav = getFavorites().includes(data.id.toString());
          const isWatched = getWatched().includes(data.id.toString());
          const movieCard = `
            <div class="movie-card">
              <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}">
              <h2>${data.title}</h2>
              <div class="movie-details">
                <p>⭐ ${data.vote_average} | ${data.release_date}</p>
                <p>${data.overview.substring(0, 100)}...</p>
              </div>
              <div class="movie-actions">
                <button class="fav-btn" id="fav-${data.id}" onclick="favourite(${data.id})">${isFav ? '❤️' : '🤍'}</button>
                <button class="watched-btn" id="watched-${data.id}" onclick="toggleWatched(${data.id})" title="Marcar como visto">
                  ${isWatched ? '👁️' : '🙈'}
                </button>
              </div>
            </div>
          `;
          if (isWatched) {
            $('#vistos-grid').append(movieCard);
          } else {
            $('#novistos-grid').append(movieCard);
          }
        })
        .catch(error => console.error(`Error al cargar película con ID ${id}:`, error));
    });
  }
});

// Alternar favorito
function favourite(id) {
  const btn = document.getElementById('fav-' + id);
  if (btn.innerHTML === '❤️') {
    btn.innerHTML = '🤍';
    deleteFromFavorites(id);
    location.reload(); // Recargar para actualizar la lista
  } else {
    btn.innerHTML = '❤️';
    addToFavorites(id);
  }
}

// Alternar visto
function toggleWatched(id) {
  const btn = document.getElementById('watched-' + id);
  if (btn.innerHTML.trim() === '👁️') {
    btn.innerHTML = '🙈';
    deleteFromWatched(id);
    location.reload(); // Recargar para actualizar la lista
  } else {
    btn.innerHTML = '👁️';
    addToWatched(id);
    location.reload(); // Recargar para actualizar la lista
  }
}

// Añadir a favoritos
const addToFavorites = (id) => {
  let favs = getFavorites();
  if (!favs.includes(id.toString())) {
    favs.push(id);
    localStorage['favorites'] = favs.toString();
  }
};

// Eliminar de favoritos
const deleteFromFavorites = (id) => {
  let favs = getFavorites();
  favs = favs.filter(value => value !== id.toString());
  if (favs.length === 0) {
    delete localStorage['favorites'];
  } else {
    localStorage['favorites'] = favs.toString();
  }
};

// Obtener favoritos y vistos (para funciones globales)
function getFavorites() {
  let favs = [];
  if (localStorage['favorites'] !== undefined) {
    favs = localStorage['favorites'].split(',').filter(id => id !== '');
  }
  return favs;
}
function getWatched() {
  let watched = [];
  if (localStorage['watched'] !== undefined) {
    watched = localStorage['watched'].split(',').filter(id => id !== '');
  }
  return watched;
}
function addToWatched(id) {
  let watched = getWatched();
  if (!watched.includes(id.toString())) {
    watched.push(id);
    localStorage['watched'] = watched.toString();
  }
}
function deleteFromWatched(id) {
  let watched = getWatched();
  watched = watched.filter(value => value !== id.toString());
  if (watched.length === 0) {
    delete localStorage['watched'];
  } else {
    localStorage['watched'] = watched.toString();
  }
}