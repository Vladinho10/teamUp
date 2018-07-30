import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Articles from './Articles';
import { getOwnEvents, getAttendingEvents, getSuggestedEvents } from '../actions/eventActions';


class WrappedUserEvents extends Component {
  state = {
    total: 12,
    currentCount: 3,
    offset: 3,
    list: [],
    isFetching: false
  }

  componentDidMount() {
    this.refs.btnSug.setAttribute('disabled', 'disabled');
    window.addEventListener('scroll', this.loadOnScroll);
  }

  loadOnScroll = (e) => {
    // If all the content loaded
    if (this.state.currentCount === this.state.total) return;

    // Get div at the bottom of the content
    const el = document.getElementById('content-end');

    const rect = el.getBoundingClientRect();
    const isAtEnd = (
      // rect.top >= 0 &&
      // rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
          && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

      // User at the end of content. load more content
    if (isAtEnd) {
      // If content list is still loading do not request for another content list.
      if (this.state.isFetching) return;
      this.setState({ isFetching: true });

      // Call server and request content.
      /**
        * AJAX reuest
        */

      // On AJAX request success
      this.setState({ isFetching: false });
      // Update content list
    }
  }


  handleGetSuggestedEvents = (e) => {
    this.props.dispatch(getSuggestedEvents());
    this.refs.btnSug.setAttribute('disabled', 'disabled');
    this.refs.btnMy.removeAttribute('disabled', 'disabled');
    this.refs.btnGo.removeAttribute('disabled', 'disabled');
  };

  handleGetOwnEvents = (e) => {
    this.props.dispatch(getOwnEvents());
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
