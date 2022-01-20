const apiKey = "28e63299ff61593c038bcf59b3414211";
const base_uri = "http://api.themoviedb.org/3/";
const images_uri = "http://image.tmdb.org/t/p/w500/";

const generic_fetch = async (base, param_url) => {
    await fetch(base+param_url+"?api_key="+apiKey)
    .then((response) => {
        return response.json()})
    .then((json) => console.log(json))
    .catch((e) => console.log(e));
}

const base_fetch = async (param_url) => {return generic_fetch(base_uri, param_url)};
const getPosterUrl = (movie) => {
    return images_uri + movie.poster_path;
}

// API Methods to get data from one-liners in the actual code

export const getPopularMovies = () => {
    
    var movies = base_fetch("movie/top_rated")
    
        
}
