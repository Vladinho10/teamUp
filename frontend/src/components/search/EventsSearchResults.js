import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { EventIcon, PlusCircleIcon, RadioButton } from '../SvgIcons';
import Events from './Events';
import getSearch from '../../actions/searchActions';

class EventsSearchResults extends Component {
  state = {
    filter: '',
    locationInputShow: false,
  }

  componentDidMount = () => {
    this.props.dispatch(getSearch(this.props.location.search.slice(7)));
  }

  handleEventFilter = (event) => {
    for (let i = 0; i < document.querySelectorAll('svg').length; i += 1) {
      if (document.querySelectorAll('svg')[i].classList.contains('radio-button_clicked')) {
        document.querySelectorAll('svg')[i].classList.remove('radio-button_clicked');
      }
    }
    event.target.children[0].children[0].classList.add('radio-button_clicked');
    console.log(event.target.children[0].id, 'radio button id');

    this.setState({ filter: event.target.children[0].id });
  }

  handleEventInputFilter = (event) => {
    this.setState({ filter: event.target.value });
  }

  handleInputBlur = () => {
    console.log('bluuuuuuuuur');
    this.setState(state => ({ locationInputShow: !state.locationInputShow }));
  }

  handleEventInputFilterShow = () => {
    console.log('focuuuuuuuuus');
    this.setState(state => ({ locationInputShow: !state.locationInputShow }));
    for (let i = 0; i < document.querySelectorAll('svg').length; i += 1) {
      if (document.querySelectorAll('svg')[i].classList.contains('radio-button_clicked')) {
        document.querySelectorAll('svg')[i].classList.remove('radio-button_clicked');
      }
    }
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
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="type-anywhere"><RadioButton /></button>
                Anywhere
              </NavLink>
              {
                this.state.locationInputShow
                  ? <div onBlur={this.handleInputBlur} className="filter-section__write-manual"><input type="text" placeholder="Choose a location" onChange={this.handleEventInputFilter} /></div>
                  : <div onClick={this.handleEventInputFilterShow} className="filter-section__add-manual"><PlusCircleIcon /><span>Choose a location</span></div>
              }

            </section>
            <section className="filter-results__type-filters filter-section">
              <h3 className="filter-section__heading">Type</h3>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="type-all"><RadioButton /></button>
                All Types
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="type-sport"><RadioButton /></button>
                Sport
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="type-meeting"><RadioButton /></button>
                Meeting
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="type-seminar"><RadioButton /></button>
                Seminar
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="type-travel"><RadioButton /></button>
                Travel
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="type-entertainment"><RadioButton /></button>
                Entertainment
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="type-family"><RadioButton /></button>
                Family
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="type-other"><RadioButton /></button>
                Other
              </NavLink>
            </section>
            <section className="filter-results__date-filters filter-section">
              <h3 className="filter-section__heading">Date</h3>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="date-any"><RadioButton /></button>
                Any Date
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="date-today"><RadioButton /></button>
                Today
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="date-tomorrow"><RadioButton /></button>
                Tomorrow
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="date-week"><RadioButton /></button>
                This Week
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
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
                <Events filter={this.state.filter} />
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

export default withRouter(connect(mapStateToProps)(EventsSearchResults));
