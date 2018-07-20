import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import UserAvatar from './UserAvatar';
import EventsSection from './UserEvents';

class EventDashboardPage extends Component {
  componentDidMount = () => {
    fetch('/api/dashboard', {
      method: 'POST',
      body: JSON.stringify({ name: 'noro' }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then((res) => {
        console.log(res);
        this.setState({ imageSrc: res.url });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Header can={this.props.events} />
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
    events: state.events
  };
};

export default connect(mapStateToProps)(EventDashboardPage);
