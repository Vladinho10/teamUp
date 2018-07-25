import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LocationIcon } from './SvgIcons';

class WrappedArticles extends Component {

  changeBtnName() {
    console.log(this.state);
    // if (this.value === 'Join') this.value = 'Unjoin';
    // else this.value = 'Join';
    // this.value === 'Join' ? this.value = 'Unjoin' : this.value = 'Join';
  }

  goToEventPage = (e, id) => {
    console.log(id);
    if (!e.target.matches('.event-container__joinButton')) {
      this.props.history.push({
        pathname: `/eventpage/${id}`
      });
    }
  };

  render() {
    console.log(this.props, 'this.props in Article');
    const tempArray = [
      {
        title: 22,
        picSrc: '',
        desc: `Here must be a description.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`,
        going: 15,
        missing: 3,
        dateTime: '07.07.2027',
        localtion: 'Vardan Mamikonyan'
      },
      {
        title: 22,
        picSrc: './images/favicon.png',
        desc: `Here must be a description.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`,
        going: 15,
        missing: 3,
        dateTime: '07.07.2027',
        localtion: 'Vardan Mamikonyan'
      }
    ];
    let { events } = this.props;
    console.log(events);
    events = events || [];
    console.log('events[events.length - 1]');
    return (
      events.map((el, i, arr) => {
        return (
          <article key={el._id || i} a={this.props} onClick={e => this.goToEventPage(e, el._id)} className='eventArticle'>
            <div className='event-photo'>
              <img className='event-photo__img' src={el.photo || 'default.jpg'} alt='Event Photo' />
            </div>
            <div className='event-container'>
              <header className='event-container__header'>
                <h3>{el.title || 'Let\'s play contact'}</h3>
              </header>
              <div className='event-container__desc'>
                <p>{el.description.length > 140 ? `${el.description.slice(0, 140)}. . .` : el.description}</p>
                <a className='event-container__desc-seeMore'>see more</a>
              </div>
              <div className='event-container__eventInfo'>
                <p>going </p>
                <p>missing </p>
                <div className='event-container__eventInfo-btn'>
                  <button onClick={ this.changeBtnName } className='event-container__joinButton'>Join</button>
                </div>
              </div>
              <footer className='event-container__footer'>
                <div className='event-container__footer-date'>
                  {el.date || '07.07.2007'}
                </div>
                <div className='event-container__footer-place'>
                  <LocationIcon role='icon' />
                  {el.localtion || 'Al. Spandaryan 12'}
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
    events: state.userData.suggested
  };
};
const Articles = connect(mapStateToProps)(WrappedArticles);
export default withRouter(Articles);
