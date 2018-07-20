import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Header from './Header';
import { ClockIcon, LocationIcon } from './SvgIcons';

const eventCover = require('../../dist/images/eventCover.jpg');

const title = 'Playing football';
const date = 'July 31';
const dateAndTime = 'July 31 at 18:00 to 19:00';
const location = 'Baghramyan 59, Yerevan, Armenia';
const adminNames = 'Admin';

class EventPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <div className='main'>
          <div temp={this.props} className='user-side'>
          </div>
          <div className='event'>
            <div className='event-avatar'> <img src={eventCover} alt="event-cover" height = "250" width="300"/> </div>
            <div className="event-short-desc">
              <h2 className="event-date" color="black">{date}</h2>
              <h2 className="event-title">{title}</h2>
            </div>
            <div className="long-desc">
              <div className="long-desc-date">
                {/* <img className ="icon" src={eventDate}/> */}
                <ClockIcon className ="icon"/>
                <span>{dateAndTime}</span>
              </div>
              <div className="long-desc-location">
                {/* <img className ="icon" src={eventLocacton}/> */}
                <LocationIcon className ="icon"/>
                <span>{location}</span>
              </div>
              <div className="long-desc-text">
                <p className="red-text">Description</p>
                <div className="text">lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                </div>
                <p className="red-text">Admin</p><spam>{adminNames}</spam>
              </div>
              <p className="red-text">Participants</p>
              <div>Partisipant1</div>
              <div>Partisipant2</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EventPage;
