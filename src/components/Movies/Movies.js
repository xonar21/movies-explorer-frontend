import React from "react";
import './Movies.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from "./SearchForm/SearchForm";

function Movies(props){
	return ( 
<div>
   <Header loggedIn={props.loggedIn}/>
	<SearchForm
	savedMovies={props.savedMovies}
	allMovies={props.allMovies}
	handleSavedMovie={props.handleSavedMovie}
	handleMovieDelete={props.handleMovieDelete}
	isSaved={false}
	cardCount={props.cardCount}
	/>   
	<Footer />
</div>
);
}

export default Movies;