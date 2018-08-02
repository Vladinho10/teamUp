import React, { Component } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'rc-time-picker';
import { PlusIcon, DeleteIcon } from '../SvgIcons';


class CreateEventModal extends Component {
    state = {
      currentDate: moment(),
      currentTime: moment(),
      calendarFocused: false,
    }

    onDateChange = (currentDate) => {
      this.setState({ currentDate });
    };

    onFocusChange = ({ focused }) => {
      this.setState(() => ({ calendarFocused: focused }));
    };

    onTimeChange = (currentTime) => {
      this.setState({ currentTime });
    }

    render() {
      return (
        <Modal
          isOpen={!!this.props.show}
          contentLabel="Upload Photo"
          onRequestClose={this.props.handleToggleModal}
          closeTimeoutMS={200}
          ariaHideApp={false}
        >
          <div className="create-event">
            <form className="create-event__form" method="POST" onSubmit={this.props.handleEventFormSubmit}>
              <div className="create-event__title">
                <label htmlFor="title">Title</label>
                <input required type="text" id="title" name="event_title"
                  defaultValue={this.props.event ? this.props.event.title : '' }
                  placeholder= "title"
                />
              </div>

              <div className="create-event__address">
                <label htmlFor="address">Address</label>
                <input required type="text" id="address" name="event_address" placeholder="Address"
                  defaultValue={this.props.event ? this.props.event.location : '' }
                />
              </div>

              <div className="create-event__description">
                <label htmlFor="description">Description</label>
                <textarea rows="3" cols="50" id="description" name="event_description" placeholder="Write a description here"
                  defaultValue={this.props.event ? this.props.event.description : '' }
                ></textarea>
              </div>

              <div className="create-event__members">
                <label htmlFor="count">max. members</label>
                <input required type="number" id="count" name="event_members_count" min="0"
                  // defaultValue={this.props.event ? this.props.event.quantity : '' }
                />
              </div>

              <div className="create-event__types">
                <select required name="event_type" className="create-event-select">
                  <option defaultValue="sport">Sport</option>
                  <option value="meeting">Meeting</option>
                  <option value="seminar">Seminar</option>
                  <option value="travel">Travel</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="family">Family</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="create-event__datepicker">
                <SingleDatePicker
                  id="datepicker"
                  date={this.state.currentDate}
                  onDateChange={this.onDateChange}
                  focused={this.state.calendarFocused}
                  onFocusChange={this.onFocusChange}
                  numberOfMonths={1}
                />
                <TimePicker
                  id="timepicker"
                  time={this.props.event ? this.props.event.time : this.state.currentTime}
                  defaultValue={this.state.currentTime }
                  name="timepicker"
                  showSecond={false}
                  style={{ width: 100 }}
                  showSecond={true}
                  className="create-event__timepicker"
                  onTimeChange={this.onTimeChange}
                />
              </div>
              <div className="create-event__image-box">
                <div className="create-event__upload-box" >
                  <PlusIcon />
                  <span className="create-event__upload-text">Upload Photo</span>
                  <div className="create-event__input-upload-box">
                    <a className="create-event__upload-link upload-modal__button" aria-label="Upload Photo" role="button">
                      <input className="upload-modal__input-upload" type="file" title="Choose a file to upload" accept="image/*" name="photo" onChange={this.props.handleFileChange} />
                    </a>
                  </div>
                </div>
                {this.props.imagePreviewSrc ? <div className="image-preview__image-box create-event__image-preview-box">
                  <img className="create-event__image-preview" src={this.props.imagePreviewSrc} alt="preview" />
                  <button onClick={this.props.handleDeleteImage}><DeleteIcon /></button>
                </div> : null}
              </div>
              <div className="create-event__submit-form">
                <button className="btn btn--cancel" type="button" onClick={this.props.handleToggleModal}>Cancel</button>
                {
                  !this.props.event
                    ? <button className="btn btn--create">Create Event</button>
                    : <button className="btn btn--create">Save</button>
                }
              </div>
            </form>
          </div>
        </Modal>
      );
    }
}

export default CreateEventModal;
