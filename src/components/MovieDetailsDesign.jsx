import React from 'react';
import '../MovieDetailsDesign.css'
import AddToFavorite from './buttons/AddToFavorite';
const MovieDetailsDesign = ({  id, title, release_date, overview, vote_average, popularity, vote_count, original_language, poster_path }) => {
  const posterUrl = `https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`;
  const formattedDate = new Date(release_date).toLocaleDateString();

  return (
    <div className="movie-details">
      <div className="movie-poster">
        <img src={posterUrl} alt={title} />
      </div>
      <div className="movie-info">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' ,marginBottom:'15px'}}>
        <h1 style={{margin:'0',marginBottom:'0',marginRight:'15px'}} className="movie-title">{title}</h1>
        <AddToFavorite
          id = {id}
          poster_path = {poster_path}
          original_title ={title}
          release_date = {release_date}
          vote_average = {vote_average}
        />
        </div>
        <div className="movie-metadata">
          <p className="movie-release-date">Release Date: {formattedDate}</p>
          <p className="movie-language">Language: {original_language}</p>
        </div>
        <p className="movie-overview">{overview}</p>
        <div className="movie-ratings">
          <p className="movie-rating">Rating: {vote_average}/10</p>
          <p className="movie-popularity">Popularity: {popularity}</p>
          <p className="movie-vote-count">Vote Count: {vote_count}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsDesign;
