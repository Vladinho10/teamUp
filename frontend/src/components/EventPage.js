import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { EventClockIcon, EventLocationIcon, PhotoIcon } from './SvgIcons';
import ModalComponent from './ModalComponent';
import UploadModal from './modals/UploadPhoto';


const eventCover = require('../../dist/images/eventCover.jpg'); // this.props.event.eventCover

const title = 'Playing football'; // this.props.event.title
const date = 'July 31'; // this.props.event.date;
const dateAndTime = 'July 31 at 17:00 to 19:00'; // this.props.event.time;
const location = 'Yerevan, Armenia'; // this.props.event.location;
const adminNames = 'Admin'; // this.props.event.admins[0];
const description = `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem 
ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum`; // this.props.event.description;

class EventPage extends Component {
  state = {
    change: false,
    selectedFile: null,
    imageSrc: '',
    show: undefined
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

  handleFileUpload = () => {
    fetch('url', {
      method: 'POST',
      body: JSON.stringify(this.state.selectedFile),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then((res) => {
        this.setState({ imageSrc: res.url });
      });
  }

  render() {
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
              <h2 className="event-title">{title}</h2>
            </div>
            <div className="long-desc">
              <div className="long-desc-date">
                <EventClockIcon className ="icon"/>
                <span>{dateAndTime}</span>
              </div>
              <div className="long-desc-location">
                <EventLocationIcon className ="icon"/>
                <span>{location}</span>
              </div>
              <br/>
              { <ModalComponent/> }
              <br/>
              <div className="long-desc-text">
                <p className="red-subtitles">Description</p>
                <div className="description-text">{description}</div>
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
    event: state.event
  };
};

export default connect(mapStateToProps)(EventPage);
