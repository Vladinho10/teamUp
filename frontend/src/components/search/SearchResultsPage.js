import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import Header from '../Header';
import AllSearchResults from './AllSearchResults';
import PeopleSearchResults from './PeopleSearchResults';
import EventsSearchResults from './EventsSearchResults';
// import { EventClockIcon, EventLocationIcon, PhotoIcon } from './SvgIcons';

class SearchResultsPage extends Component {
  render() {
    // console.log(this.props, 'searchresultspage');
    return (
      <React.Fragment>
        <Header state={this.state}/>
        <main className="search-main" role="main">
          <header className="search-header">
            <nav role="navigation" className="search-header__navbar navbar">
              <ul className="navbar__list">
                <li className="navbar__item"><NavLink className={`${this.props.location.pathname === '/search/all/' && 'navbar__active-link'} navbar__link`} activeClassName="navbar-active-link" exact to={`/search/all/${this.props.location.search}`}>All</NavLink></li>
                <li className="navbar__item"><NavLink className={`${this.props.location.pathname === '/search/people/' && 'navbar__active-link'} navbar__link`} activeClassName="navbar-active-link" to={`/search/people/${this.props.location.search}`}>People</NavLink></li>
                <li className="navbar__item"><NavLink className={`${this.props.location.pathname === '/search/events/' && 'navbar__active-link'} navbar__link`} activeClassName="navbar-active-link" to={`/search/events/${this.props.location.search}`}>Events</NavLink></li>
              </ul>
            </nav>
          </header>
          <div className="row">
            <div className="main-wrapper">
              {(this.props.match.path === '/search/all/' && <AllSearchResults />)
                || (this.props.match.path === '/search/people/' && <PeopleSearchResults />)
                || (this.props.match.path === '/search/events/' && <EventsSearchResults />)
              }
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps, 'searchresultspage ownprrops'); here i can find the query
  return {
    searchData: state.searchData
  };
};

export default withRouter(
  connect(mapStateToProps)(SearchResultsPage)
);
