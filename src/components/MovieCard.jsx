import React, { useState , useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardContainer = styled(Link)`
  position: relative;
  width: 198px;
  height: 360px;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  text-decoration: none;
`;

const CardImage = styled.img`
  width: 100%;
  height: 70%;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
`;

const CardSubtitle = styled.p`
  margin: 4px 0 0;
  font-size: 0.9rem;
  color: #666;
`;

const RatingCircle = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;

  ${({ rating }) => {
    if (rating >= 8) {
      return `background-color: green;`;
    } else if (rating >= 4) {
      return `background-color: #DAA520;`;
    } else {
      return `background-color: red;`;
    }
  }};
`;

const StarIcon = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 100;
  &:hover {
    opacity: 0.8;
  }
`;

const fStar =
  'https://img.icons8.com/color/256/filled-star--v1.png';
const ufStar =
  'https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-line-yellow-icon.png';

const MovieCard = ({
  id,
  poster_path,
  original_title,
  release_date,
  vote_average,
}) => {
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
      localStorage.setItem('movies', JSON.stringify([...movies, { id, poster_path, original_title, release_date, vote_average }]));
    } else {
      const movies = JSON.parse(localStorage.getItem('movies')) || [];
      const updatedMovies = movies.filter(movie => movie.id !== id);
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
    }
  };

  return (
    
    <CardContainer to={`/search/${id}`}>
      <StarIcon
        src={starFilled ? fStar : ufStar}
        onClick={handleStarClick}
      />
      <CardImage
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`}
        alt={original_title} 
      />
      <CardContent>
        <CardTitle>{original_title}</CardTitle>
        <CardSubtitle>
          Release: {new Date(release_date).toLocaleDateString()}
        </CardSubtitle>
      </CardContent>
      <RatingCircle rating={vote_average}>{vote_average}</RatingCircle>
    </CardContainer>
  );
};

export default MovieCard;
