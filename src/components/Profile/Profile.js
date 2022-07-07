import Header from '../Header/Header';

import Footer from '../Footer/Footer'

import './Profile.css';

function Profile() {
  return (
    <>
      <Header />
      <div className='profile'>
          <h2 className='profile__title'>Привет, Жан!</h2>
          <form className='profile__form'>
              <div className='profile__groupName'>
                  <p className='profile__textName'>Имя</p>
                  <input type='text' className='profile__name'></input>
              </div>
              <div className='profile__groupEmail'>
                  <p className='profile__textEmail'>E-mail</p>
                  <input type='text' className='profile__email'></input>
              </div>
              <button type='submit' className='profile__edit'>Редактировать</button>
              <button type='submit' className='profile__logout'>Выйти из аккаунта</button>
          </form>
      </div>
    </>
  );
}

export default Profile; 