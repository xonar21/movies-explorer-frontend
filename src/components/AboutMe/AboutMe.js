
import React from "react";
import './AboutMe.css'
import aboutMePhoto from '../../images/avatar.jpg';

function AboutMe(){
	return ( 
<section className="about-me" id ="student">
	<h2 className="about-me__title">Студент</h2>
	<div className="about-me__container">
		<div className="about-me__info-container">
	<h3 className="about-me__name">Жан</h3>
	<p className="about-me__prof">Фронтенд-разработчик, 21 год</p>
	<p className="about-me__about">Я родился в Молдавии, в детстве переехал в Россию, живу в Самаре, закончил факультет информационных систем в СГЭУ. Люблю слушать разную музыку и спорт. Кодить начал еще в 2016 году, но никак не решался заняться этим серьезно. Прошел курс по веб-разработке в Яндексе.
	</p>
	<ul className="about-me__social-links">	
			<li>
			<a className="about-me__info-social-link" href="https://github.com/xonar21" target="blank">Github</a>
			</li>		
			<li>
			<a className="about-me__info-social-link" href="https://vk.com/id360041060" target="blank">Вконтакте</a>
			</li>

	</ul>
	</div>
	<img className="about-me__photo" src={aboutMePhoto} alt="Фото студента" />
	</div>
	

</section>
);
}

export default AboutMe;