import React, { useState } from "react";

import { useLocation } from "react-router-dom";

import src from '../../../images/img.png';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  movies,
  visibilityMoviesList,
  renderedFilms,
  setRenderedFilms,
  handleMoreRenderFilms,
  countInitCards,
  postMovie,
  removeMovie,
  savedMovies,
  setVisibilityMoviesList,
  visibilityBtnYet,
  setVisibilityBtnYet,}) {

    const { pathname } = useLocation();
    const [visibilityNotFound, setVisibilityNotFound] = useState("");
  
    React.useEffect(() => {
      const cards = countInitCards();
  
      if (pathname === "/saved-movies") {
        setVisibilityBtnYet("moviesCardList__moreNone");
        setVisibilityNotFound("moviesCardList__moreNone");
      } else {
        setVisibilityNotFound("");
      }
  
      if (
        localStorage.getItem("foundFilms") &&
        JSON.parse(localStorage.getItem("foundFilms")).length > 0
      ) {
        setVisibilityMoviesList("movies_visibility");
      }
  
      if (localStorage.getItem("foundFilms")) {
        setRenderedFilms(
          JSON.parse(localStorage.getItem("foundFilms")).slice(0, cards)
        );
      }
    }, [movies, setRenderedFilms, pathname]);
  
    function parseDurationMovie(durationMinutes) {
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      const durationHours = `${hours}ч ${minutes}м`;
      return durationHours;
    }

  return (
    
    <div className="moviesCardList">
      {pathname === "/movies" ? (
        renderedFilms.length > 0 ? (
          ""
        ) : (
          <p>
            Ничего не найдено
          </p>
        )
      ) : savedMovies.length > 0 ? (
        ""
      ) : (
        <p>
          Ничего не найдено
        </p>
      )}
      <ul className="moviesCardList_ul">
        {pathname === "/movies"
          ? renderedFilms.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.id}
                cardName={movie.nameRU}
                cardDuration={parseDurationMovie(movie.duration)}
                imageLink={
                  movie.image
                    ? `https://api.nomoreparties.co${movie.image.url}`
                    : "https://thumbnailer.mixcloud.com/unsafe/900x900/extaudio/c/e/e/5/95df-f97e-4e8b-a1d5-94f3ceb4f5ea"
                }
                trailerLink={movie.trailerLink}
                postMovie={postMovie}
                removeMovie={removeMovie}
                savedMovies={savedMovies}
              />
            ))
          : savedMovies.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie._id}
                cardName={movie.nameRU}
                cardDuration={parseDurationMovie(movie.duration)}
                imageLink={
                  movie.image
                    ? movie.image
                    : "https://thumbnailer.mixcloud.com/unsafe/900x900/extaudio/c/e/e/5/95df-f97e-4e8b-a1d5-94f3ceb4f5ea"
                }
                trailerLink={movie.trailerLink}
                postMovie={postMovie}
                removeMovie={removeMovie}
                savedMovies={savedMovies}
              />
            ))}
      </ul>
      {movies.length > renderedFilms.length || pathname !== "/saved-movies" ? (
        <button
          className={`moviesCardList__more ${visibilityBtnYet}`}
          type="button"
          onClick={handleMoreRenderFilms}
        >
          Ещё
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default MoviesCardList;