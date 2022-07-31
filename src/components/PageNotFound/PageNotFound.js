import React from "react";
import './PageNotFound.css'
import { Link } from 'react-router-dom'

function PageNotFound (){
	
	return (
		<section className="not-found">
			<div className="not-found__container">
			<h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
			</div>
			<Link className="not-found__btn-link" to="/">Назад</Link>
		</section>
	);
}

export default PageNotFound;