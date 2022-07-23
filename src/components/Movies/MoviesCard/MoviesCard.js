import React, { useEffect, useState } from "react";

import saved from '../../../images/saved.svg';

import deleted from '../../../images/deleteSaved.svg';

import { useLocation } from 'react-router-dom';

import { CurrentUserContext } from "../../../context/currentUserContext";

import './MoviesCard.css';

function MoviesCard({
  movie,
  cardName,
  cardDuration,
  postMovie,
  savedMovies,
  removeMovie,
  imageLink,
  trailerLink,}) {

    const { pathname } = useLocation();
    const currentUser = React.useContext(CurrentUserContext);
  
    const [favoriteMovie, setFavoriteMovie] = useState(false);
    const likeIcon = favoriteMovie
      ? <img onClick={click} src={saved} className='moviesCard__buttonSaved'/>
      : <button onClick={click} type='button' className='moviesCard__button'>Сохранить</button>;
  
    const cardIcon = pathname === "/movies" ? likeIcon : <img src={deleted} onClick={click} className='moviesCard__buttonSaved'/>;
    function click() {
      functionIcon();
    }
    function handleLikeMovie() {
      if (!favoriteMovie) {
        postMovie(movie);
        setFavoriteMovie(true);
      } else {
        const movieItem = savedMovies.filter(
          (savedMovie) => savedMovie.movieId === movie.id
        );
  
        removeMovie(movieItem[0]._id);
        setFavoriteMovie(false);
      }
    }
  
    function handleDeleteButton() {
      removeMovie(movie._id);
    }
  
    useEffect(() => {
      checkAddedCard();
    }, [savedMovies, pathname, currentUser]);
  
    function checkAddedCard() {
      if (savedMovies.length > 0) {
        if (savedMovies.length > 0) {
          if (!favoriteMovie) {
            setFavoriteMovie(
              savedMovies.some(
                (savedMovie) =>
                  savedMovie.movieId === movie.id &&
                  savedMovie.owner === currentUser._id
              )
            );
          }
        }
      }
    }

    const functionIcon =
      pathname === "/movies" ? handleLikeMovie : handleDeleteButton;

  return (
    <div className='moviesCard'>
        <h2 className='moviesCard__title'>{cardName}</h2>
        <p className='moviesCard__time'>{cardDuration}</p>
        <img src={imageLink} alt={cardName} className='moviesCard__img'/>
        {cardIcon}
    </div>
  );
}

export default MoviesCard; 