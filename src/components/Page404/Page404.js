import './Page404.css';

import { routes } from '../../utils/constants';

import { Link } from 'react-router-dom';

import err from '../../images/404.svg';

function Page404() {

  return (
    <div className='page404'>
        <img src={err} className='page404__logo'/>
        <p className='page404__text'>Страница не найдена</p>
        <Link to={routes.main}><button className='page404__back'>Назад</button></Link>
    </div>
  );
}

export default Page404; 