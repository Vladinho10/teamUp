import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Articles from './Articles';
import { getOwnEvents, getAttendingEvents, getSuggestedEvents } from '../actions/eventActions';


class WrappedUserEvents extends Component {
  handleGetSuggestedEvents = (e) => {
    this.props.dispatch(getSuggestedEvents());
  };

  handleGetOwnEvents = (e) => {
    this.props.dispatch(getOwnEvents());
  };

  handleGetAttendingEvents = () => {
    console.log(888);
    this.props.dispatch(getAttendingEvents());
  };

  render() {
    console.log(' UserEvents props', this.props);
    // console.log('this.state UserEvents', this.state);
    return (
      <section sec={this.props} className='events-section'>
        <div className="navbar">
          <ul className="navbar__list">
            <li className="navbar__item"><button onClick={this.handleGetSuggestedEvents} className="btn">Suggested</button></li>
            <li className="navbar__item"><button onClick={this.handleGetOwnEvents} className="btn">Own</button></li>
            <li className="navbar__item"><button onClick={this.handleGetAttendingEvents} className="btn">Attending</button></li>
          </ul>
        </div>
        <div>
          <Articles events={this.props.events} />
        </div>
      </section>
    );
  }

  // componentDidMount() {
  //   this.props.dispatch(getOwnEvents());
  //   console.log('USerEvents', this.props);
  // }
}

const mapStateToProps = (state) => { // this.props.toDosArr
  return {
    // userData: state.userData
    events: state.events

  };
};
const UserEvents = connect(mapStateToProps)(WrappedUserEvents);
export default UserEvents;
