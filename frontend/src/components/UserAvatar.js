import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UploadModal from './UploadModal';
import { PhotoIcon } from './SvgIcons';

const defaultPhoto = require('../../dist/images/no-avatar.png');

class UserAvatar extends Component {
  state = {
    change: false,
    selectedFile: null,
    imageSrc: '',
    show: undefined
  }

  handleNameChange = () => {
    this.setState(prevState => ({ change: !prevState.change }));
  }

  handleAddPhoneNumber = () => {

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
    fetch('/api/dashboard', {
      method: 'POST',
      body: JSON.stringify({ name: 'noro' }),
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
        <div className="user-avatar">
          <div className="user-avatar__logo-box">
            {
              this.state.url
                ? <NavLink className="user-avatar__link" to="/"><img className="user-avatar__logo" src={this.state.url} alt="User Photo" width="200" height="300" /></NavLink>
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
                this.state.change
                  ? <form>
                    <input type="text" name="username" defaultValue={this.props.users.name} />
                    <input type="submit" value="SAVE" />
                  </form>
                  : <h2>{this.props.users.name}</h2>
              }
            </div>
            <div className="user-avatar__phone-box">
              {
                this.props.users.phone
                  ? <p>{this.props.users.phone}</p>
                  : <button className="btn" onClick={this.handleAddPhoneNumber}>ADD PHONE NUMBER</button>
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
    users: state.users
  };
};

export default connect(mapStateToProps)(UserAvatar);
