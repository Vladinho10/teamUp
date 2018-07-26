import React from 'react';
// import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { EventIcon, PlusCircleIcon } from '../SvgIcons';

const EventsSearchResults = props => (
  <React.Fragment>
    <section className="filter-results">
      <h2 className="filter-results__heading">Filter results</h2>
      <div className="filter-results__filters">
        <section className="filter-results__location-filters filter-section">
          <h3 className="filter-section__heading">Location</h3>
          <NavLink className="filter-section__radio" aria-checked={true} role="radio">
            <label for="anywhere">Anywhere</label>
            <button id="anywhere"><RadioButton /></button>
          </NavLink>
          <div className="filter-section__add-manual">
            <PlusCircleIcon />
            <span>Choose a city</span>
          </div>
        </section>
        <section className="filter-results__name-filters filter-section">
          <h3 className="filter-section__heading">Name</h3>
          <NavLink className="filter-section__radio" aria-checked={true} role="radio">
            <label for="title-name">Title name</label>
            <button id="title-name"><RadioButton /></button>
          </NavLink>
        </section>
        <section className="filter-results__type-filters filter-section">
          <h3 className="filter-section__heading">Type</h3>
          <NavLink className="filter-section__radio" aria-checked={true} role="radio">
            <label for="all-types">All types</label>
            <button id="all-types"><RadioButton /></button>
          </NavLink>
          <NavLink className="filter-section__radio" role="radio">
            <label for="type-sport">Sport</label>
            <button id="type-sport"><RadioButton /></button>
          </NavLink>
          <NavLink className="filter-section__radio" role="radio">
            <label for="type-meeting">Meeting</label>
            <button id="type-meeting"><RadioButton /></button>
          </NavLink>
          <NavLink className="filter-section__radio" role="radio">
            <label for="type-seminar">Seminar</label>
            <button id="type-seminar"><RadioButton /></button>
          </NavLink>
          <NavLink className="filter-section__radio" role="radio">
            <label for="type-travel">Travel</label>
            <button id="type-travel"><RadioButton /></button>
          </NavLink>
          <NavLink className="filter-section__radio" role="radio">
            <label for="type-entertainment">Entertainment</label>
            <button id="type-entertainment"><RadioButton /></button>
          </NavLink>
          <NavLink className="filter-section__radio" role="radio">
            <label for="type-family">Family</label>
            <button id="type-family"><RadioButton /></button>
          </NavLink>
          <NavLink className="filter-section__radio" role="radio">
            <label for="type-other">Other</label>
            <button id="type-other"><RadioButton /></button>
          </NavLink>
        </section>
        <section className="filter-results__date-filters filter-section">
          <h3 className="filter-section__heading">Date</h3>
          <NavLink className="filter-section__radio" aria-checked={true} role="radio">
            <label for="date-any">Any date</label>
            <button id="date-any"><RadioButton /></button>
          </NavLink>
          <NavLink className="filter-section__radio" role="radio">
            <label for="date-today">Today</label>
            <button id="date-today"><RadioButton /></button>
          </NavLink>
          <NavLink className="filter-section__radio" role="radio">
            <label for="date-tomorrow">Tomorrow</label>
            <button id="date-tomorrow"><RadioButton /></button>
          </NavLink>
          <NavLink className="filter-section__radio" role="radio">
            <label for="date-week">This week</label>
            <button id="date-week"><RadioButton /></button>
          </NavLink>
          <NavLink className="filter-section__radio" role="radio">
            <label for="date-weekend">This weekend</label>
            <button id="date-weekend"><RadioButton /></button>
          </NavLink>
          <NavLink className="filter-section__radio" role="radio">
            <label for="date-month">This month</label>
            <button id="date-month"><RadioButton /></button>
          </NavLink>
        </section>
      </div>
    </section>
    <section className="search-results">
      <section className="event-results">
        <header className="event-results__header">
          <h3 className="event-results__heading">
            <EventIcon />
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
