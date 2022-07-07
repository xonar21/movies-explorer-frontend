import logo from '../../../images/search.svg';

import button from '../../../images/searchbutton.svg';

import './SearchForm.css';

function SearchForm() {
  return (
    <div className='searchForm'>
        <form className='searchForm__form'>
            <img src={logo} className='searchForm__logo'/>
            <input className='searchForm__search' name="search" placeholder="Фильм" type="search"/>
            <button className='searchForm__button' type="submit"><img src={button} className='searchForm__seacrhImg'/></button>
            <label className='searchForm__filter searchForm__filterPC'>
                <input type='checkbox' className='searchForm__filterDef'/>
                <span className='searchForm__filterSlider' />
                <span className='searchForm__filterLabel'>Короткометражки</span>
            </label>
        </form>
        <label className='searchForm__filter searchForm__filterMobile'>
                <input type='checkbox' className='searchForm__filterDef'/>
                <span className='searchForm__filterSlider' />
                <span className='searchForm__filterLabel'>Короткометражки</span>
        </label>
    </div>
  );
}

export default SearchForm; 