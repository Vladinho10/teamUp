import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LocationIcon, CheckedIcon, QuestionIcon } from './SvgIcons';
import {
  getOwnEvents,
  getAttendingEvents,
  getSuggestedEvents,
  JoinUser,
  unJoinUser
} from '../actions/eventActions';

class WrappedArticles extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollOnScroll, false);
  }

  //
  // componentWillReceiveProps() {
  //   console.log("propppppppppppppppp", this.props);
  //   this.loadInitialContent();
  // }
  //
  //

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollOnScroll);
  }

  render() {
    const events = (
      this.props.events.sug
      || this.props.events.my
      || this.props.events.go
      || []
    );
    return (
      // <div>
      //   {
      events.map((el, i, arr) => {
        return (
          <article key={el._id || i} onClick={e => this.goToEventPage(e, el._id)} className='eventArticle'>
            <div className='event-photo'>
              <img className='event-photo__img' src={el.photo || './images/default.jpg'} alt='Event Photo' />
            </div>
            <div className='event-container'>
              <header className='event-container__header'>
                <h4>{el.title || 'Let\'s play contact'}</h4>
              </header>
              <div className='event-container__desc'>
                <p>{el.description && el.description.length > 80 ? `${el.description.slice(0, 80)}. . .` : el.description}
                </p>
              </div>
              <div className='event-container__eventInfo'>
                <div className="event-container__eventInfo-wrapper">
                  <p> <CheckedIcon /> going
                    <span>{el.players.length}</span>
                  </p>
                  <p>
                    <QuestionIcon /> missing
                    <span>{el.quantity && el.quantity - el.players.length}</span>
                  </p>
                </div>
              </div>
              <div className='event-container__footer-place'>
                <LocationIcon role='icon' />
                <span className="event-location">{el.location || 'location is not found'}</span>
                <span className="event-type">{el.type}</span>
              </div>
              <div className='event-container__eventInfo-btn'>
                {this.getButton(el._id)}
              </div>
              <div className='event-container__footer-date'>
                {this.formatDate(el.date) || 'Date is not defined'}
              </div>
            </div>
          </article>
        );
      })
      //     }
      // </div>

    );
  }

  getButton = (_id) => {
    const events = (
      this.props.events.sug
      || this.props.events.my
      || this.props.events.go
      || []
    );
    if (events === this.props.events.sug) {
      return <button onClick={() => this.handleJoin(_id) } className='event-container__joinButton'>Join the Event</button>;
    }
    if (events === this.props.events.go) {
      return <button onClick={() => this.handleUnJoin(_id) } className='event-container__joinButton'>UnJoin</button>;
    }
    return null;
  }

  handleJoin = (el_id) => {
    this.props.dispatch(JoinUser(el_id));
  }

  handleUnJoin = (el_id) => {
    this.props.dispatch(unJoinUser(el_id));
  }

  handleScrollOnScroll = () => {
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    const { pageYOffset } = window;
    const fil = (
      this.props.events.sug
      || this.props.events.my
      || this.props.events.go
      || []
    );
    // if (document.body.offsetHeight < innerHeight + scrollY + 150) {
    if (pageYOffset > scrollHeight * 0.3) {
      switch (fil) {
        case this.props.events.sug:
          // if(demo < pageYOffset) {
          //   demo = pageYOffset;
          this.props.dispatch(getSuggestedEvents(1));
          // }
          break;
        case this.props.events.my:
          this.props.dispatch(getOwnEvents(true));
          break;
        case this.props.events.go:
          this.props.dispatch(getAttendingEvents(1));
          break;
        default:
          console.log('deeeeeeeef');
      }
    }
  }

  formatDate = (stringDate) => {
    const options = {
      month: 'short',
      day: 'numeric',
    };
    return new Date(stringDate).toLocaleDateString([], options);
  };

  goToEventPage = (e, id) => {
    console.log(id);
    if (e.target.matches('.event-photo__img') || e.target.matches('.event-container__footer-date') || e.target.matches('.event-container__header')) {
      this.props.history.push({
        pathname: `/eventpage/${id}`
      });
    }
  };
}

const mapStateToProps = (state) => {
  return {
    states: state.a
  };
};

const Articles = connect(mapStateToProps)(WrappedArticles);
export default withRouter(Articles);
