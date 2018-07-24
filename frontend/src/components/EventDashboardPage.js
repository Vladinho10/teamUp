import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import UserAvatar from './UserAvatar';
import EventsSection from './UserEvents';
import { addUser } from '../actions/userActions';
import CreateEventModal from './modals/CreateEvent';
import { PlusIcon } from './SvgIcons';
import { addEvent } from '../actions/eventActions';

class EventDashboardPage extends Component {
  state = {
    userName: null,
    imageSrc: '',
    phoneNumber: null,
    selectedFile: null,
    show: true
  }

  componentDidMount = () => {
    const options = {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch('/api/dashboard', options);
    f.then((res) => {
      return res.json();
    }).then((DataObj) => {
      console.log(DataObj, 'Dataobj');
      this.props.dispatch(addUser(DataObj));
      this.setState({
        userName: DataObj.user.name,
        imageSrc: DataObj.user.photo,
        phoneNumber: DataObj.user.phone
      });
    }).catch(err => console.log(err));
    // this.setState({ imageSrc: res.url });
  }

  handleToggleModal = () => {
    this.setState(prevState => ({ show: !prevState.show }));
  }

  // handleFileChange = (event) => {
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //   });
  // }

  // handleFileUpload = () => {
  //   this.handleToggleModal();
  //   const fd = new FormData();
  //   fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
  //   this.props.dispatch(addEvent(fd));
  // }

  handleEventFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    this.props.dispatch(addEvent(data));
  }

  render() {
    return (
      <React.Fragment>
        <div className="create-event">
          <button className="btn create-event__button">
            <PlusIcon />
          </button>
        </div>
        <Header/>
        <main className='main'>
          <div className='row'>
            <div className='container'>
              <UserAvatar userInfoState={this.state} />
              <EventsSection />
              <CreateEventModal
                show={this.state.show}
                handleToggleModal={this.handleToggleModal}
                handleEventFormSubmit={this.handleEventFormSubmit}
              />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    userData: state.userData
  };
};

export default connect(mapStateToProps)(EventDashboardPage);
