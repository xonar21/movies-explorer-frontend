import './Login.css';

import { routes } from '../../utils/constants';

import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';

function Login() {
  return (
    <div className='login'>
        <Link to={routes.main}><img src={logo} className='login__logo'/></Link>
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='login__form'>
            <label className='login__label'>
                <span className='login__span'>E-mail</span>
                <input type='email' className='login__input'></input>
            </label>
            <label className='login__label'>
                <span className='login__span'>Пароль</span>
                <input type='password' className='login__input'></input>
            </label>
            <button className='login__button'>Войти</button>
            <p className='login__text'>Ещё не зарегистрированы?<Link className='login__register'to={routes.register}>Регистрация</Link></p>
        </form>
    </div>
  );
}

export default Login; 