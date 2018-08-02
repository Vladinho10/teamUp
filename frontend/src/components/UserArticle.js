import React, { Component } from 'react';

const defaultPhoto = require('../../dist/images/no-avatar.png');

class UserArticle extends Component {
  render() {
    return (
      <div className="modal-container">
        { this.props.participants.map((participant, index) => {
          return (
            <section className="main-participant" key={index}>
              <div className="main-participant-photo"><img src={defaultPhoto} width="40"/></div>
              <p className="main-participant-name">{participant.UserName}</p>
            </section>
          );
        })}
      </div>
    );
  }
}
export default UserArticle;
