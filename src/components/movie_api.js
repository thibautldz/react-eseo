export const apiKey = "28e63299ff61593c038bcf59b3414211";
export const base_uri = "https://api.themoviedb.org/3/";
export const images_uri = "https://image.tmdb.org/t/p/w500/";

const generic_fetch = async (base, param_url, output) => {
    return fetch(base+param_url+"?api_key="+apiKey)
    .then((response) => {
        return response.json()})
    .then((json) => {
        return json;
    })
    .catch((e) => console.log(e));
}

const base_fetch = async (param_url) => {return generic_fetch(base_uri, param_url)};


export const getPosterUrl = (movie) => {
    return images_uri + movie.poster_path;
}

export const getId = (movie) => {
    return movie["id"];
}

export const getLink = (movie) => {
    console.log("Movie id :", movie["id"]);
    return "https://www.themoviedb.org/movie/" + movie["id"];
}

export const getMovieData = async (id) => {
    return base_fetch("/movie/"+id).
        then((data) => {
            console.log("Movie data :", id, data)
            return data;
    });
}
// API Methods to get data from one-liners in the actual code
