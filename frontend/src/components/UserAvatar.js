import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PhotoIcon } from './svgIcons';

const defaultPhoto = require('../../dist/images/no-avatar.png');

class UserAvatar extends Component {
  state = {
    change: false
  }

  handleNameChange = () => {
    this.setState(prevState => ({ change: !prevState.change }));
  }

  handleAddPhoneNumber = () => {

  }

  render() {
    return (
      <React.Fragment>
        <div className="user-avatar">
          <div className="user-avatar__logo-box">
            {
              this.props.users.photo
                ? <NavLink to="/"><img className="user-avatar__logo" src={this.props.users.photo} alt="User Photo" width="200" height="300" /></NavLink>
                : <NavLink to="/"><img className="user-avatar__logo" src={defaultPhoto} alt="User Photo" width="200" height="300" /></NavLink>
            }
            <div className="user-avatar__add-photo">
              <PhotoIcon className="photo__icon" role="icon" />
              <span>Upload or change photo</span>
            </div>
          </div>
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
                  : <button onClick={this.handleAddPhoneNumber}>ADD PHONE NUMBER</button>
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
