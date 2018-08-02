import React, { Component } from 'react';

class UserArticle extends Component {
  render() {
    return (
      <div className="modal-container">
        { this.props.participants.map((participant, index) => {
          return (
            <section className="main-participant" key={index}>
              <div className="main-participant-photo"><img src={ participant.photo} width="40"/></div>
              <p className="main-participant-name">{ participant.name}</p>
            </section>
          );
        })}
      </div>
    );
  }
}
export default UserArticle;
