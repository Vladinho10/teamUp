import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import Articles from './Articles';

class EventsSection extends Component {
  render() {
    return (
      <section sec={this.props} className='section'>
        <button className='btn'>All events</button>
        <button className='btn'>My events</button>
        <button className='btn'>Going</button>
        <div>
          <Articles />
        </div>
      </section>
    );
  }
}

export default EventsSection;
