
import React from "react";
import './Register.css';
import { Link } from 'react-router-dom';
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
      <section className="register">
         <div className="register__container">

            <Link className="register__logo" to="/" />

            <h1 className="register__title">Добро пожаловать!</h1>
            <form className="register__form" name="register" onSubmit={onRegisterSumbit}>
               <ul className="register__form-input-list">
                  <li className="register__form-input-list-item">
                     <label className="register__form-input-label">Имя</label>
                     <input className={errors.name ? 'register__form-input register__form-input_type_error' : 'register__form-input'} type="text"
                        name="name" placeholder="Ваше имя" minLength="2" maxLength="20" required onChange={handleChange} values={values.name} />
                     <span className="register__form-input-error">{errors.name}</span>
                  </li>

                  <li className="register__form-input-list-item">
                     <label className="register__form-input-label">E-mail</label>
                     <input className={errors.email ? 'register__form-input register__form-input_type_error' : 'register__form-input'} type="email"
                        name="email" placeholder="Ваш e-mail" required onChange={handleChange} values={values.email} />
                     <span className="register__form-input-error">{errors.email}</span>
                  </li>

                  <li className="register__form-input-list-item">
                     <label className="register__form-input-label">Пароль</label>
                     <input className={errors.password ? 'register__form-input register__form-input_type_error' : 'register__form-input'} type="password"
                        name="password" placeholder="Ваш пароль" minLength="8" maxLength="20"
                        required onChange={handleChange} values={values.password} />
                     <span className="register__form-input-error">{errors.password}</span>
                  </li>
                  <span className="register__form-input-error">{props.registrationError}</span>
               </ul>
               <button className="register__button" type="submit" aria-label='Кнопка отправить' disabled={!isValid}>Зарегистрироваться</button>
               <div className="register__form-button-container">
                  <p className="register__question">Уже зарегистрированы?</p>
                  <Link className="register__form-link" to="/signin">Войти</Link>
               </div>

            </form>
         </div>

      </section>
   );
}

export default Register;