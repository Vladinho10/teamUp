import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Articles from './Articles';
import { getOwnEvents, getAttendingEvents, getSuggestedEvents } from '../actions/eventActions';


class WrappedUserEvents extends Component {
  componentDidMount() {
    this.refs.btnSug.setAttribute('disabled', 'disabled');
  }

  handleGetSuggestedEvents = (e) => {
    this.props.dispatch(getSuggestedEvents());
    this.refs.btnSug.setAttribute('disabled', 'disabled');
    this.refs.btnMy.removeAttribute('disabled', 'disabled');
    this.refs.btnGo.removeAttribute('disabled', 'disabled');
  };

  handleGetOwnEvents = (e) => {
    this.props.dispatch(getOwnEvents(0));
    this.refs.btnMy.setAttribute('disabled', 'disabled');
    this.refs.btnSug.removeAttribute('disabled', 'disabled');
    this.refs.btnGo.removeAttribute('disabled', 'disabled');
  };

  handleGetAttendingEvents = () => {
    this.props.dispatch(getAttendingEvents());
    this.refs.btnGo.setAttribute('disabled', 'disabled');
    this.refs.btnSug.removeAttribute('disabled', 'disabled');
    this.refs.btnMy.removeAttribute('disabled', 'disabled');
  };

  render() {
    console.log(' UserEvents props', this.props);
    return (
      <section className='events-section'>
        <div className="navbar">
          <ul className="navbar__listZ">
            <li className="navbar__itemZ"><button ref='btnSug' onClick={this.handleGetSuggestedEvents} className="navbar__item__button">Suggested</button></li>
            <li className="navbar__itemZ"><button ref='btnMy' onClick={this.handleGetOwnEvents} className="navbar__item__button">Own</button></li>
            <li className="navbar__itemZ"><button ref='btnGo' onClick={this.handleGetAttendingEvents} className="navbar__item__button">Attending</button></li>
          </ul>
        </div>
        <div>
          <Articles events={this.props.events} />
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
