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
    event_title: '',
    event_address: '',
    event_description: '',
    titleIsValid: false,
    addressIsValid: false,
    descriptionIsValid: false,
    formIsValid: false,
    formErrors: {
      title: '',
      address: '',
      description: ''
    },
    imagePreviewSrc: '',
    base64Image: '',
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
      this.props.dispatch(addUser(DataObj));
      this.setState(prevState => ({ loaded: !prevState.loaded }));
    }).catch(err => console.log(err));
  }

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

  handleToggleModal = () => {
    this.setState(prevState => ({ show: !prevState.show }));
    this.handleDeleteImage();
  }

  handleFileChange = (event) => {
    const imagePreviewSrc = URL.createObjectURL(event.target.files[0]);
    this.getBase64(event.target.files[0]);
    this.setState({
      imagePreviewSrc
    });
  }

  getBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({ base64Image: reader.result });
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  };

  handleDeleteImage = () => {
    this.setState(() => ({ imagePreviewSrc: null }));
  }

  handleEventFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.show) {
      this.handleToggleModal();
    }

    const data = new FormData(event.target);
    data.set('photo', this.state.base64Image);
    // console.log(data.get('photo'), 'gggggggggggggggggggggggggggggggggggggggggggggggg');
    this.props.dispatch(addEvent(data));
    this.handleDeleteImage();
  }

  render() {
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
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  };
};

export default connect(mapStateToProps)(EventDashboardPage);
