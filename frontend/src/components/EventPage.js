import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Header from './Header';
import { EventClockIcon, EventLocationIcon } from './SvgIcons';
import ModalComponent from './ModalComponent';
// import UserArticle from './UserArticle';
import CreateEventModal from './modals/CreateEvent';
import { editEvent, deleteEvent } from '../actions/eventActions';
import DeleteEvent from './DeleteEvent';

const defaultEventCover = require('../../dist/images/eventCover.jpg'); // this.state.currentEvent.photo
// const defaultPhoto = require('../../dist/images/no-avatar.png');


class EventPage extends Component {
  state = {
    change: false,
    selectedFile: null,
    imageSrc: '',
    imagePreviewSrc: '',
    show: false,
    currentUserId: '',
    currentEvent: {},
    dateAndTime: ''
  }

  componentDidMount = () => {
    const currentId = this.props.match.params.id;
    this.getCurrentEvent(currentId);
    this.setState({ currentUserId: this.props.currentUser._id });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps, nextState);
  //   console.log(this.props, this.state);

  //   return true;
  // }

  getCurrentEvent = (ev_id) => {
    const options = {
      credentials: 'include',
      method: 'GET',
    };

    fetch(`/api/event/${ev_id}`, options)
      .then((res) => {
        return res.json();
      })
      .then((event) => {
        console.log(event, 'getting current event');
        this.setState({
          currentEvent: event,
          dateAndTime: event.date,
        });
      })
      // .then(() => {
      //   fetch('/api/user', options)
      //     .then((res) => {
      //       return res.json();
      //     })
      //     .then((user) => {
      //       console.log(user, 'getting current user');
      //       this.setState({
      //         currentUser: user,
      //       });
      //     });
      // })
      .catch(err => console.log(err));
  }

  /**
   * Handle event edit
   */

  handleToggleModal = () => {
    this.setState(prevState => ({ show: !prevState.show }));
  }

  handleFileChange = (event) => {
    const imagePreviewSrc = URL.createObjectURL(event.target.files[0]);
    this.setState({
      imagePreviewSrc
    });
  }

  handleDeleteImage = () => {
    this.setState(() => ({ imagePreviewSrc: null }));
  }

  handleEventFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.show) {
      this.handleToggleModal();
    }

    const data = new FormData(event.target);
    this.props.dispatch(editEvent(data));
  }

  /**
   * handle delete event
   */
  handleDeleteEvent = () => {
    this.props.dispatch(deleteEvent());
  }


  render() {
    console.log(this.state, '---this.state');
    console.log(this.props, '---this.props');
    // console.log(this.state.currentEvent._id, 'this.state.currentEvent._id');
    // console.log(this.state.currentUser._id, 'this.state.currentUser._id');
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
            <div className="event-short-desc">
              <h4 className="event-date" color="black">
                { moment(new Date(this.state.currentEvent.date)).format('MMM DD') }
              </h4>
              <h4 className="event-title">{this.state.currentEvent.title}</h4>
            </div>
            <div className="long-desc">
              <div className="long-desc-date">
                <EventClockIcon className ="icon"/>
                <span>
                  { moment(new Date(this.state.currentEvent.date)).format('MMMM Do YYYY')},
                  { this.state.currentEvent.time }
                </span>
              </div>
              <div className="long-desc-location">

                <EventLocationIcon className ="icon"/>
                <span>{this.state.currentEvent.location}</span>
              </div>
              <br/>
              {<ModalComponent
                currentEvent_id={this.props.match.params.id}
                currentUser={this.state.currentUser}
                currentEvent={this.state.currentEvent}
              />}
              <br/>
              <div className="long-desc-text">
                <p className="red-subtitles">Description</p>
                <div className="description-text">{this.state.currentEvent.description}</div>
                <p className="red-subtitles">
                  Admin
                </p>
                {/* <section className="main-participant">
                  <div className="main-participant-photo"><img src={ defaultPhoto} width="50"/></div>
                  <p className="main-participant-name">{this.state.currentEvent.title}</p>
                </section> */}
              </div>
              <section className="event-edit-delete">
                <button className="" onClick={this.handleToggleModal} >EDIT EVENT</button>
                <CreateEventModal
                  show={this.state.show}
                  handleFileChange={this.handleFileChange}
                  handleDeleteImage={this.handleDeleteImage}
                  handleToggleModal={this.handleToggleModal}
                  handleEventFormSubmit={this.handleEventFormSubmit}
                  imagePreviewSrc={this.state.imagePreviewSrc}
                  event={this.state.currentEvent}
                />
                {/* <button className="" onClick={this.handleToggleModal}> DELETE EVENT</button> */}
                <DeleteEvent
                  handleDeleteEvent={this.handleDeleteEvent}
                />
              </section>
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
