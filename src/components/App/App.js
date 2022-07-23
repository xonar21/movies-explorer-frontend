import React from 'react';

import { routes } from '../../utils/constants';

import { Route, Switch, useHistory} from 'react-router-dom';

import Profile from '../Profile/Profile';

import Register from '../Register/Register';

import Login from '../Login/Login';

import Page404 from '../Page404/Page404';

import Main from '../Main/Main';

import Movies from '../Movies/Movies';

import {
   register,
   login,
   saveMovies,
   editProfile,
   getUserInformation,
   deleteSavedMovies,
   getMovies
} from '../../utils/api/MainApi';

import {getSavedMovies} from "../../utils/api/MoviesApi";

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { CurrentUserContext } from '../../context/currentUserContext';

import UnProtectedRoute from '../UnProtectedRoute/UnProtectedRoute';

import {narrowScreen, largeScreenMoviesMore, narrowScreenMoviesMore} from '../../utils/constants';

import './App.css';

function App() {

   const [loggedIn, setloggedIn] = React.useState(false);

   const [registrationError, setRegistrationError] = React.useState('')

   const [loginError, setLoginError] = React.useState('')

   const [updateProfileError, setUpdateProfileError] = React.useState('')

   const [isSuccessfulProfileSubmit, setIsSuccessfulProfileSubmit] = React.useState(false)

   const [currentUser, setCurrentUser] = React.useState({});

   const [savedMovies, setSavedMovies] = React.useState('')

   const [cardCount, setCardCount] = React.useState(window.innerWidth > narrowScreen ? largeScreenMoviesMore : narrowScreenMoviesMore)

   const history = useHistory();

   const [screenWidth, setScreenWidth] = React.useState(window.innerWidth)

   const handleResizing = () => {
      setScreenWidth(window.innerWidth)  // Записываю сайт в стейт для лальнейшего использования
    }

    const [allMovies, setMovies] = React.useState(null)

    // Сортировка фильмов пользователя
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
                        const beatfilmsMoviesApi =res.data
                 
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
            console.log(error)
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
   setCardCount(window.innerWidth > narrowScreen ? largeScreenMoviesMore : narrowScreenMoviesMore)
 }, [screenWidth])
  return (
   <CurrentUserContext.Provider value={currentUser}>
         <div className="App">
                  <Switch>
                     <Route exact path={routes.main}>
                        <Main loggedIn={loggedIn} />
                     </Route>

                     <ProtectedRoute
                        exact
                        path="/movies"
                        component={Movies}
                        loggedIn={loggedIn}
                     />
                     
                     <ProtectedRoute
                        exact
                        path="/saved-movies"
                        component={Movies}
                        loggedIn={loggedIn}
                        currentUser={currentUser}
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
                        <Page404/>
                     </Route>
                  </Switch>
         </div>
      </CurrentUserContext.Provider>
  );
}

export default App; 