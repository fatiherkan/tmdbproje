
const API = "api_key=5c60de6deb1603623b1a8394c0cafdd3";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = `movie/popular?${API}&language=en-US&page=`;
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w500";
const CONTAINERMAIN = document.getElementById("main");
const CONTAINER = document.getElementById("list");
var pageIndex = 1;

//----------FİLMLERİ DÖNDÜRME---------------
const autorun = async (url) => {
  const movies = await fetchMovies(url);
  renderMovies(movies.results);
};
//-------APİ TANIMLAMA---------------
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path} `;
};
//-------FİLM AYRINTI DÖNDÜRME---------
const movieDetails = async (id) => {
  const movieRes = await fetchMovie(id);
  renderMovie(movieRes);
};
//-------POPÜLER FİLMLERİ DÖNDÜRME-------
const fetchMovies = async (urll) => {
  const url = typeof (urll) == "string" ? constructUrl(urll) : constructUrl(`movie/popular?${API}`);
  const res = await fetch(url);
  return res.json();
};
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}?${API}`);
  const res = await fetch(url);
  return res.json();
};
const fetchrecommend = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/recommendations?${API}`);
  const res = await fetch(url);
  return res.json();
};
//---------FİLMLERİ EKRANA YAZDIRMA------
const renderMovies = (movies) => {
  CONTAINER.innerHTML = movies.map((movie) => {
    return `
  <div class="col-2">
          <img class="card-img-top" src=${BACKDROP_BASE_URL + movie.poster_path} alt="Card image cap">
          <div class="card-body d-flex justify-content-between"> 
              <h5 class="card-title">${movie.title}</h5>
          </div>
          <div class="card-body d-flex justify-content-between"> 
              <a href="#" class="btn btn-primary" onclick="movieDetails(${movie.id})">More</a>
          </div>
  </div>
      `;
  });
  var element =  document.getElementById('pager');
  if (typeof(element) != 'undefined' && element != null){
    const pageLinks = document.querySelectorAll(".page-link");
      pageLinks.forEach((pageLink) => {
        pageLink.addEventListener("click", () => {
          if (pageLink.id === "next") {
            pageIndex++;
            autorun(PROFILE_BASE_URL + pageIndex);
          }
          if (pageLink.id === "previous" && pageIndex > 1) {
            pageIndex--;
            autorun(PROFILE_BASE_URL + pageIndex);

          }
          window.localStorage.setItem("page","pageIndex");
         });
      });
  }else{
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `<nav aria-label="Page navigation example" id="pager">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a id="previous" class="btn page-link" tabindex="-1">Geri</a>
      </li>
      <div class="current">
      1
            </div>
      <li class="page-item">
        <a id="next" class="btn page-link">İleri</a>
      </li>
    </ul>
  </nav>`;
  CONTAINERMAIN.appendChild(movieDiv);
      const pageLinks = document.querySelectorAll(".page-link");
      console.log(pageLinks);
      pageLinks.forEach((pageLink) => {
        pageLink.addEventListener("click", () => {
          if (pageLink.id === "next") {
            pageIndex++;
            autorun(PROFILE_BASE_URL + pageIndex);
          }
          if (pageLink.id === "previous" && pageIndex > 1) {
            pageIndex--;
            autorun(PROFILE_BASE_URL + pageIndex);
          }

        });
      });   
  }
};
//-----------FİLM DETAYLARI---------
const renderMovie = (movie) => {
  const element = document.getElementById("pager");
element.remove();
  CONTAINER.innerHTML = `
  <div>
            <a href="index.html" class="button">Go to MovieList</a>
            </div>
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.poster_path
    }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date
    }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Popularity:</h3>
            <ul id="popularity" class="list-unstyled">${movie.popularity}</ul>
            <h3>Budget:</h3>
            <ul id="budget" class="list-unstyled">${movie.budget}</ul>            
    </div>`;
};
document.addEventListener("DOMContentLoaded", autorun);


