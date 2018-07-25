import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Articles from './Articles';

class WrappedUserEvents extends Component {
  render() {
    return (
      <section sec={this.props} className='events-section'>
        <div className="navbar">
          <ul className="navbar__list">
            <li className="navbar__item"><NavLink to="/allevents" role="link">suggested</NavLink></li>
            <li className="navbar__item"><NavLink to="/my_events" role="link">My events</NavLink></li>
            <li className="navbar__item"><NavLink to="/going" role="link">Going</NavLink></li>
          </ul>
        </div>
        <div>
          <Articles />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => { // this.props.toDosArr
  return {
    events: state.events
  };
};
const UserEvents = connect(mapStateToProps)(WrappedUserEvents);
export default UserEvents;
