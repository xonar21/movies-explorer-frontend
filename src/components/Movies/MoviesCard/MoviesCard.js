import { useState } from 'react';

import saved from '../../../images/saved.svg';

import deleted from '../../../images/deleteSaved.svg';

import { routes } from '../../../utils/constants';

import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

function MoviesCard({movie}) {
  const [isMovieSaved, setIsMovieSaved] = useState(false);

  function handleChangeMovieSaved() {
    setIsMovieSaved(!isMovieSaved);
  }
  let location = useLocation()

  return (
    <div className='moviesCard'>
        <h2 className='moviesCard__title'>{movie.title}</h2>
        <p className='moviesCard__time'>{movie.length}</p>
        <img src={movie.src} alt={movie.title} className='moviesCard__img'/>
        {
          location.pathname === routes.movies ?
            isMovieSaved ? 
              <img onClick={handleChangeMovieSaved} src={saved} className='moviesCard__buttonSaved'/>
            :
              <button onClick={handleChangeMovieSaved} type='button' className='moviesCard__button'>Сохранить</button>
            :
            <img onClick={handleChangeMovieSaved} src={deleted} className='moviesCard__buttonSaved'/>
        }
        
    </div>
  );
}

export default MoviesCard; 