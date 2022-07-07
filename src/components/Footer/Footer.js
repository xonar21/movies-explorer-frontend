import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__links'>
        <p className='footer__year'>© 2022</p>
        <a href='https://practicum.yandex.ru/' className='footer__link' target="_blank">Яндекс.Практикум</a>
        <a href='https://github.com/yandex-praktikum' className='footer__link' target="_blank">Github</a>
        <a href='https://www.facebook.com/yandex.practicum/' className='footer__link' target="_blank">Facebook</a>
      </div>
    </div>
  );
}

export default Footer; 