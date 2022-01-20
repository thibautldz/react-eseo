import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { apiKey, base_uri, images_uri, getPosterUrl, getLink } from "./movie_api";

const PopularMovies = (history, props) => {
  // fetch data

  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    fetch(base_uri + "movie/top_rated" + "?api_key=" + apiKey)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json["results"]);
        setMoviesData(json["results"]);
      })
      .catch((e) => console.log(e));
  }, []);
  
  // return movie cards by iterating through data
  return (
    <div>
      <h1> Les plus populaires de l'histoire : </h1>
      {moviesData.map((d) => (
        <div><MovieCard imageLink={getPosterUrl(d)} link={getLink(d)} title={d.title} date={d.release_date} /></div>
      ))}
    </div>
  );
};

export default PopularMovies;
