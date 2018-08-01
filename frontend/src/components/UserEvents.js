import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Articles from './Articles';
import { getOwnEvents, getAttendingEvents, getSuggestedEvents } from '../actions/eventActions';


class WrappedUserEvents extends Component {
  componentDidMount() {
    this.refs.btnSug.setAttribute('disabled', 'disabled');
    // window.addEventListener('scroll', this.handleScrollOnScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollOnScroll, false);
  }

  handleGetSuggestedEvents = (e) => {
    this.props.dispatch(getSuggestedEvents(0));
    this.refs.btnSug.setAttribute('disabled', 'disabled');
    this.refs.btnMy.removeAttribute('disabled', 'disabled');
    this.refs.btnGo.removeAttribute('disabled', 'disabled');
  };

  handleGetOwnEvents = (e) => {
    this.props.dispatch(getOwnEvents(false));
    this.refs.btnMy.setAttribute('disabled', 'disabled');
    this.refs.btnSug.removeAttribute('disabled', 'disabled');
    this.refs.btnGo.removeAttribute('disabled', 'disabled');
  };

  handleGetAttendingEvents = () => {
    this.props.dispatch(getAttendingEvents(0));
    this.refs.btnGo.setAttribute('disabled', 'disabled');
    this.refs.btnSug.removeAttribute('disabled', 'disabled');
    this.refs.btnMy.removeAttribute('disabled', 'disabled');
  };

  // handleScrollOnScroll = () => {
  //   // const scrollHeight = Math.max(
  //   //   document.body.scrollHeight, document.documentElement.scrollHeight,
  //   //   document.body.offsetHeight, document.documentElement.offsetHeight,
  //   //   document.body.clientHeight, document.documentElement.clientHeight
  //   // );
  //   const { innerHeight, scrollY } = window;
  //   const fil = (
  //     this.props.events.sug
  //     || this.props.events.my
  //     || this.props.events.go
  //     || []
  //   );
  //
  //   if (document.body.offsetHeight < innerHeight + scrollY + 150) {
  //   // if (window.pageYOffset === scrollHeight) {
  //     switch (fil) {
  //       case this.props.events.sug:
  //         this.props.dispatch(getSuggestedEvents(1));
  //         break;
  //       case this.props.events.my:
  //         this.props.dispatch(getOwnEvents(true));
  //         break;
  //       case this.props.events.go:
  //         this.props.dispatch(getAttendingEvents(1));
  //         break;
  //       default:
  //         console.log('deeeeeeeef');
  //     }
  //   }
  // }


  render() {
    // console.log(' UserEvents props', this.props);
    return (
      <section className='events-section'>
        <div className="events-section__navbar navbar">
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
