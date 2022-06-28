import './Portfolio.css';

import arrow from '../../../images/arrow.svg';

function Portfolio() {
  return (
    <div className='portfolio'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <div className='portfolio__link'>
            <p className='portfolio__text'>Статичный сайт</p>
            <a className='portfolio__link' target="_blank" href='https://xonar21.github.io/how-to-learn/'><img src={arrow} className='portfolio__img'/></a>
        </div>
        <div className='portfolio__link'>
            <p className='portfolio__text'>Адаптивный сайт</p>
            <a className='portfolio__link' target="_blank" href='https://xonar21.github.io/russian-travel/'><img src={arrow} className='portfolio__img'/></a>
        </div>
        <div className='portfolio__link'>
            <p className='portfolio__text'>Одностраничное приложение</p>
            <a className='portfolio__link' target="_blank" href='https://xonar21.github.io/mesto/'><img src={arrow} className='portfolio__img'/></a>
        </div>
    </div>
  );
}

export default Portfolio; 