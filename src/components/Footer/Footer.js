
import React from "react";
import './Footer.css'

function Footer(){
	return ( 
<footer className="footer">
<h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
<div className="footer__container">
<p className="footer__copyright">&copy;2022</p>

<ul className="footer__links">
	<li>
		<a className="footer__link" href="https://practicum.yandex.ru/" target="blank">Яндекс.Практикум</a>
	</li>
	<li>
		<a className="footer__link" href="https://github.com/" target="blank">Github</a>
	</li>
	<li>
		<a className="footer__link" href="https://www.facebook.com/" target="blank">Facebook</a>
	</li>
</ul>
</div>

</footer>
);
}

export default Footer;