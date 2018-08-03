import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Header from './Header';
import { EventClockIcon, EventLocationIcon } from './SvgIcons';
import ParticipantsModal from './ParticipantsModal';
import CreateEventModal from './modals/CreateEvent';
import { editEvent, deleteEvent } from '../actions/eventActions';
import DeleteEvent from './DeleteEvent';
import UserArticle from './UserArticle';

class EventPage extends Component {
  state = {
    change: false,
    selectedFile: null,
    imageSrc: '',
    imagePreviewSrc: '',
    show: false,
    currentEvent: {},
    participants: [],
    dateAndTime: '',
    admin: [],
    isAdmin: false,
  }

  componentDidMount = () => {
    const currentEventId = this.props.match.params.id;
    this.getCurrentEvent(currentEventId);
  };

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
        const adminId = event.event[0].admins[0];

        fetch(`/api/user/${adminId}`, options)
          .then((res) => {
            return res.json();
          })
          .then((admin) => {
            if (this.props.currentUser._id === adminId) {
              this.setState({
                isAdmin: true
              });
            }
            this.setState({
              admin: [admin],
              currentEvent: event.event[0],
              dateAndTime: event.date,
            });
          });
      })
      .catch(err => console.log(err));
  };

  /**
   * validation during editing
   */

  handleUserInput = (e) => {
    console.log(e.target.name, 'name');
    console.log(e.target.value, 'value');
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => { this.validateField(name, value); });
  }

  validateField(fieldName, value) {
    let { titleIsValid, addressIsValid, descriptionIsValid } = this.state;
    const { formErrors } = this.state;
    console.log(formErrors, 'formErrors');

    switch (fieldName) {
      case 'event_title':
        titleIsValid = value.match(/^[a-zA-Z0-9]*/) && value.length >= 5 && value.length <= 25;
        formErrors.event_title = titleIsValid ? '' : 'Title must contain min. 5 and max. 25 alphanumeric characters';
        console.log(formErrors, 'formErrors in case title');
        break;
      case 'event_address':
        addressIsValid = value.length >= 3 && value.match(/^[a-zA-Z0-9]*/);
        formErrors.event_address = addressIsValid ? '' : 'Address must contain min. 5 and max. 20 alphanumeric characters';
        break;
      case 'event_description':
        descriptionIsValid = value.length >= 6;
        formErrors.event_description = descriptionIsValid ? '' : 'Description length must be min. 6 and max. 300';
        break;
      default:
        break;
    }
    this.setState({
      formErrors,
      titleIsValid,
      addressIsValid,
      descriptionIsValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formIsValid: this.state.titleIsValid
      && this.state.addressIsValid
      && this.state.descriptionIsValid
    });
  }

  /**
   * Handle event edit and delete buttons
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
    console.log(data.get('event_title'), 'edited title');
    this.props.dispatch(editEvent(data, this.props.match.params.id));
  }

  handleDeleteEvent = () => {
    this.props.dispatch(deleteEvent(this.props.match.params.id));
    this.props.history.push({
      pathname: '/dashboard'
    });
  }


  render() {
    return (
      <React.Fragment>
        <Header/>
        <div className='main-eventpage'>
          <div className='event'>
            <div className='event-avatar'>
              <img src={this.state.currentEvent.photo} alt="event-cover"/>
              <span className='event-avatar-type' >{this.state.currentEvent.type}</span>
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
              {<ParticipantsModal
                currentEvent_id={this.props.match.params.id}
                currentUser={this.state.currentUser}
                currentEvent={this.state.currentEvent}
                participants={this.state.participants}
              />}
              <br/>
              <div className="long-desc-text">
                <p className="red-subtitles">Description</p>
                <div className="description-text">{this.state.currentEvent.description}</div>
                <p className="red-subtitles">Admin</p>
                {<UserArticle
                  participants={this.state.admin}
                />}
              </div>
              <br/>
              {
                this.state.isAdmin && <section className="event-edit-delete">
                  {/* <button className="edit-btn" onClick={this.handleToggleModal} >EDIT</button> */}
                  <CreateEventModal
                    show={this.state.show}
                    formIsValid={this.state.formIsValid}
                    titleIsValid={this.state.titleIsValid}
                    addressIsValid={this.state.addressIsValid}
                    descriptionIsValid={this.state.descriptionIsValid}
                    handleFileChange={this.handleFileChange}
                    handleDeleteImage={this.handleDeleteImage}
                    handleToggleModal={this.handleToggleModal}
                    handleEventFormSubmit={this.handleEventFormSubmit}
                    imagePreviewSrc={this.state.imagePreviewSrc}
                    handleUserInput={this.handleUserInput}
                    formErrors={this.state.formErrors}
                  />
                  <DeleteEvent
                    handleDeleteEvent={this.handleDeleteEvent}
                  />
                </section>
              }
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
