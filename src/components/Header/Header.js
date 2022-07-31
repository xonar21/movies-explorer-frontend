import React from "react";
import './Header.css'
import { Link, NavLink, useLocation } from 'react-router-dom';
import icon from '../../images/profile_icon.svg';

function Header(props) {


   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

   
   function handleOpenSidebar() {
      setIsSidebarOpen(true);
   }

   function handleCloseSidebar() {
      setIsSidebarOpen(false);
   }

   let location = useLocation();

   return (

      <header className="header">

      <Link className="header__logo" to="/" />
      {props.loggedIn && (
         <nav className="header__links">
            <NavLink className="header__link-films" activeClassName="header__link-films_type_header_active" to="/movies">Фильмы</NavLink>
            <NavLink className="header__link-films" activeClassName="header__link-films_type_header_active" to="/saved-movies">Сохранённые фильмы</NavLink>
         </nav>
      )}
      
      {props.loggedIn ? (
         <>
            <Link className="header__profile-link" to="/profile">
               <img className='header__profile-link-icon' src={icon} alt='Иконка профиля' />
            </Link>
            <button className="header__menu-button" type="button" onClick={handleOpenSidebar}></button>
         </>
      ) : (
         <nav className="header__link-container">
            <Link className="header__link-auth header__link-auth_type_up" to="/signup">Регистрация</Link>
            <Link className="header__link-auth header__link-auth_type_in" to="/signin">Войти</Link>
         </nav>

      )}

      <nav className={isSidebarOpen ? "header__link-sidebar_active" : "header__link-sidebar"}>
         <button className="header__link-sidebar-close-btn" type="button" onClick={handleCloseSidebar}></button>

         <ul className="header__link-sidebar-container">

            <li className="header__link-sidebar-container-item">
               <Link className={`header__link-films header__link_type_sidebar ${location.pathname === '/' ? 'header__link_type_sidebar_active' : ''}`} to="/">Главная</Link>
               <NavLink className="header__link-films header__link_type_sidebar" activeClassName="header__link_type_sidebar_active" to="/movies">Фильмы</NavLink>
               <NavLink className="header__link-films header__link_type_sidebar" activeClassName="header__link_type_sidebar_active" to="/saved-movies">Сохранённые фильмы</NavLink>
            </li>

            <li className="header__link-sidebar-container-item">
               <Link className="header__profile-link header__profile-link_type_sidebar" to="/profile">
                  <img className="header__profile-link-icon header__profile-link-icon_type_sidebar" src={icon} alt="Иконка профиля" />
               </Link>
            </li>

         </ul>
      </nav>

   </header>
   );
}

export default Header;