import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/navbars/Header';
import Footer from '../components/navbars/Footer';
import Pagination from '../components/pagination/pagination';
import MovieCard from '.././components/MovieCard';
import axios from 'axios';

const PAGE_SIZE = 10;

const SearchPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?api_key=2adfa96a5e714507666e2d5a65b7e1b7&language=en-US&page=1'
        );
        const movies = response.data.results;

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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setCurrentPage(1);
  };

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [movies, inputValue]);

  const totalPages = Math.ceil(filteredMovies.length / PAGE_SIZE);

  let pageToDisplay = currentPage;
  if (pageToDisplay < 1) {
    pageToDisplay = 1;
  } else if (pageToDisplay > totalPages) {
    pageToDisplay = totalPages;
  }

  const start = (pageToDisplay - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const displayedMovies = filteredMovies.slice(start, end);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const styles = {
    inputContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '30px',
      backgroundColor: 'white',
    },
    input: {
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      width: '100%',
      maxWidth: '500px',
      outline: 'none',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
    },
  };

  return (
    <div
    style={{ paddingTop: '35px', height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Header />
        <div style={styles.inputContainer}>
          <input
                type="text"
                id="input-field"
                value={inputValue}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Search Movie"
              />
          </div>
            <div style={{ flex: 1, padding: '0px' }}></div>
            <div style={{ paddingTop: '0px', paddingBottom: '10px' }}>
            <Pagination
                  currentPage={pageToDisplay}
                  pageSize={PAGE_SIZE}
                  totalItems={filteredMovies.length}
                  onPageClick={handlePageClick}
                />
            <div
              style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '10px',
              }}
              >
              {displayedMovies.map((movie, idx) => (
              <MovieCard key={idx} {...movie} />
              ))}
              </div>
            <Pagination
                  currentPage={pageToDisplay}
                  pageSize={PAGE_SIZE}
                  totalItems={filteredMovies.length}
                  onPageClick={handlePageClick}
                />
          </div>
        <Footer />
      </div>
    );
  };
  
  export default SearchPage;   