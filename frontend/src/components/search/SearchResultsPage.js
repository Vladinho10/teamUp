import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Header from '../Header';
import AllSearchResults from './AllSearchResults';
import PeopleSearchResults from './PeopleSearchResults';
import EventsSearchResults from './EventsSearchResults';
// import { EventClockIcon, EventLocationIcon, PhotoIcon } from './SvgIcons';

class SearchResultsPage extends Component {
  state = {
  }

  componentDidMount = () => {

  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Header state={this.state}/>
        <main className="search-main" role="main">
          <header className="search-header">
            <nav role="navigation" className="search-header__navbar navbar">
              <ul className="navbar__list">
                <li className="navbar__item"><NavLink activeClassName="navbar__active-link" to="/search/all/">All</NavLink></li>
                <li className="navbar__item"><NavLink activeClassName="navbar__active-link" to="/search/people/">People</NavLink></li>
                <li className="navbar__item"><NavLink activeClassName="navbar__active-link" to="/search/events/">Events</NavLink></li>
              </ul>
            </nav>
          </header>
          <div className="row">
            <div className="main-wrapper">
              <AllSearchResults />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchData: state.searchData
  };
};


export default connect(mapStateToProps)(SearchResultsPage);
