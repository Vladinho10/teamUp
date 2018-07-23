import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UploadModal from './UploadModal';
import { PhotoIcon, EditIcon } from './SvgIcons';
import { savePhoneNumber } from '../actions/userActions';

const defaultPhoto = require('../../dist/images/no-avatar.png');

class UserAvatar extends Component {
  state = {
    nameChange: false,
    phoneChange: false,
    selectedFile: null,
    imageSrc: null,
    savedImageSrc: null,
    show: undefined
  }

  handleNameChange = (event) => {
    event.preventDefault();
    this.setState(prevState => ({ nameChange: !prevState.nameChange }));
  }

  handlePhoneChange = (event) => {
    this.setState(prevState => ({ phoneChange: !prevState.phoneChange }));
  }

  handleAddPhoneNumber = () => {
    this.setState(prevState => ({ phoneChange: !prevState.phoneChange }));
  }

  handleSaveNewNumber = (event) => {
    event.preventDefault();
    console.log(event.target[0].value, 'savePhone');
    savePhoneNumber(event.target[0].value);
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
    this.handleToggleModal();
    this.setState(prevState => ({ savedImageSrc: prevState.imageSrc }));
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    fetch('/api/upload_user_image', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(fd),
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
    console.log(this.props, 'userAvatar props');
    console.log(this.props.userInfoState.phoneNumber, 'userAvatar phone NUmber');
    let handlePhoneNumber;
    let src;

    if (this.state.phoneChange) {
      handlePhoneNumber = <form onSubmit={this.handleSaveNewNumber}>
        <input type="text" name="phone" defaultValue={this.props.userInfoState.phoneNumber} />
        <input type="submit" value="SAVE" />
      </form>;
    } else {
      handlePhoneNumber = <button className="btn" onClick={this.handleAddPhoneNumber}>ADD PHONE NUMBER</button>;
    }

    if (this.state.savedImageSrc !== null) {
      src = this.state.savedImageSrc;
    } else {
      src = this.props.userInfoState.imageSrc;
    }
    return (
      <React.Fragment>
        <div className="user-avatar">
          <div className="user-avatar__logo-box">
            {
              this.props.userInfoState.imageSrc
                ? <NavLink className="user-avatar__link" to="/"><img className="user-avatar__logo" src={src} alt="User Photo" width="200" height="300" /></NavLink>
                : <NavLink className="user-avatar__link" to="/"><img className="user-avatar__logo" src={defaultPhoto} alt="User Photo" width="200" height="300" /></NavLink>
            }
            <div className="user-avatar__add-photo" onClick={this.handleToggleModal}>
              <PhotoIcon className="photo__icon" role="icon" />
              <span>Upload or change photo</span>
            </div>
          </div>
          <UploadModal
            handleFileChange={this.handleFileChange}
            handleFileUpload={this.handleFileUpload}
            handleToggleModal={this.handleToggleModal}
            show={this.state.show}
            imageSrc={this.state.imageSrc}
          />
          <div className="user-avatar__info">
            <div className="user-avatar__name-box">
              {
                this.state.nameChange
                  ? <form>
                    <input type="text" name="username" defaultValue={this.props.userInfoState.userName} />
                    <input type="submit" value="SAVE" />
                  </form>
                  : <React.Fragment>
                    <h2>{this.props.userInfoState.userName}</h2>
                    <button className='button-wrapper' onClick={this.handleNameChange}><EditIcon /></button>
                  </React.Fragment>
              }
            </div>
            <div className="user-avatar__phone-box">
              {
                this.props.userInfoState.phoneNumber !== 0
                  ? <React.Fragment>
                    <p>{this.props.userInfoState.phoneNumber}</p>
                    <button className='button-wrapper' onClick={this.handlePhoneChange}><EditIcon /></button>
                  </React.Fragment>
                  : handlePhoneNumber
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
    user: state.user
  };
};

export default connect(mapStateToProps)(UserAvatar);
