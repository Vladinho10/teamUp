import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Header from './Header';
import UserAvatar from './UserAvatar';
import UserEvents from './UserEvents';
import { addUser } from '../actions/userActions';
import CreateEventModal from './modals/CreateEvent';
import { PlusIcon } from './SvgIcons';
import { addEvent } from '../actions/eventActions';


class EventDashboardPage extends Component {
  state = {
    // userName: null,
    // imageSrc: '',
    // phoneNumber: null,
    imagePreviewSrc: '',
    selectedFile: null,
    show: false,
    prevShow: this.prevShow,
    loaded: false
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
      // console.log('DataObj', DataObj);
      // console.log('UserEvents props Mount', this.props);
      this.props.dispatch(addUser(DataObj));
      this.setState(prevState => ({ loaded: !prevState.loaded }));
      // this.setState({
      //   userName: DataObj.user.name,
      //   imageSrc: DataObj.user.photo,handleEventFormSubmit
      //   phoneNumber: DataObj.user.phone
      // });
    }).catch(err => console.log(err));
  }

  handleToggleModal = () => {
    this.setState(prevState => ({ show: !prevState.show }));
    this.handleDeleteImage();
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

  // handleFileUpload = () => {
  //   this.handleToggleModal();
  //   const fd = new FormData();
  //   fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
  //   this.props.dispatch(addEvent(fd));
  // }

  handleEventFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.show) {
      this.handleToggleModal();
    }

    const data = new FormData(event.target);
    console.log(data.get('event_type'));
    this.props.dispatch(addEvent(data));
    this.handleDeleteImage();
  }

  render() {
    // console.log(this.props, 'proooooooooopssss dashboard');
    return (
      !this.state.loaded ? <div className="loader">
        <Loader
          className="loader"
          type="Bars"
          color="#00BFFF"
          height="200"
          width="200"
        >
        </Loader>
      </div> : <React.Fragment>
        <div className="add-event">
          <button className="btn btn_create-event" onClick={this.handleToggleModal}>
            <PlusIcon title='Create Event' />
          </button>
        </div>
        <Header/>
        <main className='main'>
          <div className='row'>
            <div className='container'>
              <UserAvatar />
              <UserEvents />
              <CreateEventModal
                show={this.state.show}
                handleFileChange={this.handleFileChange}
                handleDeleteImage={this.handleDeleteImage}
                handleToggleModal={this.handleToggleModal}
                handleEventFormSubmit={this.handleEventFormSubmit}
                imagePreviewSrc={this.state.imagePreviewSrc}
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
    // events: state.events,
    userData: state.userData
  };
};

export default connect(mapStateToProps)(EventDashboardPage);
