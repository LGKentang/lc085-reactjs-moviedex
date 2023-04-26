import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState , useEffect } from 'react';
import Header from './navbars/Header';
import Footer from './navbars/Footer';
import MovieDetailsDesign from './MovieDetailsDesign';

const MovieDetails = () => {
    const {movieId}= useParams();
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const response = await axios.get(
            'https://api.themoviedb.org/3/movie/popular?api_key=2adfa96a5e714507666e2d5a65b7e1b7&language=en-US&page=1'
          );
          const movies = response.data.results;
          console.log(movies);
    
          const remainingPages = [2, 3, 4, 5];
          const requests = remainingPages.map((page) =>
            axios.get(
              `https://api.themoviedb.org/3/movie/popular?api_key=2adfa96a5e714507666e2d5a65b7e1b7&language=en-US&page=${page}`
            )
          );
    
          const responses = await Promise.all(requests);
          const moreMovies = responses.flatMap((response) => response.data.results);
    
          setMovies([...movies, ...moreMovies]);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchMovies();
    }, []);

    const filteredMovies = movies.filter(movie => movie.id.toString().includes(movieId.toString()));
    
    return (
        <div>
            <Header/>
            <div style={{paddingTop:'40px',paddingBottom:'40px',paddingLeft:'10px',paddingRight:'10px'}}>
                {filteredMovies.map(movie => (
                <div key={movie.id}>
                  {console.log(movie.id)}
                                            <MovieDetailsDesign
                            id={movie.id}
                            title={movie.title}
                            release_date={movie.release_date}
                            overview={movie.overview}
                            vote_average={movie.vote_average}
                            popularity={movie.popularity}
                            vote_count={movie.vote_count}
                            original_language={movie.original_language}
                            poster_path={movie.poster_path}
                        />
                </div>
            ))}
            </div>
            <Footer/>
        </div>
  );
}

export default MovieDetails;