import React from 'react';
import { NavLink } from 'react-router-dom';
import { SearchIcon } from './SvgIcons';

const logo = require('../../dist/images/logo.png');

const Header = () => (
  <header className="header">
    <div className='row'>
      <div className="navbar">
        <p className="navbar__logo-box">
          <NavLink to="/" role="link"><img src={logo} alt="logo" width="190" height="80" className="navbar__logo" role="logo" /></NavLink>
        </p>
        <div className="navbar__search-box">
          <form className="navbar__form search-form" action="/:id" method="get">
            <div className="icon-wrapper">
              <input type="text" name="eventSearch" placeholder="Search" className="search-form__input" aria-label='Enter search text'/>
              <SearchIcon className="search__icon" role="icon" />
            </div>
          </form>
        </div>
        <ul className="navbar__list">
          <li className="navbar__item">
            <NavLink role="link" to="/notifications" activeClassName="navbar__link navbar__link--is-active" exact={true}>Notifications</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink role="link" to="/" activeClassName="navbar__link navbar__link--is-active">Logout</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
);

export default Header;
