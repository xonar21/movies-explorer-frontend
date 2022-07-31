
import React from "react";
import './Login.css'
import { Link } from 'react-router-dom'
import formValidationHook from '../../hook/formValidationHook';

function Login(props){

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
		<section className="login">
<div className="login-container">

<Link className="login__logo" to="/" />

<h1 className="login__title">Рады видеть!</h1>
<form className="login__form" name="login" onSubmit={onLoginSumbit} noValidate>
<ul className="login__form-input-list">
	<li className="login__form-input-list-item">
	<label className="login__form-input-label">E-mail</label>
	<input className={errors.email ? 'login__form-input login__form-input_type_error' : 'login__form-input'} name="email" type="email" 
	placeholder="Ваш e-mail" required onChange={handleChange} values={values.email} pattern="[^@\s]+@[^@\s]+\.[^@\s]+"/>
	<span className="login__form-input-error">{errors.email}</span>
	</li>

	<li className="login__form-input-list-item">
	<label className="login__form-input-label">Пароль</label>
	<input className={errors.password ? 'login__form-input login__form-input_type_error' : 'login__form-input'} name="password" 
	type="password" placeholder="Ваш пароль" minLength="8" maxLength="20" required onChange={handleChange} values={values.password}/>
	<span className={!isValid ? 'login__form-input-error login__form-input-error_active' : 'login__form-input-error'}>{errors?.email} {errors?.password}</span> 
	</li>	
	<span className={props.loginError ? 'login__form-input-error login__form-input-error_active' : 'login__form-input-error'}>{props.loginError}</span>
</ul>
<button className="login__button" type="submit" aria-label='Кнопка отправить' disabled={!isValid}>Войти</button>
			<div className="login__form-button-container">
				<p className="login__question">Ещё не зарегистрированы?</p>
				<Link className="login__form-link" to="/signup">Регистрация</Link>  
			</div>
</form>
</div>
</section>
);
}

export default Login;