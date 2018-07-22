import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import UserAvatar from './UserAvatar';
import EventsSection from './UserEvents';
import { addUser } from '../actions/userActions';

class EventDashboardPage extends Component {
  state = {
    userName: undefined,
    imageSrc: '',
    phoneNumber: undefined
  }

  componentDidMount = () => {
    const options = {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch('/api/dashboard', options);
    f.then((res) => {
      return res.json();
    }).then((DataObj) => {
      console.log(DataObj, 'Dataobj');
      this.props.dispatch(addUser(DataObj));
      this.setState({
        userName: DataObj.user.name,
        imageSrc: DataObj.user.photo,
        phoneNumber: DataObj.user.phone
      });
    }).catch(err => console.log(err));
    // this.setState({ imageSrc: res.url });
  }

  render() {
    return (
      <React.Fragment>
        <Header/>
        <main className='main'>
          <div className='row'>
            <div className='container'>
              <UserAvatar userInfoState={this.state} />
              <EventsSection />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    userData: state.userData
  };
};

export default connect(mapStateToProps)(EventDashboardPage);
