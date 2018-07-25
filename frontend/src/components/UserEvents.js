import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Articles from './Articles';

class WrappedUserEvents extends Component {
  render() {
    // console.log('this.props UserEvents', this.props);
    // console.log('this.state UserEvents', this.state);
    return (
      <section sec={this.props} className='events-section'>
        <div className="navbar">
          <ul className="navbar__list">
            <li className="navbar__item"><button onClick={() => this.eventsFilter()} className="btn">Suggested</button></li>
            <li className="navbar__item"><button onClick={() => this.eventsFilter('own')} className="btn">Own</button></li>
            <li className="navbar__item"><button onClick={() => this.eventsFilter('attending')} className="btn">Attending</button></li>
          </ul>
        </div>
        <div>
          <Articles events={this.props.userData.events}/>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => { // this.props.toDosArr
  return {
    // events: state.events,
    userData: state.userData
  };
};
const UserEvents = connect(mapStateToProps)(WrappedUserEvents);
export default UserEvents;
