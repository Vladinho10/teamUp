import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LocationIcon } from './SvgIcons';

class WrappedArticles extends Component {
  // state = {
  //   buttonJoin: false
  // };

  changeBtnName() {
    // this.setState(prevState => ({
    //   buttonJoin: !prevState.buttonJoin
    // }));
    console.log(this.state);
    // if (this.value === 'Join') this.value = 'Unjoin';
    // else this.value = 'Join';
    // this.value === 'Join' ? this.value = 'Unjoin' : this.value = 'Join';
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
    if (!e.target.matches('.event-container__joinButton')) {
      this.props.history.push({
        pathname: `/eventpage/${id}`
      });
    }
  };

  render() {
    // console.log('this.props in Article', this.props);
    let { events } = this.props;
    // let { own_events } = this.props;
    // console.log('events', events);
    events = events || [];
    // console.log('events[events.length - 1]');
    return (
      events.map((el, i, arr) => {
        console.log(el);
        return (
          <article key={el._id || i} a={this.props} onClick={e => this.goToEventPage(e, el._id)} className='eventArticle'>
            <div className='event-photo'>
              <img className='event-photo__img' src={el.photo || './images/default.jpg'} alt='Event Photo' />
            </div>
            <div className='event-container'>
              <header className='event-container__header'>
                <h4>{el.title || 'Let\'s play contact'}</h4>
              </header>
              <div className='event-container__desc'>
                <p>{el.description.length > 80 ? `${el.description.slice(0, 80)}. . .` : el.description}
                </p>
              </div>
              <span className='event-container__desc-seeMore'>see more</span>
              <div className='event-container__eventInfo'>
                <p>going </p>
                <p>missing </p>
                <div className='event-container__eventInfo-btn'>
                  <button onClick={ this.changeBtnName } className='event-container__joinButton'>Join</button>
                </div>
              </div>
              <footer className='event-container__footer'>
                <div className='event-container__footer-date'>
                  {this.formatDate(el.date) || 'Date is not defined'}
                </div>
                <div className='event-container__footer-place'>
                  <LocationIcon role='icon' />
                  {el.location || 'location is not found'}
                </div>
              </footer>
            </div>
          </article>
        );
      })
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // own_events: state.own_events.events,
    states: state.a
    // events: state.userData.suggested  };
  };
};

const Articles = connect(mapStateToProps)(WrappedArticles);
export default withRouter(Articles);
