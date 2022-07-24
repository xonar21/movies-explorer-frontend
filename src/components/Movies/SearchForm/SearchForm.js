import React from 'react'

import logo from '../../../images/search.svg';

import button from '../../../images/searchbutton.svg';

import './SearchForm.css';

function SearchForm({
    onSubmit,
    searchValue,
    setSearchValue,
    inputError,
    setInputError,
    isShortFilms,
    setIsShortFilms,}) {

  return (
    <>
    <div className='searchForm'>
        <form className='searchForm__form' onSubmit={onSubmit}>
            <fieldset className='searchForm__fieldset'>
                <img src={logo} className='searchForm__logo'/>
                <input className='searchForm__search' name="search" placeholder="Фильм" type="text" value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onClick={() => setInputError('')}/>
                <button className='searchForm__button' type="submit"><img src={button} className='searchForm__seacrhImg'/></button>
                <label className='searchForm__filter searchForm__filterPC'>
                    <input type='checkbox' className='searchForm__filterDef' onClick={() => {
                setIsShortFilms(!isShortFilms);
            }}/>
                    <span className='searchForm__filterSlider' />
                    <span className='searchForm__filterLabel'>Короткометражки</span>
                </label>
            </fieldset>
            <span className='search__inputErr'>{inputError}</span>
        </form>
        
    </div>
    </>
  );
}

export default SearchForm; 