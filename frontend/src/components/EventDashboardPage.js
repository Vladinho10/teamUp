import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';

class EventDashboardPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Header can={this.props.events}/>
        <main className='main'>
          <div></div>
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
