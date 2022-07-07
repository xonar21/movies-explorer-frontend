import { routes } from '../../utils/constants';

import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Profile from '../Profile/Profile';

import Register from '../Register/Register';

import Login from '../Login/Login';

import Page404 from '../Page404/Page404';

import Main from '../Main/Main';

import Movies from '../Movies/Movies';

import SavedMovies from '../SavedMovies/SavedMovies';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path={routes.main} element={<Main/>}/>
          <Route exact path={routes.movies} element={<Movies/>}/>
          <Route exact path={routes.savedMovies} element={<SavedMovies/>}/>
          <Route exact path={routes.register} element={<Register/>}/>
          <Route exact path={routes.login} element={<Login/>}/>
          <Route exact path={routes.profile} element={<Profile/>}/>
          <Route path='/404' element={<Page404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 