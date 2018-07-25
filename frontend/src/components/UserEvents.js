import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Articles from './Articles';
import { getOwnEvents } from '../actions/eventActions';


class WrappedUserEvents extends Component {
  handleGetOwnEvents = (e) => {
    this.props.dispatch(getOwnEvents());
  }

  render() {
    // console.log('this.props UserEvents', this.props);
    // console.log('this.state UserEvents', this.state);
    return (
      <section sec={this.props} className='events-section'>
        <div className="navbar">
          <ul className="navbar__list">
            <li className="navbar__item"><button onClick={this.handleGetOwnEvents} className="btn">Suggested</button></li>
            <li className="navbar__item"><button onClick={() => this.handleGetOwnEvents()} className="btn">Own</button></li>
            <li className="navbar__item"><button onClick={this.handleGetOwnEvents} className="btn">Attending</button></li>
          </ul>
        </div>
        <div>
          <Articles events={this.props.userData.events}/>
        </div>
      </section>
    );
  }

  // componentDidMount() {
  //   this.props.dispatch(getOwnEvents());
  // }
}

const mapStateToProps = (state) => { // this.props.toDosArr
  return {
    // events: state.events,
    userData: state.userData
  };
};
const UserEvents = connect(mapStateToProps)(WrappedUserEvents);
export default UserEvents;
