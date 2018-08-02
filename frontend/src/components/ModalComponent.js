import React from 'react';
import Modal from 'react-modal';
import UserArticle from './UserArticle';
import JoinBtn from './JoinBtn';

class ModalComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      // participants: 1  // {this.state.participants}
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.getParticipants(this.props.currentEvent.players);

    this.setState({ modalIsOpen: true });
  }


  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  getParticipants = (participants) => {
    const data = { participants };
    const options = {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' }
    };

    fetch('/api/participants', options)
      .then((res) => {
        return res.json();
      })
      .then((players) => {
        console.log(players, 'getting participants in eventPage');
        this.setState({
          participants: players
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <section className='btn-section'>
          <button onClick={this.openModal} className="participants-open-btn"> PARTICIPANTS </button>
          <JoinBtn
            event_id={this.props.currentEvent_id}
            currentEvent={this.props.currentEvent}
          />
        </section>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Modal of Participants"
        >
          {<UserArticle
            participants={this.props.participants}
          />}
          <input type="button" className="participants-close-btn" onClick={this.closeModal} value="close"/>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
