const movies = [];

function search() {
  const val = event.target.value;
  if (val.length > 2) {
    this.debounce(val);
  }
}

function debounce(val, timeout = 500) {
  let timer;

  let headers = new Headers();
  headers.append('Access-Control-Allow-Origin', '*');

  clearTimeout(timer);
  timer = setTimeout(async () => {
    const promise = await fetch(
      `http://tvdbtest.herokuapp.com/api/search/movie?query=${val}`,
      {
        headers: headers,
      }
    );
    promise
      .json()
      .then((res) => {
        this.movies = res.results;
        this.displayMovies(this.movies);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, timeout);
}

function filterYear() {
  const year = document.getElementById('year-filter').value;
  let filteredMovies = this.movies;
  if (year)
    filteredMovies = this.movies.filter(
      (element) => new Date(element.release_date).getFullYear() === Number(year)
    );
  this.displayMovies(filteredMovies);
}

function sortYear() {
  const sortedMovies = this.movies.sort((a, b) => {
    return new Date(a.release_date) - new Date(b.release_date);
  });
  this.displayMovies(sortedMovies);
}

function displayMovies(movies) {
  document.getElementById('movies').innerHTML = '';
  let movie, text, image, year;
  const IMAGE_BASE_URI = 'http://image.tmdb.org/t/p/';
  const POSTER_SIZE = 'w92'; //or w300
  movies.forEach((element) => {
    if (element.poster_path) {
      movie = document.createElement('div');
      movie.setAttribute('class', 'movie');
      image = document.createElement('img');
      image.setAttribute(
        'src',
        `${IMAGE_BASE_URI}${POSTER_SIZE}${element.poster_path}`
      );
      image.setAttribute('alt', `${element.title} poster`);
      image.setAttribute('class', `poster`);
      movie.appendChild(image);
      text = document.createElement('span');
      text.appendChild(document.createTextNode(element.title));
      movie.appendChild(text);
      year = document.createElement('span');
      year.appendChild(document.createTextNode(element.release_date));
      movie.appendChild(year);
      document.getElementById('movies').appendChild(movie);
    }
  });
}
