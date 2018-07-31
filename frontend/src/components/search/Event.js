import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { LocationIcon } from '../SvgIcons';

const defaultPhoto = require('../../../dist/images/eventCover.jpg');

class Event extends Component {
  formatDate = (stringDate) => {
    const options = {
      month: 'short',
      day: 'numeric',
    };
    return new Date(stringDate).toLocaleDateString([], options);
  };

  render() {
    return (
      <article key={ this.props.event._id } className="searched-events__event searched-event">
        <NavLink className="searched-event__link-image" to="/">
          <img className="searched-event__image" src={this.props.event.photo || defaultPhoto} alt="Event Photo" />
        </NavLink>
        <div className="searched-event__event-info">
          <header className="searched-event__header">
            <NavLink className="searched-event__event-name" to="/">
              <h3 className="searched-event__heading">{this.props.event.title}</h3>
            </NavLink>
            <p className="searched-event__event-type">
              <NavLink className="searched-event__event-type" to="/">
                <span>{this.props.event.type}</span>
              </NavLink>
            </p>
            {this.props.join
              ? <button disabled={ +(this.props.event.quantity - this.props.event.players.length) ? null : true } className="btn btn_join" onClick={this.handleJoinEvent} className="searched-event__join-btn">Join</button>
              : <button className="btn btn_join" onClick={this.handleUnjoinEvent} className="searched-event__join-btn">Unjoin</button>
            }
          </header>
          <div className="searched-event__details">
            <div className="searched-event__description-box">
              <p>{this.props.event.description}</p>
            </div>
            <div className="searched-event__date-location">
              <time dateTime={this.formatDate(this.props.event.date)}>
                {this.formatDate(this.props.event.date)} <span>{this.props.event.time || 'time is not defined'}</span>
              </time>
              <p><LocationIcon /> {this.props.event.location}</p>
            </div>
            <div className="searched-event__members">
              <p className="searched-event__going">going - {this.props.event.players.length}</p>
              <p className="searched-event__missing">missing - {this.props.event.quantity - this.props.event.players.length}</p>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default Event;
