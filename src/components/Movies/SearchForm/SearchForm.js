import React from "react";
import './SearchForm.css'
import {getFromStorage, Keys, setLocalStorage} from "../../../untils/LocalStorageHelper";
import {shortMovies} from "../../../untils/constants";
import MoviesCardList from "../../MoviesCardList/MoviesCardList";
import Preloader from "../../Preloader/Preloader";
import useFormWithValidation from "../../../hook/formValidationHook";
import logo from "../../../images/search.svg";

function SearchForm({savedMovies, allMovies, isSaved, cardCount, handleMovieDelete, handleSavedMovie}) {

    const {values, isValid, handleChange} = useFormWithValidation({
        search: '',
    })
 
    const [isPrevSearch, setIsPrevSearch] = React.useState(true)

   
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

  
    const [dataLengthMovies, setDataLengthMovies] = React.useState(0)

    const filterItemMovies = (arr, query) =>
        arr.filter((movie) => movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1)


    const handleSubmitForm = (evt) => {
        evt.preventDefault()
        if (isValid) {
            setIsPrevSearch(false)
            setIsFindCards(false)
            setIsError(false)
            setIsErrorNetwork(false)
            setIsInputDisabled(true)
            setIsPreloaderVisual(true)

            let movies = allMovies

            if (!movies) {
                setIsPreloaderVisual(false)
                setIsErrorNetwork(true)
                setIsInputDisabled(false)
                return
            }

         
            setRenderCounter(cardCount)
         
            setIsPreloaderVisual(false)
       
            setIsInputDisabled(false)
        
            const filterFilms = filterItemMovies(movies, values.search)
            const shortFilms = filterFilms.filter((movie) => movie.duration <= shortMovies)
          
            setLocalStorage(Keys.moviesLongFilmsKey, filterFilms)
            setLocalStorage(Keys.moviesShortFilmsKey, shortFilms)

            
            setLocalStorage(Keys.searchQueryKey, values.search)
            setLocalStorage(Keys.shortsSwitcherKey, isShort)
         
            setshortArrayFilms(shortFilms)
         
            setfilterArrayFilm(filterFilms)

       
            if (isShort) {
                if (shortFilms.length > 0) {
                    setMoviesStorage(shortFilms)
                    setIsNothingFound(false)
                
                    setIsFindCards(true)
                 
                    if (shortFilms.length > cardCount) {
                        setIsButtonVisible(true)
                    }
                } else {
                  
                    setIsNothingFound(true)
                    setIsFindCards(false)
                }
            } else {
                setDataLengthMovies(filterFilms.length)
                setIsButtonVisible(filterFilms.length > cardCount)
           
                setMoviesStorage(filterFilms)
                if (filterFilms.length === 0) {
                    setIsNothingFound(true)
                    setIsFindCards(false)
                } else {
                    setIsNothingFound(false)
                    setIsFindCards(true)
                }
            }
        } else {
            setIsError(true)
        }
    };

   
    React.useEffect(() => { 
        if (filterArrayFilm.length > 0) {
            setLocalStorage(Keys.shortsSwitcherKey, isShort)

         
            if (!isShort && filterArrayFilm.length > 0) {
                setIsNothingFound(false)
                setIsFindCards(true)
            }
          
            if (isShort && shortArrayFilms.length === 0) {
                setIsNothingFound(true)
                setIsFindCards(false)
            }
            if (isShort) {
                setMoviesStorage(shortArrayFilms)
             
                if (shortArrayFilms.length <= cardCount) {
                    setIsButtonVisible(false)
                }
            } else {
                setMoviesStorage(filterArrayFilm)
           
                if (filterArrayFilm.length > isrenderCounter) {
                    setIsButtonVisible(true)
                }
            }
        }
    }, [isShort]);

   
    React.useEffect(() => {
     
        const searchMovies = getFromStorage(Keys.moviesLongFilmsKey)
        const searchShortMovies = getFromStorage(Keys.moviesShortFilmsKey)
        const shortMoviesToggle = getFromStorage(Keys.shortsSwitcherKey)
        const search = getFromStorage(Keys.searchQueryKey)

        if (shortMoviesToggle) {
            setIsShort(shortMoviesToggle === true)
        }

        if (search) {
            values.search = search
        }

        setfilterArrayFilm(searchMovies ?? [])
        setshortArrayFilms(searchShortMovies ?? [])

        if (!isShort && searchMovies?.length > 0) {
       
            setMoviesStorage(searchMovies)
            setIsFindCards(true)
            setRenderCounter(cardCount)
            setDataLengthMovies(searchMovies.length)
     

            if (searchMovies.length > cardCount) {
                setIsButtonVisible(true)
            }

        } else if (isShort && searchShortMovies?.length > 0) {
            setMoviesStorage(searchShortMovies)

         
            setIsFindCards(true)
            setRenderCounter(cardCount)
            setDataLengthMovies(searchShortMovies.length)
        

            if (searchShortMovies.length > cardCount) {
                setIsButtonVisible(true)
            }
        }
    }, [])

    //чекбокс
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
                    dataLengthMovies={dataLengthMovies}
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