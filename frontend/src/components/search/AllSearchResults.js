import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { UsersIcon, EventIcon } from '../SvgIcons';
import Users from './Users';
import Events from './Events';

class AllSearchResults extends Component {
  handlePeopleLocationChange = () => {
    this.props.history.push({
      pathname: '/search/people/',
      // search: `${this.props.location.search}`
    });
  }

  handleEventsLocationChange = () => {
    this.props.history.push({
      pathname: '/search/events/',
      // search: `${this.props.location.search}`
    });
  }

  render() {
    return (
      <React.Fragment>
        <section className="filter-results">
          <header className="filter-results__header">
            <h2 className="filter-results__heading">Filter Results</h2>
          </header>
          <div className="filter-results__filters"></div>
        </section>
        <section className="search-results">
          <section className="people-results">
            <header className="people-results__header">
              <h3 className="people-results__heading">
                <p><UsersIcon /></p>
                <span>People</span>
              </h3>
              <NavLink to="#" onClick={this.handlePeopleLocationChange}>See all</NavLink>
            </header>
            <section className="people-results__container">
              <div className="searched-users">
                <Users />
              </div>
              <div className="see-all-results">
                <NavLink className="see-all-results__link" to="#" onClick={this.handlePeopleLocationChange}>See all</NavLink>
              </div>
            </section>
          </section>
          <section className="event-results">
            <header className="event-results__header">
              <h3 className="event-results__heading">
                <p><EventIcon /></p>
                <span>Events</span>
              </h3>
              <NavLink className="see-all-results__link" to="#" onClick={this.handleEventsLocationChange}>See all</NavLink>
            </header>
            <section className="event-results__container">
              <div className="searched-events">
                <Events />
              </div>
              <div className="see-all-results">
                <NavLink className="see-all-results__link" to="#" onClick={this.handleEventsLocationChange}>See all</NavLink>
              </div>
            </section>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchData: state.searchData
  };
};

export default withRouter(connect(mapStateToProps)(AllSearchResults));
