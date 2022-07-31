
import React from "react";
import './MoviesCard.css'

function MoviesCard({savedMovies, isSaved, movie, movieDuration, handleMovieDelete, handleSavedMovie, }) {



  const [isLiked, setIsLiked] = React.useState(false)

  const [delMovieId, setIsDelMovieId] = React.useState('0')

   const likedMovie = {
      country: movie.country || 'Нет данных',
      director: movie.director || 'Нет данных',
      duration: movie.duration || 0,
      year: movie.year || 'Нет данных',
      description: movie.description || ' ',
      image: isSaved ? movie.image : `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: isSaved ? movie.trailerLink : movie.trailerLink || 'https://youtube.com',
      thumbnail: isSaved ? movie.thumbnail : `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      nameRU: movie.nameRU || 'Нет данных',
      nameEN: movie.nameEN || 'Нет данных',
      movieId: isSaved ? movie._id : movie.id,
    }

 
  React.useEffect(() => {
   if (savedMovies) {
    
     if (!isSaved) {
       const checkSave = savedMovies?.find((item) => +item.movieId === +movie.id)
       if (checkSave) {
         setIsLiked(true)
       } else {
         setIsLiked(false)
       }
     }
   }
 }, [])

 React.useEffect(() => {
      if (savedMovies) {
     if (!isSaved) {
    
       const checkSave = savedMovies.find((item) => +item.movieId === +movie.id)
       if (checkSave) {
         setIsLiked(true)
     
         likedMovie.movieId = checkSave._id
         setIsDelMovieId(checkSave._id)
       } else {
         setIsLiked(false)
       }
     }
   }
 }, [savedMovies])


 const handleTrailerOpen = () => {
   window.open(`${likedMovie.trailerLink}`, `Трейлер фильма "${likedMovie.nameRU}"`)
 }
 const handleLikeClick = async () => {

   if (isSaved) {
      handleMovieDelete({ movieId: likedMovie.movieId })
   } else if (isLiked) {
   
     handleMovieDelete({ movieId: delMovieId })
   } else {
   
     handleSavedMovie({ movie: likedMovie })
   }
 }


   return (
            <div className="movies-card">
               
                  <h3 className="movies-card__title">{likedMovie.nameRU}</h3>
                  <p className="movies-card__lenght">{movieDuration}</p>
                  <img className="movies-card__picture-film" alt="Картинка фильма" src={likedMovie.image} onClick={handleTrailerOpen}/>
                  {isSaved && (
                     <button className="movies-card__button movies-card__button_type_close-btn" type='button' 
                     aria-label='Кнопка удаления фильма'
                     onClick={handleLikeClick}></button>
                  )}
                  {!isSaved && (
                   <button className={isLiked ? 'movies-card__button movies-button_type_active-like-btn' : 'movies-card__button movies-button_type_unactive-like-btn'}
                    type='button' aria-label='Кнопка для постановки и удаления лайков' onClick={handleLikeClick}>Сохранить</button>
                  )}                  
              
               
            </div>           

   );
}

export default MoviesCard;