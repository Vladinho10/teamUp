import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import UserAvatar from './UserAvatar';
import EventsSection from './UserEvents';

class EventDashboardPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header can={this.props.events}/>
        <main className='main'>
          <div className='row'>
            <div className='container'>
              <UserAvatar />
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
    user: state.user
  };
};

export default connect(mapStateToProps)(EventDashboardPage);
