import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class UserArticle extends Component {
  redirectUserPage = (e, id) => {
    console.log(id);
    if (e.target.matches('.main-participant-photo') || e.target.matches('.main-participant-name')) {
      this.props.history.push({
        pathname: `/account/${id}`
      });
    }
  };

  render() {
    return (
      <div className="modal-container">
        { this.props.participants.map((participant) => {
          return (
            <section onClick={e => this.redirectUserPage(e, participant._id)} className="main-participant" key={participant._id}>
              <div className="main-participant-photo"><img src={participant.photo} width="40"/></div>
              <p className="main-participant-name">{ participant.name}</p>
            </section>
          );
        })}
      </div>
    );
  }
}
export default withRouter(UserArticle);
