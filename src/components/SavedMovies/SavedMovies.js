import Header from '../Header/Header';

import SearchForm from '../Movies/SearchForm/SearchForm';

import Footer from '../Footer/Footer';

function SavedMovies(props) {
  return (
    <>
        <Header />
        <SearchForm 
        isSaved={true}
        cardCount={props.cardCount}
        handleMovieDelete={props.handleMovieDelete}
        savedMovies={props.savedMovies}
        />
        <Footer />
    </>
  );
}

export default SavedMovies; 