import React from "react";

import Header from '../Header/Header';

import formValidationHook from '../../hook/formValidationHook';

import { CurrentUserContext } from '../../context/currentUserContext';

import './Profile.css';

function Profile(props) {

  const refName = React.useRef('')
  const refEmail = React.useRef('')

  const { errors, handleChange, isValid } = formValidationHook({
     name: refName.current.value,
     email: refEmail.current.value,
  })
  const currentUser = React.useContext(CurrentUserContext)

  const [isUpdate, setIsUpdate] = React.useState(false)

  const [isDisabledInput, setIsDisabledInput] = React.useState(false)

  React.useEffect(() => {
     if (refName.current.value === currentUser.name && refEmail.current.value === currentUser.email) {
        setIsUpdate(false)
     } else {
        setIsUpdate(true)
     }
  }, [refName.current.value, refEmail.current.value, currentUser.name, currentUser.email])

  const handleSubmit = (evt) => {
     setIsDisabledInput(true)
     evt.preventDefault()
   if (isValid) {
     const name = refName.current.value
     const email = refEmail.current.value
     props.handleUpdateUser({ name, email })
     evt.target.reset()
  }
     setIsDisabledInput(false)
  }

  return (
    <>
      <Header />
      <div className='profile'>
          <h2 className='profile__title'>{`Привет, ${currentUser?.name}`}!</h2>
          <form className='profile__form' name='profile__form' onSubmit={handleSubmit} noValidate>
              <div className='profile__groupName'>
                  <p className='profile__textName'>Имя</p>
                  <input name='profileName' type='text' className='profile__name' ref={refName}
                        onChange={handleChange} values={refName.current.value} defaultValue={currentUser.name} disabled={isDisabledInput} required></input>
                  <span className='profile__inputErr'>{errors.profileName}</span>
              </div>
              
              <div className='profile__groupEmail'>
                  <p className='profile__textEmail'>E-mail</p>
                  <input name='profileEmail' type='text' className='profile__email' required ref={refEmail} onChange={handleChange} values={refEmail.current.value} defaultValue={currentUser.email} disabled={isDisabledInput} 
                        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"></input>
                  <span className='profile__inputErr'>{errors.profileEmail}</span>
              </div>
              <button type='submit' className='profile__edit' disabled={!isValid || !isUpdate}>Редактировать</button>
              <button type='button' className='profile__logout' onClick={props.handleAccountExit}>Выйти из аккаунта</button>
          </form>
      </div>
    </>
  );
}

export default Profile; 