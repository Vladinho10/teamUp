import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { LocationIcon } from '../SvgIcons';

const defaultPhoto = require('../../../dist/images/eventCover.jpg');

class Users extends Component {
  state = {
    count: 5,
    join: true
  }

  formatDate = (stringDate) => {
    const options = {
      month: 'short',
      day: 'numeric',
    };
    return new Date(stringDate).toLocaleDateString([], options);
  };

  handleJoinEvent = (event) => {
    event.preventDefault();
  }

  handleUnjoinEvent = (event) => {
    event.preventDefault();
  }

  render() {
    const tempArray = [];
    const searchEventsResults = this.props.searchData.filter((item) => {
      return !!item.title;
    });

    for (let i = 0; i < searchEventsResults.length; i += 1) {
      if (i < this.state.count) {
        tempArray.push(searchEventsResults[i]);
      }
    }
    console.log(tempArray, 'temparray events');
    console.log(this.props, 'temparray props');

    return (
      tempArray.map((event) => {
        return (
          <article key={ event._id } className="searched-events__event searched-event">
            <NavLink className="searched-event__link-image" to="/">
              <img className="searched-event__image" src={event.photo || defaultPhoto} alt="Event Photo" />
            </NavLink>
            <div className="searched-event__event-info">
              <header className="searched-event__header">
                <NavLink className="searched-event__event-name" to="/">
                  <h3 className="searched-event__heading">{event.title}</h3>
                </NavLink>
                <p className="searched-event__event-type">
                  <NavLink className="searched-event__event-type" to="/">
                    <span>{event.type}</span>
                  </NavLink>
                </p>
                {this.state.join
                  ? <button disabled={ +(event.quantity - event.players.length) ? null : true } className="btn btn_join" onClick={this.handleJoinEvent} className="searched-event__join-btn">Join</button>
                  : <button className="btn btn_join" onClick={this.handleUnjoinEvent} className="searched-event__join-btn">Unjoin</button>
                }
              </header>
              <div className="searched-event__details">
                <div className="searched-event__description-box">
                  <p>{event.description}</p>
                </div>
                <div className="searched-event__date-location">
                  <time dateTime={this.formatDate(event.date)}>
                    {this.formatDate(event.date)} <span>{event.time || 'time is not defined'}</span>
                  </time>
                  <p><LocationIcon /> {event.location}</p>
                </div>
                <div className="searched-event__members">
                  <p className="searched-event__going">going - {event.players.length}</p>
                  <p className="searched-event__missing">missing - {event.quantity - event.players.length}</p>
                </div>
              </div>
            </div>
          </article>
        );
      })
    );
  }
}


const mapStateToProps = (state) => {
  // console.log(ownProps, 'searchresultspage ownprrops'); here i can find the query
  return {
    searchData: state.searchData
  };
};

export default withRouter(connect(mapStateToProps)(Users));
