$(document).ready(function () {
  const API_KEY = '433dc46d016e3d1127f8f04959e9a42a';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const autoplaySpeed = 5000; // 5 segundos para mejor visibilidad

  // Configuración del slider CON barra de progreso
  function initSlider(movies) {
    const $slider = $('#slider-container');
    $slider.empty();
    movies.forEach((movie, index) => {
      const slide = `
        <div class="slider-slide-relative">
          <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="${movie.title}" class="slider-slide-img">
          <div class="slider-caption-bg slider-caption-pos">
            <h2 class="slider-caption-title">${movie.title}</h2>
            <p class="slider-caption-text">${movie.overview.substring(0, 100)}...</p>
          </div>
        </div>
      `;
      $slider.append(slide);
    });

    $slider.slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: autoplaySpeed,
      arrows: true
    });
  }

  // Generar tarjetas de películas
  function generateMovieCard(movie) {
    const isFavorite = getFavorites().includes(movie.id.toString());
    return `
      <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h2>${movie.title}</h2>
        <div class="movie-details">
          <p>⭐ ${movie.vote_average} | ${movie.release_date}</p>
          <p>${movie.overview.substring(0, 100)}...</p>
        </div>
        <button class="fav-btn" id="${movie.id}" onclick="favourite(${movie.id})">${isFavorite ? '❤️' : '🤍'}</button>
      </div>
    `;
  }

  // Cargar películas destacadas (slider)
  $.ajax({
    url: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=es-ES`,
    success: function (data) {
      initSlider(data.results.slice(0, 5));
    },
    error: function () {
      console.error('Error al cargar películas destacadas');
    }
  });

  // Cargar películas más valoradas
  $.ajax({
    url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es-ES`,
    success: function (data) {
      const $topRatedGrid = $('#top-rated-container .movies-grid');
      data.results.slice(0, 12).forEach(movie => {
        $topRatedGrid.append(generateMovieCard(movie));
      });
    },
    error: function () {
      console.error('Error al cargar películas más valoradas');
    }
  });

  // Cargar géneros y películas por categoría
  $.ajax({
    url: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`,
    success: function (data) {
      const genres = data.genres.slice(0, 4);
      const $categoriesContainer = $('#categories-container');
      genres.forEach(genre => {
        const $section = $(`
          <div class="mb-5">
            <h2 class="section-title">${genre.name}</h2>
            <div class="movies-grid" id="genre-${genre.id}"></div>
          </div>
        `);
        $categoriesContainer.append($section);
        $.ajax({
          url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=${genre.id}`,
          success: function (data) {
            const $genreGrid = $(`#genre-${genre.id}`);
            data.results.slice(0, 12).forEach(movie => {
              $genreGrid.append(generateMovieCard(movie));
            });
          },
          error: function () {
            console.error(`Error al cargar películas de género ${genre.name}`);
          }
        });
      });
    },
    error: function () {
      console.error('Error al cargar géneros');
    }
  });
});

// Funciones de favoritos (sin cambios)
function favourite(id) {
  let btn = document.getElementById(id);
  if (btn.innerHTML === '❤️') {
    btn.innerHTML = '🤍';
    deleteFromFavorites(id);
  } else {
    btn.innerHTML = '❤️';
    addToFavorites(id);
  }
}

const getFavorites = () => {
  let favs = [];
  if (localStorage['favorites'] !== undefined) {
    favs = localStorage['favorites'].split(',');
  }
  return favs;
};

const addToFavorites = (id) => {
  let favs = getFavorites();
  if (favs.indexOf(id.toString()) < 0) {
    favs.push(id);
  }
  localStorage['favorites'] = favs.toString();
};

const deleteFromFavorites = (id) => {
  let favs = getFavorites();
  favs = favs.filter(value => value !== id.toString());
  favs.length === 0 ? delete localStorage['favorites'] : localStorage['favorites'] = favs.toString();
};