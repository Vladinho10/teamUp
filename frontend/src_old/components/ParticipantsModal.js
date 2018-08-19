import React from 'react';
import Modal from 'react-modal';
import UserArticle from './UserArticle';
import JoinBtn from './JoinBtn';

class ParticipantsModal extends React.Component {
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
    console.log(this.props.currentEvent.players, 'this.props.currentEvent.players');
    this.getParticipants(this.props.currentEvent.players);

    // this.setState({ modalIsOpen: true });
  }


  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  getParticipants = (participants) => {
    // console.log(participants, 'participants');
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
        console.log(players, 'getting players of this event');
        this.setState({
          participants: players.part_data,
          modalIsOpen: true
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    // console.log(this.props.currentEvent, 'currentEvent');
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
            participants={this.state.participants}
          />}
          <input type="button" className="participants-close-btn" onClick={this.closeModal} value="close"/>
        </Modal>
      </div>
    );
  }
}

export default ParticipantsModal;
