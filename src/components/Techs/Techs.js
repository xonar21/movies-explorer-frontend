
import React from "react";
import './Techs.css'

function Techs(){
	return ( 
<section className="techs" id="techs">
<h2 className="techs__title">Технологии</h2>
<div className="techs__container">
<h3 className="techs__subtitle">7 технологий</h3>
<p className="techs__about">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
<ul className="techs__skills">
	<li className="techs__skills-item">HTML</li>
	<li className="techs__skills-item">CSS</li>
	<li className="techs__skills-item">JS</li>
	<li className="techs__skills-item">React</li>
	<li className="techs__skills-item">Git</li>
	<li className="techs__skills-item">Express.js</li>
	<li className="techs__skills-item">mongoDB</li>
	</ul>
</div>
</section>
);
}

export default Techs;