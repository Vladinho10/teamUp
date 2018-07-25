import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { EventClockIcon, EventLocationIcon, PhotoIcon } from './SvgIcons';
import ModalComponent from './ModalComponent';
import UploadModal from './modals/UploadPhoto';

const eventCover = require('../../dist/images/events_images/event1532515541293.jpg'); // this.state.currentEvent.photo

const date = 'July 31'; // this.state.currentEvent.date
const adminNames = 'Admin'; //  this.state.currentEvent.admins[0];


class EventPage extends Component {
  state = {
    change: false,
    selectedFile: null,
    imageSrc: '',
    show: undefined,
    currentEvent: {}
  }

  handleClick = () => {
    console.log('clicked', this.state.showUploadModal);
    this.setState({ showUploadModal: !this.state.showUploadModal });
  }

  handleToggleModal = () => {
    this.setState(prevState => ({ show: !prevState.show }));
  }

  handleFileChange = (event) => {
    const imageSrc = URL.createObjectURL(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      imageSrc
    });
  }

  // handleFileUpload = () => {
  //   fetch('url', {
  //     method: 'POST',
  //     body: JSON.stringify(this.state.selectedFile),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(res => res.json())
  //     .catch(error => console.error('Error:', error))
  //     .then((res) => {
  //       this.setState({ imageSrc: res.url });
  //     });
  // }
componentDidMount = () => {
  const currentEvent_id = this.props.match.params.id;
  const allEvents = this.props.events;
  const currentEvent = allEvents.find(event => event._id === currentEvent_id);
  this.setState({ currentEvent });
}

render() {
  console.log(this.props.match.params.id, 'this.props.id');
  console.dir(this.props.events, 'this.props.events');
  console.dir(this.props.currentUser, 'this.props.currentUser');
  console.log(this.state);
  return (
    <React.Fragment>
      <Header/>
      <div className='main-eventpage'>
        <div temp={this.props} className='user-side'>
        </div>
        <div className='event'>
          <div className='event-avatar'>
            <img src={eventCover} alt="event-cover" height = "250" width="300"/>
          </div>
          <div className="edit-photo-icon" onClick={ this.handleToggleModal } ><PhotoIcon/></div>
          {
            <UploadModal
              handleFileChange={this.handleFileChange}
              handleFileUpload={this.handleFileUpload}
              handleToggleModal={this.handleToggleModal}
              show={this.state.show}
              imageSrc={this.state.imageSrc}
            />
          }
          <hr/>
          <div className="event-short-desc">
            <h2 className="event-date" color="black">{date}</h2>
            <h2 className="event-title">{this.state.currentEvent.title}</h2>
          </div>
          <div className="long-desc">
            <div className="long-desc-date">
              <EventClockIcon className ="icon"/>
              <span>{this.state.currentEvent.date}</span>
            </div>
            <div className="long-desc-location">
              <EventLocationIcon className ="icon"/>
              <span>{this.state.currentEvent.location}</span>
            </div>
            <br/>
            { <ModalComponent/> }
            <br/>
            <div className="long-desc-text">
              <p className="red-subtitles">Description</p>
              <div className="description-text">{this.state.currentEvent.description}</div>
              <p className="red-subtitles">Admins</p><span>{adminNames}</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
}

const mapStateToProps = (state) => {
  return {
    events: state.userData.events,
    currentUser: state.userData.user
  };
};


export default connect(mapStateToProps)(EventPage);
