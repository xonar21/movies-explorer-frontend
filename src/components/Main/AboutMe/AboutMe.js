import './AboutMe.css';

import avatar from '../../../images/avatar.jpg';

function AboutMe() {
  return (
    <div id='aboutMe' className='aboutMe'>
        <h2 className='mainTitle aboutMe__title'>Студент</h2>
        <div className='aboutMe__groupInfo'>
            <h3 className='aboutMe__name'>Жан</h3>
            <p className='aboutMe__subname'>Фронтенд-разработчик, 21 год</p>
            <p className='aboutMe__about'>Я родился в Молдавии, в детстве переехал в Россию, живу в Самаре, закончил факультет информационных систем в СГЭУ. Люблю слушать разную музыку и спорт. Кодить начал еще в 2016 году, но никак не решался заняться этим серьезно. Прошел курс по веб-разработке в Яндексе.</p>
            <div className='aboutMe__groupLinks'>
                <a target="_blank" href='https://vk.com/id360041060' className='aboutMe__link'>Вконтакте</a>
                <a target="_blank" href='https://github.com/xonar21' className='aboutMe__link'>Github</a>
            </div>
        </div>
        <img className='aboutMe__avatar' src={avatar}/>
    </div>
  );
}

export default AboutMe; 