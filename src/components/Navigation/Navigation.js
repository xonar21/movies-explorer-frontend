import { useState } from 'react';

import burgerMenu from '../../images/burgerMenu.svg';

import close from '../../images/closeMenu.svg';

import { routes } from '../../utils/constants';

import { Link, useLocation } from 'react-router-dom';

import './Navigation.css';

function Navigation(props) {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  let location = useLocation();
  
  function burgerMenuChange() {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  }

  return (
    <div className='navigation'>
      {
      location.pathname === routes.main && !props.isLogin ?
      <div className='navigation__groupButtons'>
        <Link to={routes.register}><button className='navigation__button navigation__buttonReg'>Регистрация</button></Link>
        <Link to={routes.login}><button className='navigation__button navigation__buttonLog'>Войти</button></Link>
      </div> :
      <>
        <Link to={routes.profile} className='navigation__profile'>Аккаунт</Link>
        <img onClick={burgerMenuChange} src={burgerMenu} className='navigation__imgMenu'/>
        <div className={`navigation__coverMenu ${isHamburgerMenuOpen ? 'navigation__activeCover' : ''}`}></div>
        <div className={`navigation__burger ${isHamburgerMenuOpen ? 'navigation__active' : ''}`}>
          <img onClick={burgerMenuChange} src={close} className='navigation__burgerClose'></img>
          <Link to={routes.main} className={`navigation__burgerLink ${location.pathname === routes.main ? 'navigation__burgerLink_active' : ''}`}>Главная</Link>
          <Link to={routes.movies} className={`navigation__burgerLink ${location.pathname === routes.movies ? 'navigation__burgerLink_active' : ''}`}>Фильмы</Link>
          <Link to={routes.savedMovies} className={`navigation__burgerLink ${location.pathname === routes.savedMovies ? 'navigation__burgerLink_active' : ''}`}>Сохранённые фильмы</Link>
          <Link to={routes.profile} className='navigation__profile navigation__buttonProfile'>Аккаунт</Link>
        </div>
      </>
      }
    </div>
  );
}

export default Navigation; 