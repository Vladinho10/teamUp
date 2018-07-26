import React from 'react';
import { connect } from 'react-redux';
import { addParticipant, deleteParticipant } from '../actions/participantAction';

class JoinBtn extends React.Component {
    state = {
      isGoing: false
    }

    handleChange = () => {
      this.setState({ isGoing: !this.state.isGoing }, () => {
        if (this.state.isGoing) {
          this.props.join();
        } else this.props.unjoin();
      });
    }

    render() {
      return (
        <div>
          {
            this.state.isGoing
              ? <button className="unjoin-btn" onClick={this.handleChange} > UNJOIN </button>
              : <button className="join-btn" onClick={this.handleChange}> JOIN </button>
          }
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    events: state.userData.events, // participantin avelacnel events.players-i mej
    currentUser: state.userData.user // avelacnel et eventy user-i going []-i mej
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    join: id => dispatch(addParticipant(id)),
    unjoin: id => dispatch(deleteParticipant(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinBtn);
