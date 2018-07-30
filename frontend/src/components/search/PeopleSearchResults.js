import React from 'react';
// import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { RadioButton, UsersIcon } from '../SvgIcons';
import Users from './Users';

const PeopleSearchResults = props => (
  <React.Fragment>
    {console.log(props, 'peopleResult props')}
    <section className="filter-results">
      <header className="filter-results__header">
        <h2 className="filter-results__heading">Filter Results</h2>
      </header>
      <div className="filter-results__filters">
        <section className="filter-results__event-member-filters filter-section">
          <h3 className="filter-section__heading">Event member</h3>
          <NavLink to="/" className="filter-section__radio" aria-checked={true} role="radio">
            <label htmlFor="event-member">Event member</label>
            <button type="button" id="event-member"><RadioButton /></button>
          </NavLink>
        </section>
      </div>
    </section>
    <section className="search-results">
      <section className="people-results">
        <header className="people-results__header">
          <h3 className="people-results__heading">
            <p><UsersIcon /></p>
            <span>People</span>
          </h3>
        </header>
        <section className="people-results__container">
          <div className="searched-users">
            <Users />
          </div>
        </section>
      </section>
    </section>
  </React.Fragment>
);

export default withRouter(PeopleSearchResults);
