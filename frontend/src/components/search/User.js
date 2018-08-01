import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class User extends Component {
  render() {
    return (
      <React.Fragment>
        <section key={ this.props.user._id } className="searched-users__user searched-user">
          <NavLink className="searched-user__link-image" to={`/account/${this.props.user._id}`}>
            <img className="searched-user__image" src={this.props.user.photo} alt="User Photo" />
          </NavLink>
          <div className="searched-user__user-info">
            <NavLink className="searched-user__user-name" to={`/account/${this.props.user._id}`}>
              <h3 className="searched-user__heading">{this.props.user.name}</h3>
            </NavLink>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default User;
