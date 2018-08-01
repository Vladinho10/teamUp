import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { SearchIcon } from './SvgIcons';
import SearchDropdown from './search/SearchDropdown';
import getSearch from '../actions/searchActions';

const logo = require('../../dist/images/logo.png');

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
    this.setState(prevState => ({ dropdown: !prevState.dropdown }));
  }

  handleToggleFocused = () => {
    this.setState(prevState => ({ focused: !prevState.focused }));
  }

  render() {
    return (
      <header className="header">
        <div className='row'>
          <nav className="navbar" role="navigation">
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
              <div onBlur={this.handleToggleDropdown} className="search-dropdown">
                {this.state.dropdown ? <SearchDropdown
                  handleToggleDropdown={this.handleToggleDropdown}
                  query={this.state.query}
                /> : null}
              </div>
            </div>
            <ul className="navbar__list">
              <li className="navbar__item">
                <NavLink role="link" to="/notifications" activeClassName="navbar__link navbar__link--is-active" exact={true}>Notifications</NavLink>
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
