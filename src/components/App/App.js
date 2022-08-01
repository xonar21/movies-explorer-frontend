import React from "react";
// import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import './App.css'
import PageNotFound from '../PageNotFound/PageNotFound';
import { Switch, Route, useHistory } from 'react-router-dom'
import SavedMovies from '../SavedMovies/SavedMovies'
import Register from '../Register/Register'
import Login from '../Login/Login';
import Profile from '../Profile/Profile'
import {
    register,
    login,
    saveMovies,
    editProfile,
    getUserInformation,
    deleteSavedMovies,
    getMovies
} from '../../untils/api/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import UnProtectedRoute from '../UnProtectedRoute/UnProtectedRoute'
import {narrowScreen, smallScreen, largeScreenMoviesMore, narrowScreenMoviesMore, smallScreenMoviesMore} from '../../untils/constants'
import {getSavedMovies} from "../../untils/api/MoviesApi";

function App() {

  
   const [loggedIn, setloggedIn] = React.useState(false); 


   const [registrationError, setRegistrationError] = React.useState('')


   const [loginError, setLoginError] = React.useState('')


   const [updateProfileError, setUpdateProfileError] = React.useState('')


   const [isSuccessfulProfileSubmit, setIsSuccessfulProfileSubmit] = React.useState(false)


   const [currentUser, setCurrentUser] = React.useState({});

  
   const [savedMovies, setSavedMovies] = React.useState('')

   
   const [cardCount, setCardCount] = React.useState(
      window.innerWidth > narrowScreen 
      ? largeScreenMoviesMore 
      : window.innerWidth <= narrowScreen && window.innerWidth >= smallScreen
      ? narrowScreenMoviesMore
      : smallScreenMoviesMore
      )
  
   const history = useHistory();

   const [screenWidth, setScreenWidth] = React.useState(window.innerWidth)

   const handleResizing = () => {
      setScreenWidth(window.innerWidth)  
    }

    const [allMovies, setMovies] = React.useState(null)



   
   const sortingUserSavedMovies =(savedFilms, userId)=> savedFilms.filter((movie) => movie.owner ===userId);

   const handleGetMovies = () => {
       if (!allMovies) {
           getSavedMovies()
               .then(value => setMovies(value))
               .catch(reason => console.log(reason))
       }
   };

   const handleRegister = ({ name, email, password }) => {
    
      setRegistrationError('');
   
      register(name, email, password)
         .then((res) => {
           
            setCurrentUser(res.data)
    
            handleLogin({ email, password })
         })
         .catch((error) => {
            if (error.status === 409) {
               setRegistrationError('Пользователь с таким email зарегистрирован')
            }
            else {
               setRegistrationError('Что-то пошло не так');
            }
         })
   };

 
   const handleLogin = ({ email, password }) => {
   
      setLoginError('');
    
      login(email, password)
         .then((data) => {
          
            localStorage.setItem('token', data.token)
         
            getUserInformation()
               .then((userInfo) => {
             
                  if (userInfo.data.name) {
                  
                     setCurrentUser(userInfo.data)
                 
                     setloggedIn(true)
              
                     const currentUserId= userInfo.data._id
                 
                     getMovies()
                     .then((res)=>{
                        const beatfilmsMoviesApi =res
                        
               
                        const sortingUserMovies = sortingUserSavedMovies(beatfilmsMoviesApi, currentUserId)
             
                        setSavedMovies(sortingUserMovies)
                   
                        localStorage.setItem('films', JSON.stringify(sortingUserMovies))
                     })
                     .catch((error)=> console.log(error))
               
                     history.push('/movies')                     
                  }
               }).catch((error) => {
                  if (error.status === 401) {
                     setLoginError('Неправильный адрес почты или пароль')
                  }
                  else {
                     setLoginError('Что-то пошло не так. Попробуйте войти позднее.')
                  }
               })
         })
         .catch((error) => {
            if (error.status === 401) {
               setLoginError('Неправильный адрес почты или пароль')
            }
            else {
               setLoginError('Что-то пошло не так. Попробуйте войти позднее.')
            }
         })
   };


   const handleUpdateUser = ({ name, email }) => {
    
      setUpdateProfileError('');
   
      setIsSuccessfulProfileSubmit(false)
   
      editProfile(name, email)
         .then((res) => {
       
            setCurrentUser(res.data)
     
            setIsSuccessfulProfileSubmit(true)
         })
         .catch((error) => {
            if (error.status === 409) {
               setUpdateProfileError(`e-mail ${email} Пользователь с таким email зарегистрирован`)
            }
            else {
               setUpdateProfileError('Что-то пошло не так. Попробуйте войти позднее.')
            }
         })
   }

 
   const handleAccountExit = () => {
      
      localStorage.clear()
     
      setloggedIn(false)
 
      setCurrentUser('')
   
      history.push('/')
   }

  
   const handleSavedMovie =({movie}) =>{
      
    
      saveMovies(movie)
      .then(()=>{
        
         getMovies()
         .then((res)=>{
            const beatfilmsMoviesApi =res
          
            const sortingUserMovies = sortingUserSavedMovies(beatfilmsMoviesApi, currentUser._id)
          
             setSavedMovies(sortingUserMovies)
          
             localStorage.setItem('films', JSON.stringify(sortingUserMovies))
         })
         .catch((error)=> console.log(error))
      })
   }


   const handleMovieDelete =({movieId})=>{
      
      deleteSavedMovies(movieId)
      .then(()=>{
       
         getMovies()
         .then((res)=>{
            const beatfilmsMoviesApi =res
        
            const sortingUserMovies = sortingUserSavedMovies(beatfilmsMoviesApi, currentUser._id)
         
            setSavedMovies(sortingUserMovies)
           
            localStorage.setItem('films', JSON.stringify(sortingUserMovies))
         })
         .catch((error)=> console.log(error))
      })
   }

   const tokenCheck = () => {
      const token = localStorage.getItem('token')
      if (token) {
        getUserInformation()
          .then((userInfo) => {
       
            if (userInfo.data.name) {
        
              setCurrentUser(userInfo.data)
           
              setloggedIn(true)
        
              const savedFilms = JSON.parse(localStorage.getItem('films'))
              setSavedMovies(savedFilms)
            }
          })
          .catch((error) => {
         
            localStorage.clear()
            return console.log(error)
          })
      }
    }

   
  React.useEffect(() => {
   tokenCheck()
   handleGetMovies()
 }, [])

 React.useEffect(() => {
   
   window.addEventListener('resize', () =>
     setTimeout(() => {
      handleResizing()
     }, 1000),
   )
 }, [])


  React.useEffect(() => {
   setCardCount(
      window.innerWidth > narrowScreen 
      ? largeScreenMoviesMore
      : window.innerWidth <= narrowScreen && window.innerWidth >= smallScreen
      ? narrowScreenMoviesMore
      : smallScreenMoviesMore
      )
 }, [screenWidth])

   return (
      <CurrentUserContext.Provider value={currentUser}>
         <div className="App">
            <div className="page">

               <Switch>

                  <Route exact path="/">
                     <Main loggedIn={loggedIn} />
                  </Route>

                  <ProtectedRoute
                     exact path="/movies"
                     component={Movies}
                     loggedIn={loggedIn}
                     savedMovies={savedMovies}
                     allMovies={allMovies}
                     handleSavedMovie={handleSavedMovie}
                     handleMovieDelete={handleMovieDelete}
                     cardCount={cardCount}
                  />

                  <ProtectedRoute
                     exact path="/saved-movies"
                     loggedIn={loggedIn}
                     component={SavedMovies}
                     savedMovies={savedMovies}
                     handleMovieDelete={handleMovieDelete}
                     cardCount={cardCount}
                  />                  

                  <UnProtectedRoute
                     exact path="/signup"
                     handleRegister={handleRegister}
                     loggedIn={loggedIn}
                     registrationError={registrationError}
                     component={Register}                    
                  />

                  <UnProtectedRoute
                  exact path="/signin"
                  handleLogin={handleLogin}
                  loggedIn={loggedIn}
                  loginError={loginError}
                  component={Login}                   
                  />                  

                  <ProtectedRoute
                     exact path="/profile"
                     loggedIn={loggedIn}
                     component={Profile}
                     handleAccountExit={handleAccountExit}
                     handleUpdateUser={handleUpdateUser}
                     updateProfileError={updateProfileError}
                     isSuccessfulProfileSubmit={isSuccessfulProfileSubmit}
                  />
                
                  <Route path="/*">
                     <PageNotFound />
                  </Route>

               </Switch>
            </div>
         </div>

      </CurrentUserContext.Provider>
   );
}

export default App;
