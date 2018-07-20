import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Articles from './Articles';

class EventsSection extends Component {
  render() {
    return (
      <section sec={this.props} className='events-section'>
        <div className="navbar">
          <ul className="navbar__list">
            <li className="navbar__item"><NavLink to="/allevents" role="link">All events</NavLink></li>
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

export default EventsSection;
