
import { baseUrl } from '../constants';


const checkResponse = (res) => {
   if (res.ok) {
      return res.json();
      
   }
   return Promise.reject(res); 
};



export const register = (name, email, password) => fetch(`${baseUrl}/signup`, {
   method: 'POST',
   headers: {
      "Content-Type": "application/json"
   },
   body: JSON.stringify({ name, email, password })
})
   .then(checkResponse)


export const login = (email, password) => fetch(`${baseUrl}/signin`, {
   method: 'POST',
   headers: {
      "Content-Type": "application/json"
   },
   body: JSON.stringify({ password, email })
})
   .then(checkResponse)


export const saveMovies = (movie) => fetch(`${baseUrl}/movies`, {
   method: 'POST',
   headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
   },
   body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.thumbnail,
      movieId: String(movie.movieId),
   })
})
   .then(checkResponse)


export const getMovies = () => fetch(`${baseUrl}/movies`, {
   method: 'GET',
   headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
   }
})
   .then(checkResponse)


export const deleteSavedMovies = (id) => fetch(`${baseUrl}/movies/${id}`, {
   method: 'DELETE',
   headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
   }
})
   .then(checkResponse)


export const editProfile = (name, email) => fetch(`${baseUrl}/users/me`, {
   method: 'PATCH',
   headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
   },
   body: JSON.stringify({ name, email })
})
   .then(checkResponse)


export const getUserInformation = () => fetch(`${baseUrl}/users/me`, {
   method: 'GET',
   headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
   }
})
   .then(checkResponse)
