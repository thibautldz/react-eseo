import { useEffect } from 'react'
import MovieCard from './MovieCard'
import { getPopularMovies } from '../lib/movie_api'

const PopularMovies = (history, props) => {
    // fetch data
    useEffect(async () => {
        const moviesData = await getPopularMovies();
        console.log("Movies data : ", moviesData);
    }

        ,[]
    );
    

    // return movie cards by iterating through data
    return null;
}

export default PopularMovies;