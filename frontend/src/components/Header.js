import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { SearchIcon } from './SvgIcons';
import SearchDropdown from './search/SearchDropdown';
import getSearch from '../actions/searchActions';
import Notification from './Notification';

const logo = require('../../dist/images/logo.png');

class Header extends Component {
  state = {
    query: '',
    dropdown: false,
    blurDropdown: false,
  }

  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.value, 'event target');
    if (event.target.value.length !== 0) {
      this.setState({ dropdown: true, blurDropdown: true, query: event.target.value });
    } else {
      this.setState({ dropdown: false, blurDropdown: false });
    }
    this.props.dispatch(getSearch(event.target.value));
  }

  // handleToggleDropdown = () => {
  //   this.setState({ dropdown: false });
  // }

  // handleOnBlurDropdown = () => {
  //   this.setState(state => ({ blurDropdown: !state.blurDropdown, dropdown: !state.dropdown }));
  // }

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
                  <input autoComplete='off' type="text" name="eventSearch" placeholder="Search" className="search-form__input" aria-label='Enter search text' onChange={this.handleInputChange}/>
                  <SearchIcon className="search__icon" role="icon" />
                </div>
              </form>
              <div className="search-dropdown">
                {this.state.dropdown ? <SearchDropdown
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
