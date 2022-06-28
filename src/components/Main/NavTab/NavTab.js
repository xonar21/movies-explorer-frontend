import './NavTab.css';

function NavTab() {
  return (
        <div className='navtab'>
            <a href='#aboutProject' className='navtab__button'>О проекте</a>
            <a href='#techs' className='navtab__button'>Технологии</a>
            <a href='#aboutMe'className='navtab__button'>Студент</a>
        </div>
  );
}

export default NavTab; 