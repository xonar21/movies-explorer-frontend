import React from "react";

import './Register.css';

import { routes } from '../../utils/constants';

import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';

import formValidationHook from '../../hook/formValidationHook';

function Register(props) {
    
    const { values, isValid, handleChange, errors } = formValidationHook({
        email: '',
        password: '',
        name: '',
     })
     const onRegisterSumbit = (evt) => {
        evt.preventDefault()
        props.handleRegister({ email: values.email, name: values.name, password: values.password })
     }

  return (
    <div className='register'>
        <Link to={routes.main}><img src={logo} className='register__logo'/></Link>
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form' onSubmit={onRegisterSumbit}>
            <label className='register__label'>
                <span className='register__span'>Имя</span>
                <input required type='text' className='register__input' name="name" onChange={handleChange} values={values.name}></input>
                <span className='register__inputErr'>{errors.name}</span>
            </label>
            <label className='register__label'>
                <span className='register__span'>E-mail</span>
                <input required type='email' className='register__input' name="email" onChange={handleChange} values={values.email}></input>
                <span className='register__inputErr'>{errors.email}</span>
            </label>
            <label className='register__label'>
                <span className='register__span'>Пароль</span>
                <input required type='password' className='register__input' name="password" onChange={handleChange} values={values.password}></input>
                <span className='register__inputErr'>{errors.password}</span>
            </label>
            <button className='register__button'>Зарегистрироваться</button>
            <p className='register__text'>Уже зарегистрированы?<Link className='register__login' to={routes.login}>Войти</Link></p>
        </form>
    </div>
  );
}

export default Register; 