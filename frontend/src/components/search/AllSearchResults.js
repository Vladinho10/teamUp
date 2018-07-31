import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { UsersIcon, EventIcon } from '../SvgIcons';
import User from './User';
import Event from './Event';
import getSearch from '../../actions/searchActions';

class AllSearchResults extends Component {
  state = {
    count: 3,
    join: true
  }

  componentDidMount = () => {
    this.props.dispatch(getSearch(this.props.location.search.slice(7)));
  }

  handlePeopleLocationChange = () => {
    this.props.history.push({
      pathname: `/search/people/${this.props.location.search}`,
      // search: '?query=abc',
    });
  }

  handleEventsLocationChange = () => {
    this.props.history.push({
      pathname: '/search/events/',
      // search: `${this.props.location.search}`
    });
  }

  render() {
    const tempArrayEvents = [];
    const tempArrayUsers = [];

    const searchEventsResults = this.props.searchData.filter((item) => {
      return !!item.title;
    });

    const searchUserResults = this.props.searchData.filter((item) => {
      return !!item.name;
    });

    for (let i = 0; i < searchUserResults.length; i += 1) {
      if (i < this.state.count) {
        tempArrayUsers.push(searchUserResults[i]);
      }
    }

    for (let i = 0; i < searchEventsResults.length; i += 1) {
      if (i < this.state.count) {
        tempArrayEvents.push(searchEventsResults[i]);
      }
    }

    return (
      <React.Fragment>
        <section className="search-results">
          <section className="people-results">
            <header className="people-results__header">
              <h3 className="people-results__heading">
                <p><UsersIcon /></p>
                <span>People</span>
              </h3>
              <NavLink to={`/search/people/${this.props.location.search}`} onClick={this.handlePeopleLocationChange}>See all</NavLink>
            </header>
            <section className="people-results__container">
              <div className="searched-users">
                {
                  tempArrayUsers.map((user) => {
                    return (
                      <User key={user._id} user={user} join={this.state.join} />
                    );
                  })
                }
              </div>
              <div className="see-all-results">
                <NavLink className="see-all-results__link" to={`/search/people/${this.props.location.search}`} onClick={this.handlePeopleLocationChange}>See all</NavLink>
              </div>
            </section>
          </section>
          <section className="event-results">
            <header className="event-results__header">
              <h3 className="event-results__heading">
                <p><EventIcon /></p>
                <span>Events</span>
              </h3>
              <NavLink className="see-all-results__link" to={`/search/events/${this.props.location.search}`} onClick={this.handleEventsLocationChange}>See all</NavLink>
            </header>
            <section className="event-results__container">
              <div className="searched-events">
                {
                  tempArrayEvents.map((event) => {
                    return (
                      <Event key={event._id} event={event} join={this.state.join} />
                    );
                  })
                }
              </div>
              <div className="see-all-results">
                <NavLink className="see-all-results__link" to={`/search/events/${this.props.location.search}`} onClick={this.handleEventsLocationChange}>See all</NavLink>
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
