import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Header from './Header';
import { EventClockIcon, EventLocationIcon, PhotoIcon } from './SvgIcons';
import ModalComponent from './ModalComponent';
import UploadModal from './modals/UploadPhoto';

const defaultEventCover = require('../../dist/images/eventCover.jpg'); // this.state.currentEvent.photo

const adminNames = 'Admin'; //  this.state.currentEvent.admins[0];


class EventPage extends Component {
  state = {
    change: false,
    selectedFile: null,
    imageSrc: '',
    show: undefined,
    currentEvent: {},
    dateAndTime: '',
    date: ''
  }

  componentDidMount = () => {
    console.log(this.props, 'this.props in EventPage');
    // const currentEvent_id = this.props.match.params.id;
    // console.log(currentEvent_id, 'currentEvent_id getting from url');
    // const allEvents = this.props.events;
    const currentEvent = this.props.events.find(event => event._id === this.props.match.params.id);
    const dateAndTime = moment(new Date(currentEvent.date)).format('MMMM Do YYYY, h:mm a');
    console.log(dateAndTime, 'dateAndTime');
    const date = moment(new Date(currentEvent.date)).format('MMM DD');

    this.setState({
      currentEvent,
      dateAndTime,
      date
    });
  }

  handleClick = () => {
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


  render() {
    return (
      <React.Fragment>
        <Header/>
        <div className='main-eventpage'>
          <div temp={this.props} className='user-side'>
          </div>
          <div className='event'>
            <div className='event-avatar'>
              <img src={ this.state.currentEvent.photo || defaultEventCover } alt="event-cover"/>
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
              <h4 className="event-date" color="black">{this.state.date}</h4>
              <h4 className="event-title">{this.state.currentEvent.title}</h4>
            </div>
            <div className="long-desc">
              <div className="long-desc-date">
                <EventClockIcon className ="icon"/>
                <span>{this.state.dateAndTime}</span>
              </div>
              <div className="long-desc-location">
                <EventLocationIcon className ="icon"/>
                <span>{this.state.currentEvent.location}</span>
              </div>
              <br/>
              {<ModalComponent
                currentEvent_id={this.props.match.params.id}
                participants={this.state.currentEvent.players}
              />}
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
    events: state.events,
    currentUser: state.userData.user
  };
};


export default connect(mapStateToProps)(EventPage);
