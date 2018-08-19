import React from 'react';
import Modal from 'react-modal';

class DeleteEvent extends React.Component {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal} className="delete-event-btn"> DELETE </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Modal of Participants"
        >
          <h3 className="red-subtitles">Confirmation </h3>
          <hr/>
          <p> Are you sure you want to delete this event? </p>
          <p>This action <b>CANNOT</b> be undone</p>
          <hr/>
          <br/>
          <div className="delete-event">
            <input type="button" className="delete-event-cancel" onClick={this.closeModal} value="cancel"/>
            <input type="button" className="delete-event-confirm" onClick={this.props.handleDeleteEvent} value="confirm"/>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DeleteEvent;
