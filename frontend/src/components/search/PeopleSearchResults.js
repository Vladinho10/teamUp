import React from 'react';
// import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RadioButton } from '../SvgIcons';

const PeopleSearchResults = props => (
  <React.Fragment>
    <section className="filter-results">
      <h2 className="filter-results__heading">Filter results</h2>
      <div className="filter-results__filters">
        <NavLink to="/">
          <label for="event-member">Event member</label>
          <button id="event-member"><RadioButton /></button>
        </NavLink>
      </div>
    </section>
    <section className="search-results">
      <section className="people-results">
        <header className="people-results__header">
          <h3 className="people-results__heading">
            <UsersIcon />
            <span>People</span>
          </h3>
        </header>
        <section className="people-results__container">
        </section>
      </section>
    </section>
  </React.Fragment>
);

export default PeopleSearchResults;
