import React from 'react';
import Modal from 'react-modal';
import UserArticle from './UserArticle';
import JoinBtn from './JoinBtn';

const participents = '17'; // this.props.event.participants.length

class ModalComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <section className='btn-section'>
          <button onClick={this.openModal} className="participants-open-btn"> {participents} people are going </button>
          <JoinBtn/>
        </section>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Modal of Participants"
        >
          {<UserArticle />}
          <input type="button" className="participants-close-btn" onClick={this.closeModal} value="close"/>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
