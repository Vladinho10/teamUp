import React from 'react';
import { connect } from 'react-redux';
import { addParticipant, deleteParticipant } from '../actions/participantAction';

class JoinBtn extends React.Component {
    state = {
      isGoing: false,
      user: {},
    };

    componentDidMount = () => {
      this.getCurrentUser();
    }

    getCurrentUser = () => {
      const options = {
        credentials: 'include',
        method: 'GET',
      };
      fetch('/api/user/me', options)
        .then((res) => {
          return res.json();
        })
        .then((user) => {
          // console.log(this.props.event_id, 'this.props.event_id');
          // console.log(user, 'current user from joinbtn');
          // console.log(this.props.currentEvent.admins, ' this.props.currentEvent.admins');
          if (user.attending_events.includes(this.props.event_id)
          || this.props.currentEvent.admins.includes(this.state.user._id)) {
            this.setState({
              isGoing: true,
              user
            });
          }
        })
        .catch(err => console.log(err));
    };

    handleChange = () => {
      if (this.props.currentEvent.admins.includes(this.state.user._id)) {
        alert("You are admin. You can't unjoin the event");
        return;
      }
      this.setState({ isGoing: !this.state.isGoing }, () => {
        if (this.state.isGoing) {
          this.props.join(this.props.currentEvent._id);
        } else {
          this.props.unjoin(this.props.currentEvent._id);
        }
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

const mapDispatchToProps = (dispatch) => {
  return {
    join: ev_id => dispatch(addParticipant(ev_id)),
    unjoin: ev_id => dispatch(deleteParticipant(ev_id)),
  };
};

export default connect(null, mapDispatchToProps)(JoinBtn);
