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
          <ul className="navbar__listZ">
            <li className="navbar__itemZ"><button onClick={this.handleGetSuggestedEvents} className="navbar__item__button">Suggested</button></li>
            <li className="navbar__itemZ"><button onClick={this.handleGetOwnEvents} className="navbar__item__button">Own</button></li>
            <li className="navbar__itemZ"><button onClick={this.handleGetAttendingEvents} className="navbar__item__button">Attending</button></li>
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
