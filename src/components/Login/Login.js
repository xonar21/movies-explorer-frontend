import React from "react";

import './Login.css';

import { routes } from '../../utils/constants';

import formValidationHook from '../../hook/formValidationHook';

import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';

function Login(props) {

  const { values, isValid, handleChange, errors } = formValidationHook({
		email: '',
		password: '',		
	 })

  const onLoginSumbit = (evt) => {
		evt.preventDefault()
		if (isValid) {
		props.handleLogin({ email: values.email, password: values.password })	
		}	
	}
  return (
    <div className='login'>
        <Link to={routes.main}><img src={logo} className='login__logo'/></Link>
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='login__form'  onSubmit={onLoginSumbit} noValidate>
            <label className='login__label'>
                <span className='login__span'>E-mail</span>
                <input type='email' className='login__input' name="email" onChange={handleChange} values={values.email}></input>
            </label>
            <label className='login__label'>
                <span className='login__span'>Пароль</span>
                <input type='password' className='login__input' name="password" onChange={handleChange} values={values.password}></input>
            </label>
            <button className='login__button'>Войти</button>
            <p className='login__text'>Ещё не зарегистрированы?<Link className='login__register'to={routes.register}>Регистрация</Link></p>
        </form>
    </div>
  );
}

export default Login; 