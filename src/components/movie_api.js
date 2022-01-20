export const apiKey = "28e63299ff61593c038bcf59b3414211";
export const base_uri = "http://api.themoviedb.org/3/";
export const images_uri = "http://image.tmdb.org/t/p/w500/";

const generic_fetch = async (base, param_url) => {
    await fetch(base+param_url+"?api_key="+apiKey)
    .then((response) => {
        var json = response.json()
        console.log(json);
        return json})
    .catch((e) => console.log(e));
}

const base_fetch = async (param_url) => {return generic_fetch(base_uri, param_url)};
export const getPosterUrl = (movie) => {
    return images_uri + movie.poster_path;
}

export const getLink = (movie) => {
    console.log("Movie id :", movie["id"]);
    return "https://www.themoviedb.org/movie/" + movie["id"];
}
// API Methods to get data from one-liners in the actual code
