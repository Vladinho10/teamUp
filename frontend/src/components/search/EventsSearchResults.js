import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { EventIcon, PlusCircleIcon, RadioButton } from '../SvgIcons';
import Events from './Events';

class EventsSearchResults extends Component {
  handleEventFilter = (event) => {
    for (let i = 0; i < document.querySelectorAll('svg').length; i += 1) {
      if (document.querySelectorAll('svg')[i].classList.contains('radio-button_clicked')) {
        document.querySelectorAll('svg')[i].classList.remove('radio-button_clicked');
      }
    }
    console.log(event.target.children[0].children[0].classList.add('radio-button_clicked'), 'radio button');
  }

  render() {
    return (
      <React.Fragment>
        <section className="filter-results">
          <header className="filter-results__header">
            <h2 className="filter-results__heading">Filter Results</h2>
          </header>
          <div className="filter-results__filters">
            <section className="filter-results__location-filters filter-section">
              <h3 className="filter-section__heading">Location</h3>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="anywhere"><RadioButton /></button>
                Anywhere
              </NavLink>
              <div className="filter-section__add-manual">
                <PlusCircleIcon />
                <span>Choose a city</span>
              </div>
            </section>
            <section className="filter-results__name-filters filter-section">
              <h3 className="filter-section__heading">Name</h3>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="title-name"><RadioButton /></button>
                Title Name
              </NavLink>
            </section>
            <section className="filter-results__type-filters filter-section">
              <h3 className="filter-section__heading">Type</h3>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="all-types"><RadioButton /></button>
                All Types
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="type-sport"><RadioButton /></button>
                Sport
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="type-meeting"><RadioButton /></button>
                Meeting
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="type-seminar"><RadioButton /></button>
                Seminar
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="type-travel"><RadioButton /></button>
                Travel
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="type-entertainment"><RadioButton /></button>
                Entertainment
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="type-family"><RadioButton /></button>
                Family
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="type-other"><RadioButton /></button>
                Other
              </NavLink>
            </section>
            <section className="filter-results__date-filters filter-section">
              <h3 className="filter-section__heading">Date</h3>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="date-any"><RadioButton /></button>
                Any Date
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="date-today"><RadioButton /></button>
                Today
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="date-tomorrow"><RadioButton /></button>
                Tomorrow
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="date-week"><RadioButton /></button>
                This Week
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="date-weekend"><RadioButton /></button>
                This Weekend
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to="#" className="filter-section__radio" role="radio">
                <button type="button" id="date-month"><RadioButton /></button>
                This Month
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
              <div className="searched-events">
                <Events />
              </div>
            </section>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default withRouter(EventsSearchResults);
