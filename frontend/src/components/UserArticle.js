import React, { Component } from 'react';

const defaultPhoto = require('../../dist/images/no-avatar.png');

class UserArticle extends Component {
  state ={
    participants: [{ UserName: 'aaaa aaaaaaaaaaaaaaaaaaaaaa' }, { UserName: 'bbb bbbbbbb' }, { UserName: 'ccccc ccccccccc' },
      { UserName: 'aaaa aaaaaaaa' }, { UserName: 'bbb bbbbbbb' }, { UserName: 'ccccc ccccccccc' },
      { UserName: 'aaaa aaaaaaaa' }, { UserName: 'bbb bbbbbbb' }, { UserName: 'ccccc ccccccccc' }]
  }

  render() {
    return (
      <div className="modal-container">
        { this.state.participants.map((member) => {
          return (
            <section className="main-participant">
              <div className="main-participant-photo"><img src={defaultPhoto} width="50"/></div>
              <p className="main-participant-name">{member.UserName}</p>
            </section>
          );
        })}
      </div>
    );
  }
}
export default UserArticle;
