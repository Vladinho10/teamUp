import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LocationIcon } from '../SvgIcons';

class Users extends Component {
  state = {
    count: 3,
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

    return (
      tempArray.map((event) => {
        return (
          <article key={ event._id } className="searched-events__event searched-event">
            <NavLink className="searched-event__link-image" to="/">
              <img className="searched-event__image" src={event.photo} alt="User Photo" />
            </NavLink>
            <div className="searched-event__event-info">
              <header className="searched-event__header">
                <NavLink className="searched-event__event-name" to="/">
                  <h3 className="searched-event__heading">{event.title}</h3>
                </NavLink>
                <span>
                  <small>category:</small>
                  <NavLink className="searched-event__event-type" to="/">
                    <p className="searched-event__heading">{event.type}</p>
                  </NavLink>
                </span>
                {this.state.join
                  ? <button className="btn btn_join" onClick={this.handleJoinEvent} className="searched-event__join-btn">Join</button>
                  : <button className="btn btn_join" onClick={this.handleUnjoinEvent} className="searched-event__join-btn">Unjoin</button>
                }
              </header>
              <div className="searched-event__details">
                <div className="searched-event__description-box">
                  <p>{event.description}</p>
                </div>
                <div className="searched-event__members">
                  <p className="searched-event__going">going - {event.players.length}</p>
                  <p className="searched-event__missing">missing - {event.quantity - event.players.length}</p>
                </div>
                <div className="searched-event__date-location">
                  <time dateTime={this.formatDate(event.date)}>
                    {this.formatDate(event.date)} <span>{event.time}</span>
                  </time>
                  <p><LocationIcon /> {event.location}</p>
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

export default connect(mapStateToProps)(Users);
