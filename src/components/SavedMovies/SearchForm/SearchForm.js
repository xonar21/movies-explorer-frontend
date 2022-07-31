import React from "react";
import './SearchForm.css'
import {getFromStorage, Keys, setLocalStorage} from "../../../untils/LocalStorageHelper";
import MoviesCardList from "../../MoviesCardList/MoviesCardList";
import Preloader from "../../Preloader/Preloader";
import {shortMovies} from "../../../untils/constants";
import useFormWithValidation from "../../../hook/formValidationHook";
import logo from "../../../images/search.svg";

function SearchForm({savedMovies, allMovies, isSaved, cardCount, handleMovieDelete, handleSavedMovie}) {

    const {values, isValid, handleChange} = useFormWithValidation({
        search: '',
    })

    const [isInitiated, setIsInitiated] = React.useState(false)

   
    const [isFindCards, setIsFindCards] = React.useState(false)


    const [isError, setIsError] = React.useState(false)

 
    const [isErrorNetwork, setIsErrorNetwork] = React.useState(false)

 
    const [isInputDisabled, setIsInputDisabled] = React.useState(false)

    const [isPreloaderVisual, setIsPreloaderVisual] = React.useState(false)

  
    const [isrenderCounter, setRenderCounter] = React.useState(cardCount)

   
    const [filterArrayFilm, setfilterArrayFilm] = React.useState([])

   
    const [shortArrayFilms, setshortArrayFilms] = React.useState([])

    
    const [isShort, setIsShort] = React.useState(isSaved ? false : getFromStorage(Keys.shortsSwitcherKey) ?? false)

    const [moviesStorage, setMoviesStorage] = React.useState([])

    
    const [isNothingFound, setIsNothingFound] = React.useState(false)

    const [isButtonVisible, setIsButtonVisible] = React.useState(false)

  
    const filterItemMovies = (arr, query) =>
        arr.filter((movie) => movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1)

   
    const handleSubmitForm = (evt) => {
        evt.preventDefault()
        if (isValid) {
       
            setIsFindCards(false)
       
            setIsInputDisabled(true)
       
            setIsPreloaderVisual(true)
           
            const filterSavedMovies = filterItemMovies(savedMovies, values.search)
            const filterShortSavedFilms = filterSavedMovies.filter((movie) => movie.duration <= shortMovies)
          
            setLocalStorage(Keys.moviesSavedLongFilmsKey, filterSavedMovies)
            setLocalStorage(Keys.moviesSavedShortFilmsKey, filterShortSavedFilms)
          
            setfilterArrayFilm(filterSavedMovies)
           
            setshortArrayFilms(filterShortSavedFilms)
            if (isShort) {
                if (filterShortSavedFilms.length > 0) {
                    setMoviesStorage(filterShortSavedFilms)
                    setIsFindCards(true)
                } else {
                 
                    setIsNothingFound(true)
                    setIsFindCards(false)
                }
            } else {
                setMoviesStorage(filterSavedMovies)
                if (filterSavedMovies.length === 0) {
                    setIsNothingFound(true)
                    setIsFindCards(false)
                } else {
                    setIsNothingFound(false)
                    setIsFindCards(true)
                }
            }
           
            setIsPreloaderVisual(false)
            setIsInputDisabled(false)
        } else {
            setIsError(true)
        }
    };

   
    React.useEffect(() => { 
        if (filterArrayFilm.length > 0 || isSaved) {
            if (isInitiated) {
                if (savedMovies?.length > 0) {
                    if (isShort) {
                        if (shortArrayFilms?.length > 0) {
                            setMoviesStorage(shortArrayFilms)
                            setIsNothingFound(false)
                            setIsFindCards(true)
                        } else {
                            setIsNothingFound(true)
                            setIsFindCards(false)
                        }
                    } else if (!isShort) {
                        if (filterArrayFilm?.length > 0) {
                            setMoviesStorage(filterArrayFilm)
                            setIsNothingFound(false)
                            setIsFindCards(true)
                        } else {
                            setIsNothingFound(true)
                            setIsFindCards(false)
                        }
                    }
                } else {
                    setIsNothingFound(true)
                    setIsFindCards(false)
                }
            }
        }
    }, [isShort]);

    

    React.useEffect(() => {
        if (!isInitiated) setIsInitiated(true)

        if (savedMovies?.length > 0) {
            setMoviesStorage(savedMovies)
            setIsNothingFound(false)
            setIsFindCards(true)

            let filterSavedMovies = filterItemMovies(savedMovies, values.search)
            let filteredShortSavedMovies = filterSavedMovies.filter((movie) => movie.duration <= shortMovies)
            setfilterArrayFilm(filterSavedMovies)
            setshortArrayFilms(filteredShortSavedMovies)
        } else {
            setIsNothingFound(true)
            setIsFindCards(false)
        }
    }, [savedMovies])

    
    const onShortFilmsCheckbox = () => {
        setIsShort(!isShort)
    }

    return (
        <>
            <section className="search-form">
                <form className="search-form__form" name="search" noValidate onSubmit={handleSubmitForm}>
                    <div className="search-form__Inputs">
                        <img className="search-form_img" src={logo}/>
                        <input className="search-form__Input" name="search" placeholder="Фильм" type="search" required
                               maxLength="40"
                               onChange={handleChange} disabled={isInputDisabled} value={values.search}/>
                        <button className="search-form__Btn-submit" aria-label="Кнопка поиск" type="submit"/>
                        <label className="search-form__Checkbox-Container search-form__Checkbox-ContainerPC" htmlFor="short-films" name="short-films"
                                onClick={onShortFilmsCheckbox} id="short-films" defaultChecked={isShort}>
                            <input type="checkbox" className="searchForm__filterDef"/>
                            <span className="searchForm__filterSlider"/>
                            <p className="search-form__checkbox-title">Короткометражки</p>
                        </label>
                    </div>
                    <span
                        className={!isError ? 'search-form__input-text-error' : 'search-form__input-text-error search-form__input-text-error_active'}>
                  Нужно ввести ключевое слово.
               </span>
                    <label className="search-form__Checkbox-Container search-form__Checkbox-ContainerMB" htmlFor="short-films" name="short-films"
                                onClick={onShortFilmsCheckbox} id="short-films" defaultChecked={isShort}>
                        <input type="checkbox" className="searchForm__filterDef"/>
                        <span className="searchForm__filterSlider"/>
                        <p className="search-form__checkbox-title">Короткометражки</p>
                    </label>
                </form>
            </section>
            {isFindCards && moviesStorage?.length > 0 && (
                <MoviesCardList
                    isSaved={isSaved}
                    movies={moviesStorage}
                    dataLengthMovies={0}
                    isrenderCounter={isrenderCounter}
                    setRenderCounter={setRenderCounter}
                    cardCount={cardCount}
                    isButtonVisible={isButtonVisible}
                    setIsButtonVisible={setIsButtonVisible}
                    handleMovieDelete={handleMovieDelete}
                    handleSavedMovie={handleSavedMovie}
                    savedMovies={savedMovies}
                />
            )}
            {isPreloaderVisual && <Preloader/>}
            {isNothingFound && <p className="search-form__text-error">Ничего не найдено</p>}
            {isErrorNetwork && (
                <p className="search-form__text-error">Во время запроса произошла ошибка. Попробуйте сделать запрос еще
                    раз.</p>)}
        </>
    );
}

export default SearchForm;