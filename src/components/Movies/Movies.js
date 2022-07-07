import Header from '../Header/Header';

import SearchForm from '../Movies/SearchForm/SearchForm';

import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

import Footer from '../Footer/Footer';

function Movies() {
  return (
    <>
        <Header />
        <SearchForm />
        <MoviesCardList />
        <Footer />
    </>
  );
}

export default Movies; 