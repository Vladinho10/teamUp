import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { SearchIcon } from './SvgIcons';
import SearchDropdown from './search/SearchDropdown';
import getSearch from '../actions/searchActions';
import Notification from './Notification';
const logo = require('../../dist/images/logo.png');

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
  { value: 'one', label: 'Notification' },
  { value: 'two', label: 'Two', className: 'myOptionClassName' },
  {
   type: 'group', name: 'group1', items: [
     { value: 'three', label: 'Three', className: 'myOptionClassName' },
     { value: 'four', label: 'Four' }
   ]
  },
  {
   type: 'group', name: 'group2', items: [
     { value: 'five', label: 'Five' },
     { value: 'six', label: 'Six' }
   ]
  }
];
const defaultOption = options[0];

class Header extends Component {
  state = {
    query: '',
    dropdown: false,
    focused: false
  }

  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.value, 'event target');
    if (event.target.value.length !== 0) {
      this.setState({ dropdown: true, query: event.target.value });
    } else {
      this.setState({ dropdown: false });
    }
    this.props.dispatch(getSearch(event.target.value));
  }

  handleToggleDropdown = () => {
    this.setState({ dropdown: false });
  }

  render() {
    return (
      <header className="main-header">
        <div className='row'>
          <nav className="main-header__navbar navbar" role="navigation">
            <p className="navbar__logo-box">
              <NavLink to="/dashboard" role="link"><img src={logo} alt="logo" width="190" height="80" className="navbar__logo" role="logo" /></NavLink>
            </p>
            <div className="navbar__search-box">
              <form className="navbar__form search-form">
                <div className="icon-wrapper">
                  <input type="text" name="eventSearch" placeholder="Search" className="search-form__input" aria-label='Enter search text' onChange={this.handleInputChange}/>
                  <SearchIcon className="search__icon" role="icon" />
                </div>
              </form>
              <div className="search-dropdown">
                {this.state.dropdown ? <SearchDropdown
                  handleToggleDropdown={this.handleToggleDropdown}
                  query={this.state.query}
                /> : null}
              </div>
            </div>
            <ul className="navbar__list">
              <li className="navbar__item" style={{position:'relative'}}>
                <Notification />
              </li>

              <li className="navbar__item">
                <a role="link" href="/logout" className="navbar__link navbar__link--is-active">Logout</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchData: state.searchData
  };
};

export default withRouter(connect(mapStateToProps)(Header));
