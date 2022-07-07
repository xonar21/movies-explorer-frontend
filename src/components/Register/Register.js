import './Register.css';

import { routes } from '../../utils/constants';

import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';

function Register() {
  return (
    <div className='register'>
        <Link to={routes.main}><img src={logo} className='register__logo'/></Link>
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form'>
            <label className='register__label'>
                <span className='register__span'>Имя</span>
                <input type='text' className='register__input'></input>
            </label>
            <label className='register__label'>
                <span className='register__span'>E-mail</span>
                <input type='email' className='register__input'></input>
            </label>
            <label className='register__label'>
                <span className='register__span'>Пароль</span>
                <input type='password' className='register__input'></input>
            </label>
            <button className='register__button'>Зарегистрироваться</button>
            <p className='register__text'>Уже зарегистрированы?<Link className='register__login' to={routes.login}>Войти</Link></p>
        </form>
    </div>
  );
}

export default Register; 