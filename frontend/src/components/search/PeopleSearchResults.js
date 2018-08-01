import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { RadioButton, UsersIcon } from '../SvgIcons';
import Users from './Users';
import getSearch from '../../actions/searchActions';

class PeopleSearchResults extends Component {
  state = {
    filter: ''
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

  render() {
    return (
      <React.Fragment>
        { console.log(this.props, 'peopleSearchResults') }
        <section className="filter-results">
          <header className="filter-results__header">
            <h2 className="filter-results__heading">Filter Results</h2>
          </header>
          <div className="filter-results__filters">
            <section className="filter-results__event-member-filters filter-section">
              <h3 className="filter-section__heading">Users</h3>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="type-all"><RadioButton /></button>
                All users
              </NavLink>
              <NavLink onClick={this.handleEventFilter} to={`${this.props.location.search}`} className="filter-section__radio" role="radio">
                <button type="button" id="type-event-member"><RadioButton /></button>
                Event member
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
                <Users filter={this.state.filter} />
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

export default withRouter(connect(mapStateToProps)(PeopleSearchResults));
