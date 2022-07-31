import React from "react";
import './SavedMovies.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchForm from "./SearchForm/SearchForm";

function SavedMovies(props){
	return ( 
	
	<>
	<Header loggedIn={props.loggedIn}/>
	<SearchForm 
	isSaved
	cardCount={props.cardCount}
	handleMovieDelete={props.handleMovieDelete}
	savedMovies={props.savedMovies}
	/>	   
	<Footer/>
	</>
	
);
}

export default SavedMovies;