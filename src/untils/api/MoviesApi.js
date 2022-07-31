
import { beatfilmsUrl } from '../constants';


const checkResponse = (res) => {
   if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`); 
   }
   return res.json();
};


export const getSavedMovies = () => {
   return fetch(beatfilmsUrl, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   })
      .then(checkResponse);
}