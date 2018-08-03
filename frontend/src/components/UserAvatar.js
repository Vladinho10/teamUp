import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UploadModal from './modals/UploadPhoto';
import { PhotoIcon, EditIcon } from './SvgIcons';
import { editUser } from '../actions/userActions';

const defaultPhoto = require('../../dist/images/no-avatar.png');

class UserAvatar extends Component {
  state = {
    nameChange: null,
    phoneChange: false,
    addPhone: null,
    selectedFile: null,
    imageSrc: null,
    base64Image: '',
    show: undefined
  }

  handleSaveName = (event) => {
    event.preventDefault();
    this.props.dispatch(editUser(event.target.children[0].value, 'name'));
    this.setState(prevState => ({ nameChange: !prevState.nameChange }));
  };

  handleNameChange = (event) => {
    event.preventDefault();
    this.setState(prevState => ({ nameChange: !prevState.nameChange }));
  }

  handleSavePhone = (event) => {
    event.preventDefault();
    this.props.dispatch(editUser(event.target.children[0].value, 'phone'));
    this.setState(prevState => ({ phoneChange: !prevState.phoneChange }));
  };

  handlePhoneChange = (event) => {
    event.preventDefault();
    this.setState(prevState => ({ phoneChange: !prevState.phoneChange }));
  }

  handleAddPhone = (event) => {
    event.preventDefault();
    this.setState(prevState => ({ addPhone: !prevState.addPhone }));
    this.setState(prevState => ({ phoneChange: !prevState.phoneChange }));
  }

  handleToggleModal = () => {
    this.setState(prevState => ({ show: !prevState.show }));
  }

  handleFileChange = (event) => {
    const imageSrc = URL.createObjectURL(event.target.files[0]);
    this.getBase64(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      imageSrc
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

  handleFileUpload = () => {
    this.handleToggleModal();
    const fd = new FormData();
    fd.append('avatar', this.state.base64Image);
    this.props.dispatch(editUser(fd));
  }

  render() {
    console.log(this.props.user.photo, 'photooooooooo');
    let handlePhoneNumber;
    let handleEditPhoneNumber;
    if (this.state.addPhone) {
      handlePhoneNumber = <form className="phone-form" onSubmit={this.handleSavePhone} method="POST">
        <input type="text" name="phone" defaultValue={this.props.user.phone} />
        <input type="submit" value="SAVE" className="btn" />
      </form>;
    } else {
      handlePhoneNumber = <button className="btn" onClick={this.handleAddPhone}>ADD PHONE NUMBER</button>;
    }

    if (this.state.phoneChange) {
      handleEditPhoneNumber = <form className="phone-form" onSubmit={this.handleSavePhone} method="POST">
        <input type="text" name="phone" defaultValue={this.props.user.phone} />
        <input type="submit" value="SAVE" className="btn" />
      </form>;
    } else {
      handleEditPhoneNumber = <React.Fragment>
        <p>{this.props.user.phone}</p>
        <button className='button-wrapper' onClick={this.handlePhoneChange}><EditIcon /></button>
      </React.Fragment>;
    }

    return (
      <React.Fragment>
        <div className="user-avatar">
          <div className="user-avatar__logo-box">
            {
              this.props.user.photo
                ? <NavLink className="user-avatar__link" to='#'><img className="user-avatar__logo" src={this.props.user.photo} alt="User Photo" width="200" height="300" /></NavLink>
                : <NavLink className="user-avatar__link" to="#"><img className="user-avatar__logo" src={defaultPhoto} alt="User Photo" width="200" height="300" /></NavLink>
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
                  ? <form className="name-form" method="POST" onSubmit={this.handleSaveName}>
                    <input type="text" name="username" defaultValue={this.props.user.name} />
                    <input type="submit" value="SAVE" className="btn" />
                  </form>
                  : <React.Fragment>
                    <h2>{this.props.user.name}</h2>
                    <button className='button-wrapper' onClick={this.handleNameChange}><EditIcon /></button>
                  </React.Fragment>
              }
            </div>
            <div className="user-avatar__phone-box">
              {
                !Number.isFinite(this.props.user.phone)
                  ? handleEditPhoneNumber
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
    user: state.userData.user
  };
};

export default connect(mapStateToProps)(UserAvatar);
