import { useEffect, useState } from 'react';

const AddToFavorite = ({ id, poster_path, original_title, release_date, vote_average }) => {
  const [starFilled, setStarFilled] = useState(false);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const isMovieInLocalStorage = movies.some((movie) => movie.id === id);
    setStarFilled(isMovieInLocalStorage);
  }, [id]);

  const handleStarClick = (event) => {
    event.preventDefault();
    setStarFilled(!starFilled);

    if (!starFilled) {
      const movies = JSON.parse(localStorage.getItem('movies')) || [];
      localStorage.setItem(
        'movies',
        JSON.stringify([...movies, { id, poster_path, original_title, release_date, vote_average }])
      );
    } else {
      const movies = JSON.parse(localStorage.getItem('movies')) || [];
      const updatedMovies = movies.filter((movie) => movie.id !== id);
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
    }
  };

  return (
    <div>
      {starFilled ? (
        <button
          style={{
            backgroundColor: '#999',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '25px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
          }}
          onClick={handleStarClick}
        >
          Remove from favorites
        </button>
      ) : (
        <button
          style={{
            backgroundColor: '#ffbc00',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '25px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
          }}
          onClick={handleStarClick}
        >
          Add to favorites
        </button>
      )}
    </div>
  );
};

export default AddToFavorite;
