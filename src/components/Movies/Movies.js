import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import Header from '../Header/Header';

import SearchForm from '../Movies/SearchForm/SearchForm';

import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

import Footer from '../Footer/Footer';

import { saveMovies, getMovies, deleteSavedMovies } from "../../utils/api/MainApi";

import { getSavedMovies } from "../../utils/api/MoviesApi";

import { screenSize, cardsCount } from "../../utils/definitionScreen";
import shortMoviesHandle from "../../utils/shortMovies";

function Movies({ isLogin }) {
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [movies, setMoviesList] = useState([]);
  const [renderedFilms, setRenderedFilms] = useState([]);
  const [countClickMoreFilms, setCountClickMoreFilms] = useState(1);
  const [visibilityMoviesList, setVisibilityMoviesList] = useState("");
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [visibilityBtnYet, setVisibilityBtnYet] = React.useState(
    " "
  );
  const [isShortFilms, setIsShortFilms] = React.useState(false);

  React.useEffect(() => {
        getMovies()
        .then((savedMoviesData) => {
          if (savedMoviesData) {
            setSavedMovies(savedMoviesData);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      if (pathname === "/saved-movies") {
        setVisibilityMoviesList("movies_visibility");
      }
    
  }, []);

  function filterMovies(films) {
    if (isShortFilms) {
      return shortMoviesHandle(films);
    }
    return films.filter((movie) => movie.duration >= 40)
  }

  const filteredMovies = React.useMemo(
    () => filterMovies(movies),
    [isShortFilms, movies]
  );
  const filteredRenderedMovies = React.useMemo(
    () => filterMovies(renderedFilms),
    [isShortFilms, renderedFilms]
  );
  const filteredSavedMovies = React.useMemo(
    () => filterMovies(savedMovies),
    [isShortFilms, savedMovies]
  );

  React.useEffect(() => {
    if (filteredRenderedMovies.length === filteredMovies.length) {
      setVisibilityBtnYet("moviesCardList__moreNone");
    } else {
      
    }
  }, [filteredMovies, filteredRenderedMovies]);

  function countInitCards() {
    const width = screenSize();
    if (width >= 1280) {
      return 12;
    }
    if (width >= 757) {
      return 8;
    }
    return 5;
  }

  function handleMoreRenderFilms() {
    const cards = countInitCards();
    setRenderedFilms(
      filteredMovies.slice(0, cards + countClickMoreFilms * cardsCount())
    );
    setCountClickMoreFilms(countClickMoreFilms + 1);
  }

  function filterMoviesFromLS(moviesList) {
    const films = moviesList.filter((movie) =>
      movie.nameRU.includes(searchValue)
    );

    setMoviesList(() => {
      localStorage.setItem("foundFilms", JSON.stringify(films));
      return films;
    });
  }

  function handleSearch(event) {
    event.preventDefault();
    if (searchValue === "") {
      setInputError("Нужно ввести ключевое слово");
      return;
    }
    setVisibilityMoviesList("");
    if (pathname === "/movies") {
      if (!localStorage.getItem("moviesList")) {
        getSavedMovies()
          .then((moviesList) => {
            localStorage.setItem("moviesList", JSON.stringify(moviesList));
            filterMoviesFromLS(JSON.parse(localStorage.moviesList));
            setVisibilityMoviesList("movies_visibility");
            setVisibilityBtnYet("");
          })
          .catch((err) => console.log(err));
        return;
      }

      filterMoviesFromLS(
        localStorage.getItem("moviesList")
          ? JSON.parse(localStorage.moviesList)
          : []
      );
      setVisibilityMoviesList("movies_visibility");
      setVisibilityBtnYet("");
    } else {
      setSavedMovies(
        savedMovies.filter((movie) => movie.nameRU.includes(searchValue))
      );
      setVisibilityMoviesList("movies_visibility");
    }
  }

  function postMovie(movie) {
        saveMovies(movie)
        .then((dataMovie) => {
          setSavedMovies([dataMovie, ...savedMovies]);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function removeMovie(movieId) {
        deleteSavedMovies(movieId)
        .then(() => {
          const newMovies = savedMovies.filter(
            (movie) => movie._id !== movieId
          );
          setSavedMovies(newMovies);
        })
        .catch((err) => {
          console.log(err);
        });
  
  }
  return (
    <div>
      <Header bgColor="white" textColor="black" isLogin={isLogin} />
      <SearchForm
        onSubmit={handleSearch}
        inputError={inputError}
        setInputError={setInputError}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isShortFilms={isShortFilms}
        setIsShortFilms={setIsShortFilms}
      />
      <MoviesCardList
        movies={filteredMovies}
        visibilityMoviesList={visibilityMoviesList}
        renderedFilms={filteredRenderedMovies}
        setRenderedFilms={setRenderedFilms}
        handleMoreRenderFilms={handleMoreRenderFilms}
        countInitCards={countInitCards}
        postMovie={postMovie}
        removeMovie={removeMovie}
        savedMovies={filteredSavedMovies}
        setVisibilityMoviesList={setVisibilityMoviesList}
        visibilityBtnYet={visibilityBtnYet}
        setVisibilityBtnYet={setVisibilityBtnYet}
        shortMoviesHandle={shortMoviesHandle}
        isShortFilms={isShortFilms}
      />
      <Footer />
    </div>
  );
}

export default Movies; 