import logo from '../../images/logo.svg';

import { routes } from '../../utils/constants';

import { Link, useLocation } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

import './Header.css';

function Header() {

  let location = useLocation();

  return (
    <div className='header'>
      
      <Link to={routes.main}><img src={logo} className='header__logo'/></Link>
      {
      location.pathname === routes.main ?
      '' :
      <div className='header__links'>
        <Link className='header__link' to={routes.movies}>Фильмы</Link>
        <Link className='header__link' to={routes.savedMovies}>Сохраненные фильмы</Link>
      </div>
      }
      <Navigation />
    </div>
  );
}

export default Header; 