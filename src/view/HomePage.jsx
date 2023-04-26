import '.././App.css';
import React, { useEffect, useState } from 'react';
import Pagination from '.././components/pagination/pagination';
import axios from 'axios';
import MovieCard from '.././components/MovieCard';
import Header from '.././components/navbars/Header';
import Footer from '.././components/navbars/Footer';

const PAGE_SIZE = 10;

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


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
  

  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const displayedMovies = movies.slice(start, end);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  console.log("Movies:", movies);
  return (
    <div>
      <Header/>
      <div style={{paddingTop:'10px', paddingBottom:'10px'}}>
        <Pagination
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          totalItems={movies.length}
          onPageClick={handlePageClick}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {displayedMovies.map((movie, idx) => (
            <MovieCard key={idx} {...movie} />  
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          totalItems={movies.length}
          onPageClick={handlePageClick}
        />
      </div>
      <Footer/>
    </div>
  );
}

export default HomePage;

