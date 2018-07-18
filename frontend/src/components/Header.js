import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <p className="header__logo-box">
      <NavLink to="/" role="logo"><img/>Logo</NavLink>
    </p>
    <div className="header__serach-box">
      <form className="header__form search-form" action="/:id" method="get">
        <input type="search" name="eventSearch" placeholder="Search" className="search-form__input" aria-label='Enter search text'/>
      </form>
    </div>
    <ul>
      <li>
        <NavLink role="link" to="/notifications" activeClassName="is-active" exact={true}>Notifications</NavLink>
      </li>
      <li>
        <NavLink role="link" to="/" activeClassName="is-active">Logout</NavLink>
      </li>
    </ul>

  </header>
);

export default Header;

// <svg type="jsx" className="search__icon"><use href=".images/icons/search.svg"></use></svg>
