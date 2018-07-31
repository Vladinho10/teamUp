import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { UsersIcon, EventIcon } from '../SvgIcons';
import Users from './Users';
import Event from './Event';
import getSearch from '../../actions/searchActions';

class AllSearchResults extends Component {
  state = {
    eventsCount: 3
  }

  componentDidMount = () => {
    this.props.dispatch(getSearch(this.props.location.search.slice(7)));
  }

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
    console.log(this.props, 'queryyyyyyyyy');
    const tempArray = [];

    const searchEventsResults = this.props.searchData.filter((item) => {
      return !!item.title;
    });

    for (let i = 0; i < searchEventsResults.length; i += 1) {
      if (i < this.state.eventsCount) {
        tempArray.push(searchEventsResults[i]);
      }
    }

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
                {
                  tempArray.map((event) => {
                    return (
                      <Event event={event} />
                    );
                  })
                }
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
