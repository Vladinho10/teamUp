import React from 'react';
// import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { EventIcon, PlusCircleIcon, RadioButton } from '../SvgIcons';

const EventsSearchResults = props => (
  <React.Fragment>
    <section className="filter-results">
      <header className="filter-results__header">
        <h2 className="filter-results__heading">Filter Results</h2>
      </header>
      <div className="filter-results__filters">
        <section className="filter-results__location-filters filter-section">
          <h3 className="filter-section__heading">Location</h3>
          <NavLink to="/" className="filter-section__radio" aria-checked={true} role="radio">
            <label htmlFor="anywhere">Anywhere</label>
            <button type="button" id="anywhere"><RadioButton /></button>
          </NavLink>
          <div className="filter-section__add-manual">
            <PlusCircleIcon />
            <span>Choose a city</span>
          </div>
        </section>
        <section className="filter-results__name-filters filter-section">
          <h3 className="filter-section__heading">Name</h3>
          <NavLink to="/" className="filter-section__radio" aria-checked={true} role="radio">
            <label htmlFor="title-name">Title name</label>
            <button type="button" id="title-name"><RadioButton /></button>
          </NavLink>
        </section>
        <section className="filter-results__type-filters filter-section">
          <h3 className="filter-section__heading">Type</h3>
          <NavLink to="/" className="filter-section__radio" aria-checked={true} role="radio">
            <label htmlFor="all-types">All types</label>
            <button type="button" id="all-types"><RadioButton /></button>
          </NavLink>
          <NavLink to="/" className="filter-section__radio" role="radio">
            <label htmlFor="type-sport">Sport</label>
            <button type="button" id="type-sport"><RadioButton /></button>
          </NavLink>
          <NavLink to="/" className="filter-section__radio" role="radio">
            <label htmlFor="type-meeting">Meeting</label>
            <button type="button" id="type-meeting"><RadioButton /></button>
          </NavLink>
          <NavLink to="/" className="filter-section__radio" role="radio">
            <label htmlFor="type-seminar">Seminar</label>
            <button type="button" id="type-seminar"><RadioButton /></button>
          </NavLink>
          <NavLink to="/" className="filter-section__radio" role="radio">
            <label htmlFor="type-travel">Travel</label>
            <button type="button" id="type-travel"><RadioButton /></button>
          </NavLink>
          <NavLink to="/" className="filter-section__radio" role="radio">
            <label htmlFor="type-entertainment">Entertainment</label>
            <button type="button" id="type-entertainment"><RadioButton /></button>
          </NavLink>
          <NavLink to="/" className="filter-section__radio" role="radio">
            <label htmlFor="type-family">Family</label>
            <button type="button" id="type-family"><RadioButton /></button>
          </NavLink>
          <NavLink to="/" className="filter-section__radio" role="radio">
            <label htmlFor="type-other">Other</label>
            <button type="button" id="type-other"><RadioButton /></button>
          </NavLink>
        </section>
        <section className="filter-results__date-filters filter-section">
          <h3 className="filter-section__heading">Date</h3>
          <NavLink to="/" className="filter-section__radio" aria-checked={true} role="radio">
            <label htmlFor="date-any">Any date</label>
            <button type="button" id="date-any"><RadioButton /></button>
          </NavLink>
          <NavLink to="/" className="filter-section__radio" role="radio">
            <label htmlFor="date-today">Today</label>
            <button type="button" id="date-today"><RadioButton /></button>
          </NavLink>
          <NavLink to="/" className="filter-section__radio" role="radio">
            <label htmlFor="date-tomorrow">Tomorrow</label>
            <button type="button" id="date-tomorrow"><RadioButton /></button>
          </NavLink>
          <NavLink to="/" className="filter-section__radio" role="radio">
            <label htmlFor="date-week">This week</label>
            <button type="button" id="date-week"><RadioButton /></button>
          </NavLink>
          <NavLink to="/" className="filter-section__radio" role="radio">
            <label htmlFor="date-weekend">This weekend</label>
            <button type="button" id="date-weekend"><RadioButton /></button>
          </NavLink>
          <NavLink to="/" className="filter-section__radio" role="radio">
            <label htmlFor="date-month">This month</label>
            <button type="button" id="date-month"><RadioButton /></button>
          </NavLink>
        </section>
      </div>
    </section>
    <section className="search-results">
      <section className="event-results">
        <header className="event-results__header">
          <h3 className="event-results__heading">
            <p><EventIcon /></p>
            <span>Events</span>
          </h3>
        </header>
        <section className="event-results__container">

        </section>
      </section>
    </section>
  </React.Fragment>
);

export default EventsSearchResults;
